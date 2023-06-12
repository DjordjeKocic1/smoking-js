import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

export const UserProfileIcon = ({ onPress, user }) => {
  return (
    <View style={styles.pressableContent}>
      <Pressable
        onPress={onPress}
        style={{ padding: 10 }}
        android_ripple={{ color: "#c39351" }}
      >
        <Image
          style={{ width: 33, height: 33, aspectRatio: 1 }}
          source={{ uri: user.image }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableContent: {
    width: Dimensions.get("window").width < 380 ? 33 : 33,
    height: Dimensions.get("window").width < 380 ? 33 : 33,
    borderRadius: Dimensions.get("window").width < 380 ? 33 / 2 : 33 / 2,
    borderWidth: 0,
    borderColor: "#222325",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
