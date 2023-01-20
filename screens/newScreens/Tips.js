import { Text, View } from "react-native";

import { BottomNav } from "../../components/BottomNav";

export const Tips = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tips</Text>
      <BottomNav navigation={navigation} />
    </View>
  );
};
