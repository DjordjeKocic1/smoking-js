import * as Font from "expo-font";

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useEffect } from "react";
import { useState } from "react";

export const BottomNav = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
      }, []);

    const loadFonts = async () => {
        await Font.loadAsync({
          "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
        });
        setFontsLoaded(true);
      };


      if (!fontsLoaded) {
        return;
      }

      return <View>
        
      </View>
}