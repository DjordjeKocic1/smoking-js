import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export const UserProfileIcon = ({ user }) => {
  return (
    <View style={styles.pressableContent}>
      <Pressable style={{ padding: 10 }} android_ripple={{ color: "#c39351" }}>
        <FontAwesome
          name="user"
          size={Dimensions.get("window").width < 380 ? 15 : 20}
          color="#c39351"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableContent: {
    position: "absolute",
    right: 20,
    top: 40,
    zIndex: 99,
    width: Dimensions.get("window").width < 380 ? 33 : 44,
    height: Dimensions.get("window").width < 380 ? 33 : 44,
    borderRadius:Dimensions.get("window").width < 380 ? 33 / 2 : 44 / 2,
    backgroundColor: "#222325",
    borderWidth: 0,
    borderColor: "#222325",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
