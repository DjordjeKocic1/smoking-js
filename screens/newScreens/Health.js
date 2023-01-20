import { Text, View } from "react-native";

import { BottomNav } from "../../components/BottomNav";

export const Health = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Health</Text>
      <BottomNav navigation={navigation} />
    </View>
  );
};
