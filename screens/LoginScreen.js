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
import { createUser, fetchSuccess, selectUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { backButtonHandlerAlert } from "../helper/helpers";
import { useRef } from "react";

const { UIManager } = NativeModules;

WebBrowser.maybeCompleteAuthSession();

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const movingAnim = useRef(new Animated.Value(-10)).current;
  const { isLoading, user } = useSelector(selectUser);
  const [submitClick, setSubmitClick] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "161017013722-jjlndnhdi43o1i50qk32uluful7jhgan.apps.googleusercontent.com",
    androidClientId:
      "161017013722-jjkuhc3onnma7f38mpp1uds1t4u21cno.apps.googleusercontent.com",
  });

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
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

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication.accessToken) {
        getUserData(response.authentication.accessToken);
      }
    }
    return () => {};
  }, [response]);

  const getUserData = (accessToken) => {
    fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        let dataTosend = {
          email: data.email,
          name: data.name,
          image: data.picture,
        };
        dispatch(createUser(dataTosend));
      })
      .catch((err) => {
        console.log(err);
      });
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
        <SubmitButton
          disabled={submitClick}
          onPress={() => {
            setSubmitClick(true);
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
