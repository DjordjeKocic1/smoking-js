import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { SubmitButton } from "../UI/SubmitButton";
import { createUser } from "../store/userReducer";
import { useDispatch } from "react-redux";

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "161017013722-jjlndnhdi43o1i50qk32uluful7jhgan.apps.googleusercontent.com",
    androidClientId:
      "161017013722-jjkuhc3onnma7f38mpp1uds1t4u21cno.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication.accessToken) {
        getUserData(response.authentication.accessToken);
      }
    }
  }, [response]);

  const goToNextPage = () => {
    navigation.replace("Smoke Calculator");
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.buttonContent}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../assets/images/quit-smoking-logo.png")}
          />
          <SubmitButton
            onPress={() => {
              promptAsync({ showInRecents: true });
            }}
          >
            CONTINUE WITH A GOOGLE
          </SubmitButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    alignItems: "center",
    textAlign: "center",
  },
  imageContent: {
    width: "100%",
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeScreen;
