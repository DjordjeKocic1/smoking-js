import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

function UserViewScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <Ionicons
              style={{ color: "white" }}
              name="md-star"
              size={24}
              color="#222325"
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

export default UserViewScreen;
