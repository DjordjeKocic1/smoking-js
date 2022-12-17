import * as Font from "expo-font";

import {
  Animated,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SubmitButton } from "../components/SubmitButton";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const CategorieScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [contents, setContent] = useState([
    {
      name: "Travel",
      icon: Fontisto,
      iconName: "ship",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Books",
      icon: Ionicons,
      iconName: "book-outline",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Technology",
      icon: Entypo,
      iconName: "laptop",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Food & Drink",
      icon: MaterialCommunityIcons,
      iconName: "food-apple-outline",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Fitness",
      icon: Ionicons,
      iconName: "md-fitness-sharp",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Music",
      icon: Entypo,
      iconName: "folder-music",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Home Decor",
      icon: Ionicons,
      iconName: "home",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Online Courses",
      icon: MaterialIcons,
      iconName: "book-online",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Wardrobe",
      icon: MaterialCommunityIcons,
      iconName: "wardrobe-outline",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Gardening",
      icon: MaterialIcons,
      iconName: "eco",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Pets",
      icon: MaterialIcons,
      iconName: "pets",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
    {
      name: "Finance",
      icon: MaterialCommunityIcons,
      iconName: "finance",
      checked: false,
      style: {
        borderBottomW: 0.5,
        color: "#222325",
      },
    },
  ]);
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  const onSubmitHandler = () => {
    navigation.replace("Login");
  };

  const onPressCategorieHandler = (name) => {
    Animated.spring();
    setContent(
      contents.map((content) =>
        content.name == name
          ? {
              ...content,
              checked: true,
              style: { borderBottomW: 6, color: "#c39351" },
            }
          : { ...content }
      )
    );
    setActiveNextButton(true);
  };

  if (!fontsLoaded) {
    return;
  }

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={[styles.headerText, { fontFamily: "HammersmithOne-Bold" }]}
          >
            Your favorite lifestyle categories?
          </Text>
        </View>
        <View style={[styles.categorieContainer]}>
          {contents.map((content) => {
            return (
              <View
                key={content.name}
                style={[
                  styles.innerContainer,
                  { borderBottomWidth: content.style.borderBottomW },
                ]}
              >
                <Pressable
                  onPress={() => onPressCategorieHandler(content.name)}
                  style={styles.pressableContent}
                  android_ripple={{ borderless: true }}
                >
                  <content.icon
                    name={content.iconName}
                    size={24}
                    color={content.style.color}
                  />
                  <Text style={styles.innerText}>{content.name}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              color: "#c39351",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            You can choose more then one categorie
          </Text>
        </View>
        <View style={{ height: 80 }}>
          {activeNextButton && (
            <SubmitButton onPress={onSubmitHandler}>Next</SubmitButton>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
  },
  categorieContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  innerContainer: {
    textAlign: "center",
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#222325",
  },
  pressableContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  innerText: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 13,
    textAlign: "center",
  },
  headerContainer: {
    paddingHorizontal: 5,
  },
  headerText: {
    color: "#222325",
    fontSize: 25,
    paddingVertical: 20,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  text: {
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
  },
});
