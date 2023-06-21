import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createUser, selectUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { backButtonHandlerAlert } from "../helper/helpers";
import { useRef } from "react";

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
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@user").then((data) => {
      if (!!data) {
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

  const opetAuthGoogle = async () => {
    try {
      addLinkingListener();
      await WebBrowser.openBrowserAsync(
        `https://whale-app-hkbku.ondigitalocean.app/auth/google`
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
    if (data) {
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
        <SubmitButton disabled={submitClick} onPress={() => opetAuthGoogle()}>
          {!submitClick ? (
            "SIGN IN WITH A GOOGLE"
          ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.googleLoginText}>Auto Login</Text>
              <ActivityIndicator
                style={{ marginTop: 5 }}
                size="large"
                color="white"
              />
            </View>
          )}
        </SubmitButton>
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
