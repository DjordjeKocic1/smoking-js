import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { costOfCigarette } from "../helper/helpers";
import { useEffect } from "react";
import { useRef } from "react";

export const Info = ({ text, user }) => {
  const animatedMove = useRef(
    new Animated.Value(Dimensions.get("screen").width + 200)
  ).current;

  useEffect(() => {
    Animated.timing(animatedMove, {
      toValue: 0,
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start();
  }, [animatedMove]);

  let calcAvoidedSavings = costOfCigarette(
    user.consumptionInfo.packCigarettesPrice,
    user.consumptionInfo.cigarettesInPack
  );

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: animatedMove }] }]}
    >
      <View style={styles.innerContainer}>
        <Text
          style={{
            fontFamily: "HammersmithOne-Bold",
            fontSize: 15,
          }}
        >
          {text}
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "HammersmithOne-Bold",
            fontSize: 12,
            color: "green",
          }}
        >
          +{!!user && calcAvoidedSavings} $
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "HammersmithOne-Bold",
            fontSize: 12,
            color: "red",
          }}
        >
          +0.1% <Entypo name="heart" size={12} color="red" />
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: "#C39351",
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
