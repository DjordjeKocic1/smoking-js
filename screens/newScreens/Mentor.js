import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { BackButton } from "../../components/BackButton";

export const Mentor = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={styles.mentoring}>
        <Text style={styles.mentoringHeader}>Mentoring</Text>
        <Text style={styles.mentoringInfo}>Your are not mentoring anyone</Text>
      </View>
      <View style={styles.mentoring}>
        <Text style={styles.mentoringHeader}>Mentor</Text>
        <Text style={styles.mentoringInfo}>You dont have a mentor</Text>
        <Pressable style={styles.pressableContainer}>
          <Text style={styles.pressableContainerText}>Ask for help</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mentoring: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mentoringHeader: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 25,
  },
  mentoringInfo: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
    color: "gray",
  },
  pressableContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#222325",
    marginTop: 10,
    borderRadius: 5,
  },
  pressableContainerText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
});
