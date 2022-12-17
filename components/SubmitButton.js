import * as Font from "expo-font";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export const SubmitButton = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);
  if (!fontsLoaded) {
    return;
  }
  return (
    <View>
      <Pressable
        {...props}
        style={styles.submitButton}
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
