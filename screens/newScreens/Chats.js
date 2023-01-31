import { Text, View } from "react-native";

import { backButtonHandlerAlert } from "../../helper/helpers";
import { useEffect } from "react";

export const Chats = ({ navigation }) => {
  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats</Text>
    </View>
  );
};
