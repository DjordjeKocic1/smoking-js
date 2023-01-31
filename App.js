import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Asset } from "expo-asset";
import { BottomNav } from "./components/BottomNav";
import CategorieScreen from "./screens/CategorieScreen";
import { Chats } from "./screens/newScreens/Chats";
import { CigAnimation } from "./gameUtils/CigAnimation";
import CigaretteCostScreen from "./screens/CigaretteCostScreen";
import { Games } from "./screens/newScreens/Games";
import { Goals } from "./screens/newScreens/Goals";
import { Health } from "./screens/newScreens/Health";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileScreen } from "./screens/ProfileScreen";
import { Provider } from "react-redux";
import { Savings } from "./screens/newScreens/Savings";
import { SliceFall } from "./screens/newScreens/Games/SliceFall/SliceFall";
import { SmokingScreen } from "./screens/SmokingScreen";
import { Snake } from "./screens/newScreens/Games/Snake/Snake";
import { StatusBar } from "expo-status-bar";
import { Tips } from "./screens/newScreens/Tips";
import VerifyScreen from "./screens/VerifyScreen";
import { View } from "react-native-animatable";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store/store";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

SplashScreen.preventAutoHideAsync();
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
    ];

    let catchImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(catchImages);
  };

  useEffect(() => {
    const loadResurses = async () => {
      try {
        await catchResourses();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.log(e);
      } finally {
        // Tell the application to render
        setIsLoaded(true);
      }
    };

    loadResurses();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("./assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!fontsLoaded) {
    return;
  }

  if (!isLoaded) {
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
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: "#e1d5c9" },
              headerTintColor: "#222325",
            }}
          >
            <Stack.Screen
              name="Login"
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
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
