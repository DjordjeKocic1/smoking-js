import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useRef } from "react";

import { BackButton } from "../../components/BackButton";
import { Entypo } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { selectUser } from "../../store/userReducer";
import { useSelector } from "react-redux";

export const Health = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 2,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: false,
      })
    ).start();
  }, [borderAnim]);

  if (isLoading) return <Loading />;

  const healthArr = [
    {
      name: "bloodPressure",
      text1: "your blood flow is low",
      text2: "your blood flow is improving",
      img: require("../../assets/images/bloodvain.png"),
    },
    {
      name: "COinBloodDecreases",
      text1: "carbon monoxid in your blood is high",
      text2: "carbon monoxide is reducing in your blood",
      img: require("../../assets/images/coBlood.png"),
    },
    {
      name: "heartRhythm",
      text1: "heart rate is low",
      text2: "heart rate is improving",
      img: require("../../assets/images/heart.png"),
    },
    {
      name: "physicalAndBodilyStrength",
      text1: "physical ability is weak",
      text2: "physical ability is improving",
      img: require("../../assets/images/bones.png"),
    },
    {
      name: "lungCapacity",
      text1: "the lung capacity is small",
      text2: "lung capacity is improving",
      img: require("../../assets/images/lungs.png"),
    },
    {
      name: "irritatingCough",
      text1: "irritating cough is present",
      text2: "irritating coughing will soon be gone",
      img: require("../../assets/images/cough.png"),
    },
    {
      name: "stressTolerance",
      text1: "stress tolerance is low",
      text2: "stress tolerance is improving",
      img: require("../../assets/images/stress.png"),
    },
    {
      name: "riskofKidneyCancer",
      text1: "risk of kidney cancer is high",
      text2: "risk of kidney cancer is low",
      img: require("../../assets/images/kidneys.png"),
    },
    {
      name: "riskofLungeCancer",
      text1: "risk of lunge cancer is high",
      text2: "risk of lunge cancer is low",
      img: require("../../assets/images/lungecancer.png"),
    },
    {
      name: "riskofStroke",
      text1: "risk of stroke is high",
      text2: "risk of stroke is low",
      img: require("../../assets/images/stroke.png"),
    },
    {
      name: "riskofThroatCancer",
      text1: "risk of throat cancer is high",
      text2: "risk of throat cancer is low",
      img: require("../../assets/images/throatcancer.png"),
    },
    {
      name: "riskofheartAttack",
      text1: "risk of heart attack is high",
      text2: "risk of heart attack is low",
      img: require("../../assets/images/heartStroke.png"),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={styles.avgHealth}>
        <View style={styles.avgHealthHead}>
          <Entypo name="arrow-bold-up" size={40} color="green" />
          <Text style={[styles.text, { fontSize: 50, marginBottom: 0 }]}>
            {!!user.healthInfo && user.healthInfo.avgHealth}%
          </Text>
        </View>
        <Text style={[styles.text, { fontSize: 15 }]}>Avg. Health</Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: 10,
              marginTop: 0,
              color:
                !!user.healthInfo && user.healthInfo.avgHealth > 70
                  ? "green"
                  : "red",
              zIndex: 2,
            },
          ]}
        >
          (
          {!!user.healthInfo && user.healthInfo.avgHealth > 70
            ? "Healthy"
            : "Unhealthy"}
          )
        </Text>
      </View>
      <View style={styles.cardMain}>
        {healthArr.map((value) => {
          return (
            <View key={value.name} style={styles.card}>
              <Image source={value.img} style={styles.cardImage} />
              <Text
                style={[
                  styles.text,
                  { fontSize: 12, color: "#222325", marginBottom: 0 },
                ]}
              >
                {!!user && !!user.healthInfo && user.healthInfo[value.name]}%
              </Text>
              <View style={styles.progressOuter}>
                <Animated.View
                  style={[
                    styles.progressBarInner,
                    {
                      borderRightWidth: borderAnim,
                      borderRightColor: "green",
                      backgroundColor:
                        !!user &&
                        !!user.healthInfo &&
                        user.healthInfo[value.name] > 50 &&
                        user.healthInfo[value.name] != 100
                          ? "#c39351"
                          : user.healthInfo[value.name] == 100
                          ? "green"
                          : "#c39351",
                      width: `${
                        !!user &&
                        !!user.healthInfo &&
                        user.healthInfo[value.name]
                          ? user.healthInfo[value.name]
                          : 0
                      }%`,
                    },
                  ]}
                ></Animated.View>
              </View>
              <Text style={styles.text}>
                {!!user &&
                !!user.healthInfo &&
                user.healthInfo[value.name] == 100
                  ? value.text2
                  : value.text1}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.smokingContainer}>
        <Text style={styles.smokingContainerText}>
          Effects of smoking cessation on the body
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>20 MINUTES</Text> - blood pressure and
          pulse stabilize, and peripheral circulation increases
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>8 HOURS</Text> - the concentration of
          nicotine and carbon monoxide is eliminated from the body
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>24 HOURS</Text> - complete carbon
          monoxide is eliminated from the body
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>48 HOURS</Text> - is enough for complete
          nicotine to disappear from the body and to significantly improve the
          sense of smell and taste
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>72 HOURS</Text> - it is easier to
          breathe because the bronchi relax
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>9 MONTHS</Text> - after stopping
          smoking, the secretion in the lungs disappears, thus the cough and the
          characteristic "whistling"
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>1 YEAR</Text> - heart attack risk is
          reduced by 50%!
        </Text>
        <Text style={styles.smokingContainerText2}>
          <Text style={styles.boldText}>15 YEARS</Text> - the risk of stroke is
          the same as that of a non-smoker.
        </Text>
      </View>
      <Pressable
        style={styles.helpBtn}
        onPress={() => navigation.replace("Tips")}
      >
        <Text style={styles.helpBtnText}>Need help?</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  smokingContainer: {
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  smokingContainerText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 15,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  smokingContainerText2: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 15 : 12,
    textAlign: "left",
    fontWeight: "100",
    paddingHorizontal: Dimensions.get("screen").width > 600 ? 30 : 15,
    margin: 5,
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
    paddingTop: 70,
  },
  cardMain: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  card: {
    marginBottom: 10,
    width: Dimensions.get("screen").width > 600 ? 200 : 150,
    alignItems: "center",
  },
  cardImage: {
    width: Dimensions.get("screen").width > 600 ? 100 : 50,
    height: Dimensions.get("screen").width > 600 ? 100 : 50,
    resizeMode: "contain",
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  progressOuter: {
    width: 100,
    height: 15,
    borderRadius: 2,
    borderWidth: 0.1,
  },
  progressBarInner: {
    height: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  progressValue: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
  },
  avgHealthHead: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avgHealth: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  helpBtn: {
    backgroundColor: "#222325",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  helpBtnText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
  },
});
