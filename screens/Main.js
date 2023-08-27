import CategorieScreen from "./CategorieScreen";
import CigaretteCostScreen from "./CigaretteCostScreen";
import { ErrorModal } from "../components/ErrorModal";
import HomeScreen from "./HomeScreen";
import { InfoModal } from "../components/InfoModal";
import LoadingScreen from "./LoadingScreen";
import LoginScreen from "./LoginScreen";
import { MentorViewScreen } from "./MentorViewScreen";
import { SmokingScreen } from "./SmokingScreen";
import VerifyScreen from "./VerifyScreen";
import { View } from "react-native";
import { backButtonHandlerAlert } from "../helper/helpers";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectError } from "../store/errorReducer";
import { selectInfo } from "../store/infoReducer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { msg, isVisibleError } = useSelector(selectError);
  const { isModalVisible } = useSelector(selectInfo);

  useEffect(() => {
    backButtonHandlerAlert();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#e1d5c9" }}>
      {isVisibleError && msg && <ErrorModal message={msg} />}
      {isModalVisible && <InfoModal />}
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
            name="SmokeCalculator"
            component={CigaretteCostScreen}
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
