import { Text, View } from "react-native";

import { BottomNav } from "../../components/BottomNav";

export const Chats = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats</Text>
      <BottomNav navigation={navigation} />
    </View>
  );
};
