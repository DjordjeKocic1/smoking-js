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
      require("./assets/images/i_stop-logo.png"),
      require("./assets/images/games/heart.png"),
      require("./assets/images/games/money.png"),
      require("./assets/images/games/nosmoking.png"),
      require("./assets/images/ach.png"),
      require("./assets/images/advice.png"),
      require("./assets/images/community.png"),
      require("./assets/images/economy.png"),
      require("./assets/images/settings.png"),
      require("./assets/images/traning.png"),
      require("./assets/images/game.png"),
      require("./assets/images/profile.png"),
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
