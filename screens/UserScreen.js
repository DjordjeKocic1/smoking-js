import * as Notifications from "expo-notifications";

import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  fetchNotificationSuccess,
  fetchSuccess,
  getNotification,
} from "../store/notificationReducer";
import { fetchTaskSuccess, getTasks } from "../store/taskReducer";
import { selectUser, userInfo, userToken } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { Platform } from "react-native";
import openSocket from "socket.io-client";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: false,
    };
  },
});

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(userInfo(user._id));
      dispatch(getNotification(user._id));
      dispatch(getTasks(user._id));
    }, 2000);
  };

  useEffect(() => {
    dispatch(getNotification(user._id));
    dispatch(getTasks(user._id));
  }, [dispatch, user._id]);

  useEffect(() => {
    const socket = openSocket("https://whale-app-hkbku.ondigitalocean.app");
    socket.on("live", (data) => {
      const { action, notification, task, ID } = data;
      if (action === "create" && user && user._id === ID) {
        !!notification && dispatch(fetchNotificationSuccess(notification));
        !!task && dispatch(fetchTaskSuccess(task));
      }
    });
  }, [dispatch, user]);

  useEffect(() => {
    const confPushNotification = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Premission required",
          "Notification need the appropriate permissions."
        );
        return;
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
          projectId: "2da74976-bf21-485c-bcea-cf2b97fada34",
        });

        let dataToSend = {
          notificationToken: pushTokenData.data,
        };

        dispatch(userToken(dataToSend, user._id));
      } catch (error) {
        console.log(error);
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };
    confPushNotification();
  }, [user._id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
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
            style={{
              width: Dimensions.get("screen").width > 600 ? 50 : 30,
              height: Dimensions.get("screen").width > 600 ? 50 : 30,
            }}
            resizeMode="contain"
            source={require("../assets/images/games/money.png")}
          />
          <Text
            style={[
              styles.statsheader,
              {
                color: "green",
              },
            ]}
          >
            +
            {!!user.consumptionInfo &&
              user.consumptionInfo.cigarettesAvoidedCost}
            $
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            position: "relative",
            opacity:
              !!user.smokingInfo &&
              !!user.smokingInfo.isQuiting &&
              user.smokingInfo.isQuiting
                ? 1
                : 0.3,
          }}
        >
          <Pressable
            disabled={!!user.smokingInfo && !user.smokingInfo.isQuiting}
            onPress={() => {
              navigation.navigate("Health");
            }}
          >
            <Image
              style={{
                width: Dimensions.get("screen").width > 600 ? 50 : 30,
                height: Dimensions.get("screen").width > 600 ? 50 : 30,
              }}
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
        <View
          onTouchEnd={() => navigation.navigate("Savings")}
          style={{ alignItems: "center" }}
        >
          <MaterialIcons
            name="smoke-free"
            size={Dimensions.get("screen").width > 600 ? 50 : 27}
            color="#222325"
          />
          <Text style={styles.statsheader}>
            {!!user.consumptionInfo && user.consumptionInfo.cigarettesAvoided}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("Savings");
            }}
            style={styles.innerContainerBox}
            android_ripple={{ color: "#c39351" }}
          >
            <Text style={styles.innerText}>
              {!!user &&
              !!user.smokingInfo &&
              !!user.smokingInfo.isQuiting &&
              user.smokingInfo.isQuiting
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
            onPress={() => navigation.navigate("TwoSame")}
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
          <Pressable
            disabled={!!user.smokingInfo && !user.smokingInfo.isQuiting}
            onPress={() => navigation.navigate("Health")}
            android_ripple={{ color: "#c39351" }}
            style={[
              styles.innerContainerBox,
              {
                opacity:
                  !!user.smokingInfo &&
                  !!user.smokingInfo.isQuiting &&
                  user.smokingInfo.isQuiting
                    ? 1
                    : 0.3,
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
          <AntDesign
            name="star"
            size={15}
            color="orange"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          />
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
          {!!user.smokingInfo &&
          !!user.smokingInfo.isQuiting &&
          user.smokingInfo.isQuiting ? (
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
            onPress={() => navigation.navigate("Breath")}
            android_ripple={{ color: "#c39351" }}
            style={styles.innerContainerBox}
          >
            <Text style={styles.innerText}>Breath Exercies</Text>
            <Image
              source={require("../assets/images/lungsCartoon.png")}
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
            <Text style={styles.innerText}>ME</Text>
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
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
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
    marginTop: 10,
    fontSize: Dimensions.get("screen").width > 600 ? 16 : 12,
    fontWeight: "bold",
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
    margin: Dimensions.get("screen").width > 600 ? 50 : 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#22232533",
    borderRadius: 30,
    width: Dimensions.get("screen").width > 600 ? 220 : 130,
    height: Dimensions.get("screen").width > 600 ? 220 : 130,
    overflow: "hidden",
    position: "relative",
  },
  innerContainerImg: {
    width: Dimensions.get("screen").width > 600 ? 200 : 100,
    height: Dimensions.get("screen").width > 600 ? 200 : 100,
    aspectRatio: 1,
  },
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
  taskslength: {
    backgroundColor: "orange",
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
    padding: 5,
  },
  taskslengthText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
    color: "white",
  },
});

export default UserScreen;
