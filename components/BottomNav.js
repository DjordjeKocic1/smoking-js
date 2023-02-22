import * as Font from "expo-font";

import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

const routeComp = [
  {
    name: "HomeScreen",
    title: "Home",
    icon: ({ color }) => <AntDesign name="home" size={20} color={color} />,
  },
  {
    name: "Savings",
    title: "Savings",
    icon: ({ color }) => <FontAwesome name="money" size={20} color={color} />,
  },
  {
    name: "Health",
    title: "Health",
    icon: ({ color }) => <AntDesign name="hearto" size={20} color={color} />,
  },
  {
    name: "Goals",
    title: "Goals",
    icon: ({ color }) => <AntDesign name="rocket1" size={20} color={color} />,
  },
  // {
  //   name: "Chats",
  //   title: "Chats",
  //   icon: ({ color }) => <AntDesign name="wechat" size={20} color={color} />,
  // },
  {
    name: "Tips",
    title: "Tips",
    icon: ({ color }) => (
      <FontAwesome5 name="lightbulb" size={20} color={color} />
    ),
  },
];

export const BottomNav = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (!!route) {
      let findSelectedRout = routeComp.find(
        (routC) => routC.name == route.name
      );
      setSelected(findSelectedRout);
    }

    return () => {};
  }, [route]);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  const onSelectedRoute = (routeComponent) => {
    Animated.spring();
    navigation.navigate(routeComponent.name);
  };

  if (!fontsLoaded) {
    return;
  }

  return (
    <View style={styles.nav}>
      {routeComp.map((routeC) => {
        return (
          <Pressable
            onPress={() => onSelectedRoute(routeC)}
            key={routeC.name}
            style={[styles.innerNav]}
          >
            <routeC.icon
              color={
                selected && selected.name == routeC.name ? "#C39351" : "#222325"
              }
            />
            <Text style={[styles.innerNavText]}>{routeC.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    // backgroundColor: "#222325",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerNav: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  innerNavText: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
  },
});
