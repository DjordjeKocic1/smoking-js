import { Pressable, StyleSheet, Text, View } from "react-native";

export const SubmitButton = (props) => {
  return (
    <View>
      <Pressable
        {...props}
        style={[styles.submitButton]}
        android_ripple={{ color: "#6A7152" }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "HammersmithOne-Bold",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          {props.children}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#222325",
    color: "white",
    borderRadius: 5,
    marginTop: 20,
  },
});
