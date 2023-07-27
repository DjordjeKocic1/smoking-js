import { useDispatch, useSelector } from "react-redux";

import CategorieScreen from "./CategorieScreen";
import CigaretteCostScreen from "./CigaretteCostScreen";
import { ErrorModal } from "../components/errorModal";
import HomeScreen from "./HomeScreen";
import LoadingScreen from "./LoadingScreen";
import LoginScreen from "./LoginScreen";
import { MentorViewScreen } from "./MentorViewScreen";
import { SmokingScreen } from "./SmokingScreen";
import VerifyScreen from "./VerifyScreen";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectError } from "../store/errorReducer";

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { msg, isVisibleError } = useSelector(selectError);
  return (
    <View style={{ flex: 1, backgroundColor: "#e1d5c9" }}>
      {isVisibleError && msg && <ErrorModal message={msg} />}
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            presentation: "card",
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen
            name="Smoke Calculator"
            component={CigaretteCostScreen}
            options={{
              headerStyle: {
                backgroundColor: "#e1d5c9",
              },
            }}
          />
          <Stack.Screen name="SmokingScreen" component={SmokingScreen} />
          <Stack.Screen name="Categories" component={CategorieScreen} />
          <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MentorViewScreen" component={MentorViewScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default HomeScreen;
