import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";

import { selectUser } from "../store/userReducer";
import { useSelector } from "react-redux";

const LoadingScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const opText = useRef(new Animated.Value(0)).current;
  const opTextDot1 = useRef(new Animated.Value(0)).current;
  const opTextDot2 = useRef(new Animated.Value(0)).current;
  const opTextDot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(opText, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opTextDot1, {
          toValue: 1,
          delay: 500,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opTextDot2, {
          toValue: 1,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opTextDot3, {
          toValue: 1,
          duration: 1000,
          delay: 1500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
      {
        iterations: 1,
      }
    ).start(({ finished }) => {
      if (finished) {
        !!user && !!user.userVerified
          ? navigation.replace("HomeScreen")
          : navigation.replace("SmokeCalculator");
      }
    });
    return () => {};
  }, [opText, user]);

  return (
    <View style={styles.container}>
      <View style={[styles.containerInner]}>
        <Text style={styles.letter}>Checking</Text>
        <Animated.View
          style={{
            opacity: opTextDot1,
          }}
        >
          <Text style={styles.letter}>.</Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: opTextDot2,
          }}
        >
          <Text style={styles.letter}>.</Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: opTextDot3,
          }}
        >
          <Text style={styles.letter}>.</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e1d5c9",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  containerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  letter: {
    fontSize: 30,
    color: "#c39351",
    fontFamily: "HammersmithOne-Bold",
  },
});

export default LoadingScreen;
