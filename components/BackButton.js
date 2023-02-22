import * as Font from "expo-font";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { Entypo } from "@expo/vector-icons";

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
    <View style={{ position: "absolute", right: 10, top: 0, zIndex: 999 }}>
      <Pressable
        onPress={() => navigation.navigate(where)}
        style={styles.submitButton}
      >
        <Entypo name="arrow-bold-left" size={30} color="#222325" />
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
