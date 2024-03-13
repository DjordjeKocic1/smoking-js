import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createUser, selectUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../components/Loading";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const movingAnim = useRef(new Animated.Value(-10)).current;
  const { isLoading, user } = useSelector(selectUser);
  const [submitClick, setSubmitClick] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@user").then((data) => {
      if (data) {
        setSubmitClick(true);
        dispatch(createUser({ email: data }));
      } else {
        setSubmitClick(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!!user && !!user.email) {
      navigation.replace("LoadingScreen");
    }
  }, [user, navigation]);

  useEffect(() => {
    Animated.timing(movingAnim, {
      toValue: 42,
      duration: 2000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();

    return () => {};
  }, [movingAnim]);

  const openAuthGoogle = async () => {
    try {
      addLinkingListener();
      await WebBrowser.openBrowserAsync(
        `https://whale-app-hkbku.ondigitalocean.app/auth/google`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openAuthFacebook = async () => {
    try {
      addLinkingListener();
      await WebBrowser.openBrowserAsync(
        `https://whale-app-hkbku.ondigitalocean.app/auth/facebook`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openAuthLogin = async () => {
    try {
      addLinkingListener();
      await WebBrowser.openBrowserAsync(
        `https://whale-app-hkbku.ondigitalocean.app/account/registration/verification`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addLinkingListener = () => {
    Linking.addEventListener("url", handleRedirec);
  };

  const handleRedirec = async (event) => {
    if (!event) return;
    let data = Linking.parse(event.url);
    if (!!data && !!data.queryParams && !!data.queryParams.email) {
      dispatch(createUser(data.queryParams));
      try {
        await AsyncStorage.setItem("@user", data.queryParams.email);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.buttonContent}>
        <View style={styles.imageContent}>
          <Animated.View
            style={{
              width: 20,
              height: 24,
              borderRadius: 10,
              position: "absolute",
              right: 50,
              backgroundColor: "#222325",
              top: movingAnim,
              zIndex: 99,
            }}
          ></Animated.View>
          <Image
            style={{ width: 150, height: 150, aspectRatio: 2 }}
            source={require("../assets/images/i_stop-logo.png")}
          />
        </View>
        {!submitClick ? (
          <View style={{ width: "80%" }}>
            <View>
              <Pressable
                android_ripple={{ color: "white" }}
                style={[styles.google]}
                onPress={openAuthFacebook}
              >
                <Image
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  source={require("../assets/images/facebook.png")}
                />
                <Text style={styles.googleText}>Login with Facebook</Text>
              </Pressable>
              <Pressable
                android_ripple={{ color: "white" }}
                style={styles.google}
                onPress={openAuthGoogle}
              >
                <Image
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  source={require("../assets/images/google.png")}
                />
                <Text style={[styles.googleText]}>Login with Google</Text>
              </Pressable>
            </View>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <View>
              <TextInput style={styles.input} placeholder="Email" />
              <TextInput style={styles.input} placeholder="Password" />
              <Pressable
                android_ripple={{ color: "white" }}
                style={styles.login}
              >
                <Text style={[styles.googleText]}>Login</Text>
              </Pressable>
            </View>
            <View style={styles.forgot}>
              <Text style={styles.passwordText}>Forgot Password?</Text>
              <Text onPress={openAuthLogin} style={styles.newAcc}>
                Sign up New Account
              </Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator
            style={{ marginTop: 5 }}
            size="large"
            color="white"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
  },
  loadingText: {
    alignItems: "center",
    textAlign: "center",
  },
  google: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222325",
    marginBottom: 10,
    borderRadius: 5,
  },
  login: {
    backgroundColor: "#222325",
    marginTop: 10,
  },
  forgot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  passwordText: {
    fontWeight: "bold",
    color: "grey",
  },
  newAcc: {
    fontWeight: "bold",
    color: "green",
  },
  googleText: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 45,
    width: "100%",
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: "black",
    fontFamily: "HammersmithOne-Bold",
    padding: 5,
  },
  imageContent: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageText: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
  },
  googleLoginText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
