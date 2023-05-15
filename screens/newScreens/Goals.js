import { Text, View } from "react-native";
import {
  backButtonHandler,
  backButtonHandlerAlert,
} from "../../helper/helpers";

import { useEffect } from "react";

export const Goals = ({ navigation }) => {
  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Goals</Text>
    </View>
  );
};
