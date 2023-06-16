import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Shadow } from "react-native-shadow-2";
import { backButtonHandler } from "../../helper/helpers";
import { useEffect } from "react";

export const Games = ({ navigation }) => {
  useEffect(() => {
    backButtonHandler(navigation, "HomeScreen");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#e1d5c9",
      }}
    >
      <View style={styles.innerContainer}>
        <Shadow>
          <Pressable
            style={[styles.innerContainerBox]}
            onPress={() => navigation.navigate("TwoSame")}
          >
            <Image
              source={require("../../assets/images/twoSameImgs/twoSame.png")}
              resizeMode="contain"
              style={{ width: 90, height: 90 }}
            />
          </Pressable>
        </Shadow>
        <Text style={styles.gameText}>Two of Same</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  innerContainerBox: {
    width: 100,
    height: 100,
    padding: 5,
    borderWidth: 1,
    borderColor: "#222325",
    borderRadius: 10,
    overflow: "hidden",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  gameText: {
    fontFamily: "HammersmithOne-Bold",
    marginTop: 10,
  },
});
