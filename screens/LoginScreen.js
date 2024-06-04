import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { AccessToken, LoginManager } from "react-native-fbsdk";
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
import { createUser, selectUser, userLogin } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

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
      await WebBrowser.openBrowserAsync(`https://istop.site/auth/google`);
    } catch (error) {
      console.log(error);
    }
  };

  const openAuthFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  const openAuthLogin = async () => {
    try {
      addLinkingListener();
      await WebBrowser.openBrowserAsync(
        `https://istop.site/account/registration/verification`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const emailChangeHandler = (text) => {
    setEmail(text);
  };

  const onPasswordChangeHandler = (text) => {
    setPassword(text);
  };

  const onLogin = () => {
    if (!email || !password) return;
    dispatch(userLogin({ email, password }));
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <Pressable
                android_ripple={{ color: "white" }}
                style={[styles.google, { backgroundColor: "#385a97" }]}
                onPress={openAuthFacebook}
              >
                <View style={[styles.googleImgContainer]}>
                  <Image
                    style={styles.googleImg}
                    source={require("../assets/images/facebook.png")}
                  />
                </View>
                <Text style={styles.googleText}>Facebook</Text>
              </Pressable> */}
              <Pressable
                android_ripple={{ color: "white" }}
                style={[styles.google, { backgroundColor: "#f44235" }]}
                onPress={openAuthGoogle}
              >
                <View
                  style={[
                    styles.googleImgContainer,
                    { backgroundColor: "#c52d23" },
                  ]}
                >
                  <Image
                    style={styles.googleImg}
                    source={require("../assets/images/googleIcon.png")}
                  />
                </View>
                <Text style={[styles.googleText]}>Google</Text>
              </Pressable>
            </View>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <View>
              <TextInput
                inputMode="email"
                keyboardType="email-address"
                onChangeText={emailChangeHandler}
                value={email}
                style={styles.input}
                placeholder="Email"
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  onChangeText={onPasswordChangeHandler}
                  value={password}
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={secure}
                />
                <Entypo
                  name={secure ? "eye-with-line" : "eye"}
                  size={20}
                  color="black"
                  onPress={() => setSecure(!secure)}
                  style={{ position: "absolute", right: 10, top: 20 }}
                />
              </View>
              <Pressable
                android_ripple={{ color: "white" }}
                style={styles.login}
                onPress={onLogin}
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
    width: "48%",
    overflow: "hidden",
  },
  googleImg: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 5,
  },
  googleText: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  googleImgContainer: {
    backgroundColor: "#243b68",
    padding: 5,
    height: "100%",
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

  input: {
    height: 45,
    width: "100%",
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 5,
    fontFamily: "HammersmithOne-Bold",
    paddingHorizontal: 10,
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
