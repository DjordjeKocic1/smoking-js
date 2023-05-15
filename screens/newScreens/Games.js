import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { backButtonHandler } from "../../helper/helpers";
import { useEffect } from "react";

export const Games = ({ navigation }) => {
  useEffect(() => {
    backButtonHandler(navigation, "HomeScreen");
    return () => {};
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.innerContainer}>
        <Pressable onPress={() => navigation.navigate("SliceFall")}>
          <ImageBackground
            source={require("../../assets/images/games/mole_0003.png")}
            resizeMode="contain"
            style={styles.innerContainerBox}
          ></ImageBackground>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerContainerBox: {
    width: 150,
    height: 150,
    margin: 10,
    borderWidth: 0.2,
    borderColor: "#222325",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
