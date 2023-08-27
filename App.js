import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Text, TextInput, View } from "react-native";

import { Asset } from "expo-asset";
import { Main } from "./screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
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
      require("./assets/images/lighter1.png"),
      require("./assets/images/lighter2.png"),
      require("./assets/images/i_stop-logo.png"),
      require("./assets/images/games/heart.png"),
      require("./assets/images/games/money.png"),
      require("./assets/images/games/nosmoking.png"),
      require("./assets/images/ach.png"),
      require("./assets/images/advice.png"),
      require("./assets/images/community.png"),
      require("./assets/images/economy.png"),
      require("./assets/images/traning.png"),
      require("./assets/images/game.png"),
      require("./assets/images/profile.png"),
      require("./assets/images/bloodvain.png"),
      require("./assets/images/bones.png"),
      require("./assets/images/bonesMus.png"),
      require("./assets/images/done.png"),
      require("./assets/images/heartStroke.png"),
      require("./assets/images/kidneys.png"),
      require("./assets/images/lungecancer.png"),
      require("./assets/images/lungs.png"),
      require("./assets/images/PayPal-Logo.png"),
      require("./assets/images/spendings.png"),
      require("./assets/images/stress.png"),
      require("./assets/images/stroke.png"),
      require("./assets/images/tasksImg.png"),
      require("./assets/images/throatcancer.png"),
      require("./assets/images/user.png"),
      require("./assets/images/games/5year.png"),
      require("./assets/images/games/10year.png"),
      require("./assets/images/games/daymoney.png"),
      require("./assets/images/games/montly.png"),
      require("./assets/images/games/yearly.png"),
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
              name="main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
