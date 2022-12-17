import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export const UserProfileIcon = ({ onPress }) => {
  return (
    <View style={styles.pressableContent}>
      <Pressable
        onPress={onPress}
        style={{ padding: 10 }}
        android_ripple={{ color: "#c39351" }}
      >
        <FontAwesome
          name="user"
          size={Dimensions.get("window").width < 380 ? 20 : 20}
          color="#c39351"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableContent: {
    width: Dimensions.get("window").width < 380 ? 44 : 44,
    height: Dimensions.get("window").width < 380 ? 44 : 44,
    borderRadius: Dimensions.get("window").width < 380 ? 44 / 2 : 44 / 2,
    backgroundColor: "#222325",
    borderWidth: 0,
    borderColor: "#222325",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
