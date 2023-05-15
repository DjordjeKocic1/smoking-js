import * as Font from "expo-font";

import { Pressable, StyleSheet, Text, View } from "react-native";
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
    () => {};
  }, []);

  if (!fontsLoaded) {
    return;
  }

  return (
    <View style={{ position: "absolute", left: 10, top: 5, zIndex: 999 }}>
      <Pressable
        onPress={() => navigation.navigate(where)}
        style={styles.submitButton}
      >
        <Ionicons name="arrow-back-circle-sharp" size={40} color="#c39351" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 5,
    padding: 10,
  },
});
