import { Animated, Easing } from "react-native";

import { BottomNav } from "../components/BottomNav";
import { Chats } from "./newScreens/Chats";
import { CigAnimation } from "../gameUtils/CigAnimation";
import { Games } from "./newScreens/Games";
import { Goals } from "./newScreens/Goals";
import { Health } from "./newScreens/Health";
import { Info } from "../components/Info";
import { ProfileScreen } from "./ProfileScreen";
import { Savings } from "./newScreens/Savings";
import { SliceFall } from "./newScreens/Games/SliceFall/SliceFall";
import { Tips } from "./newScreens/Tips";
import UserScreen from "./UserScreen";
import { View } from "react-native-animatable";
import { backButtonHandlerAlert } from "../helper/helpers";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectUser } from "../store/userReducer";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  // const isLoading = useSelector((state) => state.user.isLoading);
  const [cigIsFin, setCigFin] = useState(false);
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  useEffect(() => {
    if (cigIsFin) {
      let timer = setTimeout(() => {
        setCigFin(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(heartBeat, {
        toValue: 1.08,
        duration: 700,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();
  }, [heartBeat]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerBackVisible: false,
      headerShown: false,
      headerStyle: {
        backgroundColor: "#c39351e0",
      },
      headerShadowVisible: false,
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#e1d5c9" }}>
      <CigAnimation
        user={user}
        onCigFinishHandler={(cigBool) => setCigFin(cigBool)}
      />
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            presentation: "card",
          }}
        >
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Tips" component={Tips} />
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
            name="SliceFall"
            component={SliceFall}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      {cigIsFin && (
        <Info text={"Congratulations, cigarette went out"} user={user} />
      )}
    </View>
  );
};

export default HomeScreen;
