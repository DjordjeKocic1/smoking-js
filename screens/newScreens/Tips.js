import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BackButton } from "../../components/BackButton";
import { backButtonHandlerAlert } from "../../helper/helpers";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

export const Tips = ({ navigation }) => {
  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View style={[styles.mainContainer, { position: "relative" }]}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <ScrollView style={styles.innerContainer}>
        <Text
          style={{
            fontFamily: "HammersmithOne-Bold",
            fontSize: 25,
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          Tips
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.tipsHeaderText}>
            1. Every time you need to light a cigar, play the game for 5
            minutes.
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}></View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>
            2. When the in-game cigar is finished, monitor the health status.
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>
            3. After some time, if you have reduced the number of cigarettes per
            day, go to "Savings" and update it.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    position: "relative",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: "column",
  },
  tipsHeaderText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
});
