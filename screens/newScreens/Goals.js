import { Text, View } from "react-native";

import { BottomNav } from "../../components/BottomNav";

export const Goals = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Goals</Text>
      <BottomNav navigation={navigation} />
    </View>
  );
};
