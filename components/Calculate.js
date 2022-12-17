import * as Font from "expo-font";

import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export const Calculate = ({ user, hidden }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [costs, setCosts] = useState({
    monthly: 0,
    yearly: 0,
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    !!user.cigarettes &&
      setCosts(() => {
        return {
          monthly: (+user.packCigarettesPrice * 30).toFixed(2),
          yearly: (+user.packCigarettesPrice * 365).toFixed(2),
        };
      });
  }, [user]);

  if (!fontsLoaded) {
    return;
  }
  if (!hidden) return;

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={[styles.innerContainer, styles.innerContainerPacks]}>
        <Text style={styles.textContent}>Pack Cost</Text>
        <Text style={[styles.textContentCost]}>
          ${user.packCigarettesPrice}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={[styles.textContent, styles.textCost]}>Avg. Monthly</Text>
        <Text
          style={[
            styles.textContentCost,
            styles.textContentCostPack,
            styles.textCost,
          ]}
        >
          -${costs.monthly}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={[styles.textContent, styles.textCost]}>Avg. Yearly</Text>
        <Text
          style={[
            styles.textContentCost,
            styles.textContentCostPack,
            styles.textCost,
          ]}
        >
          -${costs.yearly}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: "column",
    paddingVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
  },
  shadowProp: {
    shadowOffset: { width: 40, height: 40 },
    shadowColor: "red",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  innerContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainerPacks: {
    borderBottomWidth: 1,
  },
  textContent: {
    fontFamily: "HammersmithOne-Bold",
  },
  textContentCost: {
    fontFamily: "HammersmithOne-Bold",
    fontWeight: "100",
    fontSize: 17,
  },
  textCost: {
    fontSize: 13,
  },
  textContentCostPack: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "#c39351",
  },
});
