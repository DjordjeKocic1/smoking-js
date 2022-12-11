import CategorieScreen from "./screens/CategorieScreen";
import CategrieViewScreen from "./screens/CategorieViewScreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
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
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Smoke Calculator"
              component={CategorieScreen}
              options={{
                headerShown: false,
                headerBackVisible: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 20,
                },
              }}
            />
            <Stack.Screen name="CategorieView" component={CategrieViewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
