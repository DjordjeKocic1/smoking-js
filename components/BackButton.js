import * as Font from "expo-font";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";

export const BackButton = ({ navigation, where }) => {
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
        onPress={() => navigation.replace(where)}
        style={styles.submitButton}
      >
        <AntDesign name="back" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 5,
    padding: 10,
  },
  submitText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
  },
});
