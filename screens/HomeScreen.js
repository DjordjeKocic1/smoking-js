import * as Notifications from "expo-notifications";

import { Animated, Easing, View } from "react-native";
import { selectUser, userHealth } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { Achievements } from "./newScreens/Achievement/Achievements";
import { Breath } from "./newScreens/Breath/Breath";
import { Chats } from "./newScreens/Chats";
import { CigAnimation } from "../components/CigAnimation";
import { Games } from "./newScreens/Games";
import { Goals } from "./newScreens/Goals";
import { Health } from "./newScreens/Health";
import { Info } from "../components/Info";
import { Mentor } from "./newScreens/Mentor";
import { Notification } from "./newScreens/Notification";
import { ProfileScreen } from "./ProfileScreen";
import { QuitNow } from "./newScreens/QuitNow";
import { Savings } from "./newScreens/Savings";
import { ScoreScreen } from "./newScreens/Games/ScoreScreen";
import { Slow } from "./newScreens/Slow";
import { Task } from "./newScreens/Task";
import { Tips } from "./newScreens/Tips";
import { TwoSame } from "./newScreens/Games/TwoSame/TwoSame";
import { TwoSameLevel2 } from "./newScreens/Games/TwoSame/TwoSameLevel2";
import { TwoSameLevel3 } from "./newScreens/Games/TwoSame/TwoSameLevel3";
import UserScreen from "./UserScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getNotification } from "../store/notificationReducer";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: false,
    };
  },
});

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [cigIsFin, setCigFin] = useState(false);

  useEffect(() => {
    if (cigIsFin) {
      let timer = setTimeout(() => {
        setCigFin(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

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
        dispatch(userHealth({}, user._id));
        return;
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
          projectId: "2da74976-bf21-485c-bcea-cf2b97fada34",
        });

        let dataToSend = {
          notificationToken: pushTokenData.data,
        };

        dispatch(userHealth(dataToSend, user._id));
      } catch (error) {
        console.log(error);
        dispatch(userHealth({}, user._id));
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
          <Stack.Screen name="Breath" component={Breath} />
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
          <Stack.Screen name="TwoSame" component={TwoSame} />
          <Stack.Screen name="TwoSameLevel2" component={TwoSameLevel2} />
          <Stack.Screen name="TwoSameLevel3" component={TwoSameLevel3} />
          <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
        </Stack.Group>
      </Stack.Navigator>
      {cigIsFin && (
        <Info text={"Congratulations, cigarette went out"} user={user} />
      )}
    </View>
  );
};

export default HomeScreen;
