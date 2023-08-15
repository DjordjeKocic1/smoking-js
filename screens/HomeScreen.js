import { useEffect, useState } from "react";

import { Achievements } from "./newScreens/Achievement/Achievements";
import { Breath } from "./newScreens/Breath/Breath";
import { CigAnimation } from "../components/CigAnimation";
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
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectUser } from "../store/userReducer";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
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
          {!!user && <Stack.Screen name="UserScreen" component={UserScreen} />}
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Tips" component={Tips} />
          <Stack.Screen name="Breath" component={Breath} />
          <Stack.Screen name="Savings" component={Savings} />
          <Stack.Screen name="Health" component={Health} />
          <Stack.Screen name="Slow" component={Slow} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="QuitNow" component={QuitNow} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="Achievements" component={Achievements} />
          <Stack.Screen name="Mentor" component={Mentor} />
          <Stack.Screen name="TwoSame" component={TwoSame} />
          <Stack.Screen name="TwoSameLevel2" component={TwoSameLevel2} />
          <Stack.Screen name="TwoSameLevel3" component={TwoSameLevel3} />
          <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
        </Stack.Group>
      </Stack.Navigator>
      {cigIsFin && (
        <Info
          text={"Congratulations, the cigarette is just burned out"}
          user={user}
        />
      )}
    </View>
  );
};

export default HomeScreen;
