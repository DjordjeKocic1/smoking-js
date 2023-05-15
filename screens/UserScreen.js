import * as Notifications from "expo-notifications";

import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, userHealth } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { MaterialIcons } from "@expo/vector-icons";
import { backButtonHandlerAlert } from "../helper/helpers";
import { getNotification } from "../store/notificationReducer";

const UserScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const heartBeat = useRef(new Animated.Value(1)).current;
  const [refreshing, setRefreshing] = useState(false);

  // const scheduleNotificationHandler = (message,time) => {
  //   console.log('trigger notification');
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "App",
  //       body: message,
  //       data: {
  //         userName: "Djole",
  //       },
  //       color:"#c39351",
  //     },
  //     trigger: {
  //       seconds: time,
  //     },
  //   });
  // }; 

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(userHealth(user._id));
      dispatch(getNotification(user._id));
    }, 2000);
  };

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
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
    dispatch(userHealth(user._id));
    dispatch(getNotification(user._id));
  },[user._id])

  useEffect(() => {
    Animated.loop(
      Animated.timing(heartBeat, {
        toValue: 1.08,
        duration: 700,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();
    return () => {};
  }, [heartBeat]);

  const onShareHandler = async () => {
    let url =
      "https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US&pli=1";
    try {
      const result = await Share.share({
        title: "The most detailed application to stop smoking",
        message: url,
      });
      setActiveStyle(true);
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{flexGrow:1}}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        overScrollMode="never"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.stats}>
          <View
            onTouchEnd={() => navigation.navigate("Savings")}
            style={{ alignItems: "center" }}
          >
            <Image
              style={{ width:  Dimensions.get("screen").width > 700 ? 80 : 30, height: Dimensions.get("screen").width > 700 ? 80 : 30 }}
              resizeMode="contain"
              source={require("../assets/images/games/money.png")}
            />
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? (
              <Text
                style={[
                  styles.statsheader,
                  {
                    color: "green",
                  },
                ]}
              >
                +
                {!!user &&
                  !!user.consumptionInfo &&
                  (
                    user.consumptionInfo.cigarettesDailyCost *
                    user.smokingInfo.noSmokingDays
                  ).toFixed(1)}
                $
              </Text>
            ) : (
              <Text
                style={[
                  styles.statsheader,
                  {
                    color:
                      !!user &&
                      !!user.consumptionInfo &&
                      !!user.consumptionInfo.cigarettesAvoided
                        ? "green"
                        : "#222325",
                  },
                ]}
              >
                +
                {!!user.savedInfo && !!user.savedInfo.cigarettesAvoidedCost
                  ? user.savedInfo.cigarettesAvoidedCost +
                    !!user.consumptionInfo.cigarettesAvoidedCost
                  : user.consumptionInfo.cigarettesAvoidedCost}
                $
              </Text>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              position: "relative",
              opacity:
                !!user.smokingInfo && !user.smokingInfo.isQuiting ? 0.3 : 1,
            }}
          >
            <Entypo
              name="cross"
              size={30}
              color="black"
              style={{ position: "absolute" }}
            />
            <Pressable
              disabled={!!user.smokingInfo && !user.smokingInfo.isQuiting}
              onPress={() => navigation.navigate("Health")}
            >
              <Image
                style={{ width: Dimensions.get("screen").width > 700 ? 80 : 30, height: Dimensions.get("screen").width > 700 ? 80 : 30 }}
                resizeMode="contain"
                source={require("../assets/images/games/heart.png")}
              />
            </Pressable>
            <Text
              style={[
                styles.statsheader,
                {
                  color: "red",
                },
              ]}
            >
              {!!user.healthInfo && !!user.healthInfo.avgHealth
                ? user.healthInfo.avgHealth
                : 0}
              %
            </Text>
          </View>
          {!!user.smokingInfo && !user.smokingInfo.isQuiting ? (
            <View
              onTouchEnd={() => navigation.navigate("Savings")}
              style={{ alignItems: "center" }}
            >
              <MaterialIcons name="smoke-free" size={Dimensions.get("screen").width > 700 ? 80 : 27} color="#222325" />
              <Text style={styles.statsheader}>
                {!!user.savedInfo && !!user.savedInfo.cigarettesAvoided
                  ? user.savedInfo.cigarettesAvoided + !!user.consumptionInfo &&
                    !!user.consumptionInfo.cigarettesAvoided
                  : user.consumptionInfo.cigarettesAvoided}
              </Text>
            </View>
          ) : (
            <View
              onTouchEnd={() => navigation.navigate("Savings")}
              style={{ alignItems: "center" }}
            >
              <MaterialIcons name="smoke-free" size={Dimensions.get("screen").width > 700 ? 80 : 27} color="#222325" />
              <Text style={styles.statsheader}>
                <Text style={{ fontSize: 17 }}>
                  {!!user.smokingInfo && !!user.smokingInfo.noSmokingDays
                    ? user.smokingInfo.noSmokingDays
                    : 0}
                </Text>
                /<Text style={{ fontSize: 9 }}>day</Text>
              </Text>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate("Savings")
                // scheduleNotificationHandler("Dont forget to check your status 📜!",5)
              }}
              style={styles.innerContainerBox}
              android_ripple={{ color: "#c39351" }}
            >
              <Text style={styles.innerText}>
                {!!user && !!user.smokingInfo && user.smokingInfo.isQuiting
                  ? "Savings"
                  : "Costs"}
              </Text>
              <Image
                source={require("../assets/images/economy.png")}
                style={styles.innerContainerImg}
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
          <View style={[styles.innerContainer]}>
            {!!user.smokingInfo && !user.smokingInfo.isQuiting && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "HammersmithOne-Bold",
                    textAlign: "center",
                    transform: [
                      {
                        rotate: "45deg",
                      },
                    ],
                  }}
                >
                  Not available in slow quit mode!
                </Text>
              </View>
            )}
            <Pressable
              disabled={!user.smokingInfo.isQuiting}
              onPress={() => navigation.navigate("Health")}
              android_ripple={{ color: "#c39351" }}
              style={[
                styles.innerContainerBox,
                {
                  opacity:
                    !!user.smokingInfo && user.smokingInfo.isQuiting ? 1 : 0.3,
                },
              ]}
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
              onPress={() => navigation.navigate("Task")}
              android_ripple={{ color: "#c39351" }}
              style={[styles.innerContainerBox, { position: "relative" }]}
            >
              <Text style={styles.innerText}>Tasks</Text>
              <Image
                source={require("../assets/images/tasksImg.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Mentor")}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Mentor</Text>
              <Image
                source={require("../assets/images/community.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? (
              <Pressable
                onPress={() => navigation.navigate("Slow")}
                android_ripple={{ color: "#c39351" }}
                style={styles.innerContainerBox}
              >
                <Text style={styles.innerText}>Take it Slow</Text>
                <Image
                  source={require("../assets/images/clock.png")}
                  style={styles.innerContainerImg}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => navigation.navigate("QuitNow")}
                android_ripple={{ color: "#c39351" }}
                style={styles.innerContainerBox}
              >
                <Text style={styles.innerText}>Quit Now</Text>
                <Image
                  source={require("../assets/images/cigQuit.png")}
                  style={styles.innerContainerImg}
                />
              </Pressable>
            )}
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
          <View style={styles.innerContainer}>
            <Pressable
              onPress={onShareHandler}
              android_ripple={{ color: "#c39351" }}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Share</Text>
              <Image
                source={require("../assets/images/shareImg.png")}
                style={styles.innerContainerImg}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
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
    fontSize:  Dimensions.get("screen").width > 700 ? 25 : 12,
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
    width: Dimensions.get("screen").width > 700 ? 250 : 130,
    height: Dimensions.get("screen").width > 700 ? 250 : 130,
    overflow: "hidden",
  },
  innerContainerImg: { width: Dimensions.get("screen").width > 700 ? 200 : 100, height: Dimensions.get("screen").width > 700 ? 200 : 100, aspectRatio: 1 },
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
