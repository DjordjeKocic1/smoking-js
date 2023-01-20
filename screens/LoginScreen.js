import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  Animated,
  Easing,
  Image,
  NativeModules,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { createUser } from "../store/userReducer";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const { UIManager } = NativeModules;

WebBrowser.maybeCompleteAuthSession();

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const movingAnim = useRef(new Animated.Value(-10)).current;
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "161017013722-jjlndnhdi43o1i50qk32uluful7jhgan.apps.googleusercontent.com",
    androidClientId:
      "161017013722-jjkuhc3onnma7f38mpp1uds1t4u21cno.apps.googleusercontent.com",
  });

  const goToNextPage = () => {
    navigation.replace("LoadingScreen");
  };

  const getUserData = (accessToken) => {
    setIsLoading(true);
    fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        return dispatch(createUser(data));
      })
      .then(() => {
        goToNextPage();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    Animated.timing(movingAnim, {
      toValue: 42,
      duration: 2000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();

    return () => {};
  }, [movingAnim]);

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication.accessToken) {
        getUserData(response.authentication.accessToken);
      }
    }
    return () => {};
  }, [response]);

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
        <SubmitButton
          onPress={() => {
            promptAsync({ showInRecents: true });
          }}
        >
          SIGN IN WITH A GOOGLE
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
});

export default LoginScreen;
