import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

function CategrieViewScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, [route, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <Ionicons
              style={{ color: "white" }}
              name="md-star"
              size={24}
              color="black"
            />
          </Pressable>
        );
      },
    });
  }, [navigation]);
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

export default CategrieViewScreen;
