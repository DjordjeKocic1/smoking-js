import * as Font from "expo-font";

import CategorieScreen from "./screens/CategorieScreen";
import { Chats } from "./screens/newScreens/Chats";
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
import { Snake } from "./screens/newScreens/Games/Snake/Snake";
import { StatusBar } from "expo-status-bar";
import { Tips } from "./screens/newScreens/Tips";
import VerifyScreen from "./screens/VerifyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store/store";
import { useEffect } from "react";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("./assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return;
  }
  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SliceFall"
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
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="Smoke Calculator"
              component={CigaretteCostScreen}
            />
            <Stack.Screen
              name="Categories"
              options={{
                headerShown: false,
              }}
              component={CategorieScreen}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="VerifyScreen"
              component={VerifyScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tips"
              component={Tips}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Savings"
              component={Savings}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Health"
              component={Health}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Goals"
              component={Goals}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Chats"
              component={Chats}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Games"
              component={Games}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Snake"
              component={Snake}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SliceFall"
              component={SliceFall}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
