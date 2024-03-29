import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PropTypes from "prop-types";
import { costOfCigarette } from "../helper/helpers";
import { useEffect } from "react";
import { useRef } from "react";

export const Info = ({ text, user }) => {
  const animatedMove = useRef(
    new Animated.Value(Dimensions.get("screen").width + 200)
  ).current;

  useEffect(() => {
    Animated.timing(animatedMove, {
      toValue: 0,
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start();

    () => {};
  }, [animatedMove]);

  let calcAvoidedSavings = costOfCigarette(
    user.consumptionInfo.packCigarettesPrice,
    user.consumptionInfo.cigarettesInPack
  );

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: animatedMove }] }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.infoText}>{text}</Text>
      </View>
      <View>
        <Text style={styles.infoText2}>
          +{!!user && calcAvoidedSavings.toFixed(1)} $
        </Text>
      </View>
    </Animated.View>
  );
};

Info.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffeb",
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: "#C39351",
    borderRadius: 10,
    height: 150,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infoText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
    textAlign: "center",
  },
  infoText2: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
    color: "green",
    marginTop: 10,
  },
});
