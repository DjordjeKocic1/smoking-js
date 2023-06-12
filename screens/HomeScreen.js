import * as Notifications from "expo-notifications";

import { Animated, Easing, View } from "react-native";
import { selectUser, userHealth } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { Achievements } from "./newScreens/Achievements";
import { Chats } from "./newScreens/Chats";
import { CigAnimation } from "../gameUtils/CigAnimation";
import { Games } from "./newScreens/Games";
import { Goals } from "./newScreens/Goals";
import { Health } from "./newScreens/Health";
import { Info } from "../components/Info";
import { Mentor } from "./newScreens/Mentor";
import { Notification } from "./newScreens/Notification";
import { ProfileScreen } from "./ProfileScreen";
import { QuitNow } from "./newScreens/QuitNow";
import { Savings } from "./newScreens/Savings";
import { SliceFall } from "./newScreens/Games/SliceFall/SliceFall";
import { Slow } from "./newScreens/Slow";
import { Task } from "./newScreens/Task";
import { Tips } from "./newScreens/Tips";
import UserScreen from "./UserScreen";
import { backButtonHandlerAlert } from "../helper/helpers";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getNotification } from "../store/notificationReducer";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [cigIsFin, setCigFin] = useState(false);
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
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
    return () => {};
  }, [heartBeat]);

  useEffect(() => {
    dispatch(getNotification(user._id));
  }, [user._id]);

  useEffect(() => {
    const confPushNotification = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Premission required",
          "Notification need the appropriate permissions."
        );
        dispatch(userHealth(user._id, {}));
        return;
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
          projectId: "f0b5f13d-478b-499a-b9a8-bff4e09320ce",
        });
        const dataToSend = {
          notificationToken: pushTokenData.data,
        };
        dispatch(userHealth(user._id, dataToSend));
      } catch (error) {
        dispatch(userHealth(user._id, {}));
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    confPushNotification();
  }, [user._id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#e1d5c9" }}>
      <CigAnimation
        user={user}
        onCigFinishHandler={(cigBool) => setCigFin(cigBool)}
      />
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            presentation: "card",
            headerShown: false,
          }}
        >
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Tips" component={Tips} />
          <Stack.Screen name="Savings" component={Savings} />
          <Stack.Screen name="Health" component={Health} />
          <Stack.Screen name="Goals" component={Goals} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Slow" component={Slow} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="QuitNow" component={QuitNow} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="Achievements" component={Achievements} />
          <Stack.Screen name="Mentor" component={Mentor} />
          <Stack.Screen name="Games" component={Games} />
          <Stack.Screen name="SliceFall" component={SliceFall} />
        </Stack.Group>
      </Stack.Navigator>
      {cigIsFin && (
        <Info text={"Congratulations, cigarette went out"} user={user} />
      )}
    </View>
  );
};

export default HomeScreen;
