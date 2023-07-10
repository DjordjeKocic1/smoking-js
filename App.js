import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Text, TextInput, View } from "react-native";

import { Asset } from "expo-asset";
import CategorieScreen from "./screens/CategorieScreen";
import CigaretteCostScreen from "./screens/CigaretteCostScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import { MentorViewScreen } from "./screens/MentorViewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { SmokingScreen } from "./screens/SmokingScreen";
import { StatusBar } from "expo-status-bar";
import VerifyScreen from "./screens/VerifyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store/store";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const catchResourses = async () => {
    let images = [
      require("./assets/images/i_stop-logo.png"),
      require("./assets/images/games/bird1.png"),
      require("./assets/images/games/bird2.png"),
      require("./assets/images/games/bird3.png"),
      require("./assets/images/games/floor.png"),
      require("./assets/images/games/wall.png"),
      require("./assets/images/games/blood.png"),
      require("./assets/images/games/cigHome.png"),
      require("./assets/images/games/heart.png"),
      require("./assets/images/games/money.png"),
      require("./assets/images/games/nosmoking.png"),
      require("./assets/images/games/background.png"),
      require("./assets/images/ach.png"),
      require("./assets/images/advice.png"),
      require("./assets/images/bg.png"),
      require("./assets/images/community.png"),
      require("./assets/images/economy.png"),
      require("./assets/images/game.png"),
      require("./assets/images/settings.png"),
      require("./assets/images/traning.png"),
      require("./assets/images/game.png"),
      require("./assets/images/profile.png"),
      require("./assets/images/twoSameImgs/apple.jpg"),
      require("./assets/images/twoSameImgs/banana.jpg"),
      require("./assets/images/twoSameImgs/painapple.jpg"),
    ];

    let catchImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(catchImages);
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("./assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const loadResurses = async () => {
      try {
        await catchResourses();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadResurses();

    () => {};
  }, []);

  useEffect(() => {
    loadFonts();
    () => {};
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!fontsLoaded && !isLoaded) {
    return;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, backgroundColor: "#e1d5c9" }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="login">
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Smoke Calculator"
              component={CigaretteCostScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#e1d5c9",
                },
              }}
            />
            <Stack.Screen
              name="SmokingScreen"
              component={SmokingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Categories"
              options={{
                headerShown: false,
              }}
              component={CategorieScreen}
            />
            <Stack.Screen
              name="VerifyScreen"
              component={VerifyScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MentorViewScreen"
              options={{
                headerShown: false,
              }}
              component={MentorViewScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
