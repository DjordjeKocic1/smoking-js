import * as Font from "expo-font";

import CategorieScreen from "./screens/CategorieScreen";
import CigaretteCostScreen from "./screens/CigaretteCostScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileScreen } from "./screens/ProfileScreen";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
