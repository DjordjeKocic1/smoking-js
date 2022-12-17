import * as Font from "expo-font";

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="caret-back-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    color: "white",
    borderRadius: 5,
  },
});
