import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BottomNav } from "../components/BottomNav";
import { FontAwesome } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { MaterialIcons } from "@expo/vector-icons";
import { UserProfileIcon } from "../components/UserProfileIcon";
import { backButtonHandlerAlert } from "../helper/helpers";
import { selectUser } from "../store/userReducer";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const beatingVal = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(beatingVal, {
        toValue: 1.1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.bounce,
      })
    ).start();
  }, [beatingVal]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "HOME",
      headerShown: false,
      headerStyle: {
        backgroundColor: "#C39351",
      },
      headerTintColor: "white",
      headerRight: () => {
        return (
          <UserProfileIcon
            onPress={() => navigation.navigate("Profile")}
            user={user}
          />
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="stretch"
      style={styles.mainContainer}
    >
      <View style={styles.stats}>
        <View>
          <Image
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            source={require("../assets/images/games/money.png")}
          />
          {/* <MaterialIcons name="monetization-on" size={24} color="green" /> */}
          <Text style={styles.statsheader}>+0</Text>
        </View>
        <View>
          <Animated.View style={{ transform: [{ scale: beatingVal }] }}>
            <Image
              style={{ width: 30, height: 30, marginBottom: 2 }}
              resizeMode="contain"
              source={require("../assets/images/games/heart.png")}
            />
            {/* <FontAwesome name="heartbeat" size={24} color="red" /> */}
          </Animated.View>
          <Text style={styles.statsheader}>0%</Text>
        </View>
        <View>
          <MaterialIcons name="smoke-free" size={24} color="black" />
          <Text style={styles.statsheader}>0</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Savings")}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Savings</Text>
              <Image
                source={require("../assets/images/economy.png")}
                style={{ width: 100, height: 100 }}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => navigation.navigate("Games")}
              style={styles.innerContainerBox}
            >
              <Text style={styles.innerText}>Stop It</Text>
              <Image
                source={require("../assets/images/game.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Health Tracker</Text>
              <Image
                source={require("../assets/images/traning.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Achievements</Text>
              <Image
                source={require("../assets/images/ach.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
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
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Community</Text>
              <Image
                source={require("../assets/images/community.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Tips</Text>
              <Image
                source={require("../assets/images/advice.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Settings</Text>
              <Image
                source={require("../assets/images/settings.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </ImageBackground>
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
    overflow: "hidden",
  },
  innerContainerBox: {
    width: 130,
    height: 130,
    margin: 10,
    borderWidth: 0.2,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
});

export default HomeScreen;
