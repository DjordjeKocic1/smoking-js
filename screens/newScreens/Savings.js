import { Text, View } from "react-native";

import { BottomNav } from "../../components/BottomNav";

export const Savings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Savings</Text>
      <BottomNav navigation={navigation} />
    </View>
  );
};
