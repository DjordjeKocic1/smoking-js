import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BottomNav } from "../components/BottomNav";
import { MaterialIcons } from "@expo/vector-icons";
import { backButtonHandlerAlert } from "../helper/helpers";
import { selectUser } from "../store/userReducer";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const UserScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerBackVisible: false,
      headerShown: false,
      headerStyle: {
        backgroundColor: "#c39351e0",
      },
      headerShadowVisible: false,
      headerTintColor: "white",
    });
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(heartBeat, {
        toValue: 1.08,
        duration: 700,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();
  }, [heartBeat]);

  let userconsumptionInfoCheck =
    !!user && !!user.consumptionInfo.cigarettesAvoided;

  let userconsumptionInfoCheckCost =
    !!user && !!user.consumptionInfo.cigarettesAvoidedCost;

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.stats}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              source={require("../assets/images/games/money.png")}
            />
            <Text
              style={[
                styles.statsheader,
                {
                  color: userconsumptionInfoCheck ? "green" : "black",
                },
              ]}
            >
              +
              {!!user.savedInfo && !!user.savedInfo.cigarettesAvoidedCost
                ? user.savedInfo.cigarettesAvoidedCost +
                  !!user.consumptionInfo.cigarettesAvoidedCost
                : user.consumptionInfo.cigarettesAvoidedCost}
              {/* {userconsumptionInfoCheckCost
                ? user.consumptionInfo.cigarettesAvoidedCost.toFixed(1)
                : 0} */}
              $
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Animated.View style={{ transform: [{ scale: heartBeat }] }}>
              <Image
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                source={require("../assets/images/games/heart.png")}
              />
            </Animated.View>
            <Text
              style={[
                styles.statsheader,
                {
                  color: userconsumptionInfoCheck ? "red" : "black",
                },
              ]}
            >
              {userconsumptionInfoCheck
                ? (user.consumptionInfo.cigarettesAvoided * 0.1).toFixed(1)
                : 0}
              %
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="smoke-free" size={27} color="black" />
            <Text style={styles.statsheader}>
              {!!user.savedInfo && !!user.savedInfo.cigarettesAvoided
                ? user.savedInfo.cigarettesAvoided +
                  !!user.consumptionInfo.cigarettesAvoided
                : user.consumptionInfo.cigarettesAvoided}
              {/* {userconsumptionInfoCheck ? user.consumptionInfo.cigarettesAvoided : 0} */}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Savings")}
              style={styles.innerContainerBox}
              android_ripple={{ color: "#c39351" }}
            >
              <Text style={styles.innerText}>Costs</Text>
              <Image
                source={require("../assets/images/economy.png")}
                style={{ width: 100, height: 100 }}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("SliceFall")}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Stop It</Text>
              <Image
                source={require("../assets/images/game.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Health")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Health Tracker</Text>
              <Image
                source={require("../assets/images/traning.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Tips")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Training</Text>
              <Image
                source={require("../assets/images/advice.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Tips")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Settings</Text>
              <Image
                source={require("../assets/images/settings.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Health")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Achievements</Text>
              <Image
                source={require("../assets/images/ach.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Profile")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Profile</Text>
              <Image
                source={require("../assets/images/profile.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          {/* <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Chats")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Community</Text>
              <Image
                source={require("../assets/images/community.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View> */}
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Tips")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Tips</Text>
              <Image
                source={require("../assets/images/advice.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          {/* <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Settings</Text>
              <Image
                source={require("../assets/images/settings.png")}
                style={styles.innerContainerImg}
              />
            </View>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e1d5c9",
    justifyContent: "center",
    position: "relative",
  },
  headerCont: {
    backgroundColor: "#C39351",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderColor: "#C39351",
    borderRadius: 10,
  },
  headerText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
    textAlign: "center",
  },
  statsheader: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  innerText: {
    fontFamily: "HammersmithOne-Bold",
    marginTop: 10,
    fontSize: 12,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 10,
  },
  innerContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#22232533",
    borderRadius: 30,
    width: 130,
    height: 120,
    overflow: "hidden",
  },
  innerContainerImg: { width: 100, height: 100, aspectRatio: 1 },
  innerContainerBox: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default UserScreen;
