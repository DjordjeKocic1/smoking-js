import { CategorieScreen } from "./screens/CategorieScreen";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileScreen } from "./screens/ProfileScreen";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import UserScreen from "./screens/UserScreen";
import UserViewScreen from "./screens/UserViewScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#e1d5c9" },
              headerTintColor: "#222325",
            }}
          >
            <Stack.Screen
              name="Categories"
              options={{
                headerShown: false,
              }}
              component={CategorieScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Smoke Calculator" component={UserScreen} />
            <Stack.Screen name="CategorieView" component={UserViewScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
