import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BackButton } from "../../components/BackButton";
import CircularProgress from "react-native-circular-progress-indicator";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { backButtonHandlerAlert } from "../../helper/helpers";
import { useEffect } from "react";
import { useState } from "react";

export const Health = ({ navigation }) => {
  const [heartV, setHeartV] = useState(10.2);
  const [cellsV, setCellsV] = useState(20.2);
  const [lungeV, setLungeV] = useState(50.2);
  const [brainV, setBrainV] = useState(9.2);
  const [bonesV, setBonesV] = useState(28);
  const [phisV, setphisV] = useState(10.2);

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/heart.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={1000}
            value={heartV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Blood/Heart
          </Text>
        </View>
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/cells.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={1500}
            value={cellsV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Body Cells
          </Text>
        </View>
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/lungs.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={2000}
            value={lungeV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Respiratory system
          </Text>
        </View>
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/brain.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={2500}
            value={brainV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Nervous system
          </Text>
        </View>
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/bonesMus.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={3000}
            value={bonesV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Bones/Muscles
          </Text>
        </View>
        <View style={styles.progress}>
          <Image
            source={require("../../assets/images/bones.png")}
            style={styles.progressImg}
          />
          <CircularProgress
            delay={3500}
            value={phisV}
            inActiveStrokeColor={"#c3935130"}
            progressValueStyle={styles.progressValue}
            circleBackgroundColor="#e1d5c9"
            activeStrokeColor="#c39351"
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#c39351"}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1); // 2 decimal places
            }}
            valueSuffix={"%"}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Physical ability
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#222325",
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderWidth: 0.5,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontFamily: "HammersmithOne-Bold" }}>
          Detail view
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
  },
  outerProgress: {
    width: Dimensions.get("screen").width / 1.2,
    height: 15,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  outerProgressText: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  innerProgress: {
    height: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "e1d5c9",
  },
  text: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
  },
  progress: {
    margin: 10,
    position: "relative",
    borderColor: "black",
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    borderRadius: 20,
    padding: 10,
  },
  progressImg: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 30,
    left: 45,
    zIndex: 999,
    resizeMode: "contain",
  },
  progressValue: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
    marginTop: 70,
  },
});
