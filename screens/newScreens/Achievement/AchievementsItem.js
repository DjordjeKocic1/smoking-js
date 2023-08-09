import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";

const AchievementsItem = ({ item }) => {
  return (
    <LinearGradient
      style={[styles.outerAch, { opacity: item.holding ? 1 : 0.3 }]}
      colors={["#a97d3b", "#c58f2b", "#a97d3b"]}
      start={{ x: 0.5, y: 0 }}
    >
      <View style={styles.innerAch}>
        <LinearGradient
          colors={
            item.type == "special"
              ? ["#115c75", "#00273c", "#115c75"]
              : ["#956625", "#6e4119", "#956625"]
          }
          start={{ x: 0.2, y: 0 }}
        >
          <Text style={[styles.innerAchText]}>{item.name}</Text>
        </LinearGradient>
        <Text style={styles.innerAchText2}>{item.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            item.type == "special"
              ? require("../../../assets/images/achievement.png")
              : require("../../../assets/images/achImg.png")
          }
        />
      </View>
      <Text style={styles.innerAchText3}>{item.points}</Text>
    </LinearGradient>
  );
};

export default memo(AchievementsItem);

const styles = StyleSheet.create({
  outerAch: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#4e3f28",
    position: "relative",
    height: 100,
  },
  innerAchText: {
    textAlign: "center",
    fontSize: 15,
    color: "#e7e4e1",
    fontFamily: "HammersmithOne-Bold",
  },
  innerAchText2: {
    textAlign: "center",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 2,
    color: "#433113",
    fontFamily: "HammersmithOne-Bold",
  },
  innerAchText3: {
    textAlign: "center",
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 13,
    color: "white",
    position: "absolute",
    right: Dimensions.get("screen").width > 600 ? 11 : 9,
    top: 13,
    fontFamily: "HammersmithOne-Bold",
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    top: 3,
  },
  image: {
    width: Dimensions.get("screen").width > 600 ? 50 : 35,
    height: Dimensions.get("screen").width > 600 ? 50 : 35,
  },
});
