import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { selectUser, updateUser, userInfo } from "../../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { BackButton } from "../../../components/BackButton";
import { BreathFinModal } from "./BreathFinModal";
import { BreathInfo } from "./BreathInfo";
import CircularProgress from "react-native-circular-progress-indicator";
import { Image } from "react-native";

export const Breath = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [timer, setTimer] = useState(1);
  const [running, setIsRunning] = useState(false);
  const [readisOpen, setReadisOpen] = useState(false);
  const [challengeFin, setChallengeFin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentExercies, setCurrentExercies] = useState(null);
  const progressRef = useRef(null).current;
  const [value, setValue] = useState(0);
  const [exerciesArr, setexerciesArr] = useState([
    {
      seconds: 25,
      anim: new Animated.Value(Dimensions.get("screen").width > 600 ? 70 : 50),
    },
    {
      seconds: 60,
      anim: new Animated.Value(Dimensions.get("screen").width > 600 ? 70 : 50),
    },
    {
      seconds: 90,
      anim: new Animated.Value(Dimensions.get("screen").width > 600 ? 70 : 50),
    },
    {
      seconds: 120,
      anim: new Animated.Value(Dimensions.get("screen").width > 600 ? 70 : 50),
    },
  ]);

  useEffect(() => {
    let interval;
    if (!running) {
      return;
    }
    if (timer == 0) {
      setChallengeFin(true);
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, running]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(userInfo(user._id));
    }, 2000);
  };

  const onExerciseChange = (exercies) => {
    Animated.timing(exercies.anim, {
      toValue: Dimensions.get("screen").width > 600 ? 150 : 130,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        let newExerciesArr = [...exerciesArr];
        let currentExerciesIndex = newExerciesArr.findIndex(
          (v) => v.seconds == exercies.seconds
        );
        newExerciesArr[currentExerciesIndex] = exercies;
        setexerciesArr(newExerciesArr);
      }
    });
  };

  const onReadChangeHandler = (bool) => {
    setReadisOpen(bool);
  };

  const onExerciseStart = (exercies) => {
    exercies.anim =
      Dimensions.get("screen").width > 600
        ? new Animated.Value(70)
        : new Animated.Value(50);
    setIsRunning(true);
    setValue(100);
    setTimer(exercies.seconds);
    setCurrentExercies(exercies);
  };

  const onSuccessHandler = (success) => {
    if (success) {
      dispatch(
        updateUser(
          {
            breathExercies: currentExercies.seconds,
            healthInfo: {
              ...user.healthInfo,
              lungCapacity: user.healthInfo.lungCapacity + 0.1,
            },
          },
          user._id
        )
      );
    }
    setIsRunning(false);
    setValue(0);
    setChallengeFin(false);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { position: "relative" }]}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BackButton navigation={navigation} where={"UserScreen"} />
      <Text style={styles.breathExerciesText}>Breath Exercies</Text>
      <Text style={styles.breathExerciesText2}>
        Complete challenges down below by clicking on first available exercies
      </Text>

      <Text style={styles.breathExerciesText3}>
        <AntDesign name="caretdown" size={24} color="black" />
      </Text>
      {!running ? (
        <View style={styles.container}>
          {exerciesArr.map((v) => {
            return (
              <Animated.View
                key={v.seconds}
                style={[
                  styles.pressebleContainer,
                  {
                    height: v.anim,
                    backgroundColor: "green",
                  },
                ]}
              >
                {!!user &&
                  !!user.breathExercies &&
                  user.breathExercies >= v.seconds && (
                    <Image
                      source={require("../../../assets/images/fff.png")}
                      style={styles.completeImg}
                    />
                  )}
                <Pressable
                  style={styles.pressebleContainerUpper}
                  onPress={() => onExerciseChange(v)}
                >
                  <Text style={styles.pressebleContainerText}>
                    {v.seconds} seconds{" "}
                    <FontAwesome
                      name="hand-pointer-o"
                      size={20}
                      color="white"
                    />
                  </Text>
                  <Text
                    style={[
                      styles.pressebleContainerText,
                      {
                        fontSize:
                          Dimensions.get("screen").width > 600 ? 18 : 11,
                      },
                    ]}
                  >
                    {"Take a deep breath and press 'START'"}
                  </Text>
                  <Pressable
                    android_ripple={{ color: "gray" }}
                    style={styles.pressebleContainerStart}
                    onPress={() => onExerciseStart(v)}
                  >
                    <Text style={styles.pressebleContainerStartText}>
                      START
                    </Text>
                  </Pressable>
                </Pressable>
              </Animated.View>
            );
          })}
          <Pressable
            android_ripple={{ color: "#6A7152" }}
            style={styles.pressebleContainerRead}
            onPress={() => onReadChangeHandler(true)}
          >
            <Text style={styles.pressebleContainerReadText}>Read how</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.timerContainer}>
          <CircularProgress
            ref={progressRef}
            value={value}
            showProgressValue={false}
            radius={100}
            title="Hold you breath"
            titleStyle={{
              fontSize: 13,
              marginTop: 100,
              fontFamily: "HammersmithOne-Bold",
              color: "black",
            }}
            progressValueColor={"#c39351"}
            inActiveStrokeColor="white"
            duration={timer * 1000}
            strokeColorConfig={[
              { color: "red", value: 0 },
              { color: "skyblue", value: 50 },
              { color: "yellowgreen", value: 100 },
            ]}
          />
          <Text style={[styles.timerContainerText, { position: "absolute" }]}>
            {timer}
          </Text>
        </View>
      )}
      {challengeFin && (
        <BreathFinModal
          onSuccessHandler={(success) => onSuccessHandler(success)}
        />
      )}
      {readisOpen && (
        <BreathInfo onReadChangeHandler={(bool) => onReadChangeHandler(bool)} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    position: "relative",
    justifyContent:
      Dimensions.get("screen").width > 600 ? "center" : "flex-start",
    paddingVertical: 20,
    paddingTop: 70,
    paddingHorizontal: Dimensions.get("screen").width > 600 ? 30 : 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  breathExerciesText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    margin: 5,
  },
  breathExerciesText2: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    margin: 5,
  },
  breathExerciesText3: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  pressebleContainer: {
    backgroundColor: "green",
    width: "70%",
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  pressebleContainerText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 30 : 20,
    textAlign: "center",
    color: "white",
    padding: 10,
  },
  pressebleContainerUpper: {
    alignItems: "center",
  },
  timerContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  timerContainerText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 100 : 70,
  },
  pressebleContainerStart: {
    backgroundColor: "yellow",
    alignItems: "center",
    width: "50%",
    borderRadius: 5,
  },
  pressebleContainerStartText: {
    fontFamily: "HammersmithOne-Bold",
    padding: 5,
  },
  pressebleContainerRead: {
    backgroundColor: "#222325",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  pressebleContainerReadText: {
    fontFamily: "HammersmithOne-Bold",
    color: "white",
    fontSize: 17,
  },
  completeImg: {
    width: 80,
    height: 80,
    position: "absolute",
    top: -20,
    right: -15,
  },
});
