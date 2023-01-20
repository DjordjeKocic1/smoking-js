import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { Octicons } from "@expo/vector-icons";

const VerifyScreen = ({ navigation }) => {
  const [spinning, setSpinning] = useState(true);
  const [verifiedIconVis, setverifiedIconVis] = useState("none");
  const opText = useRef(new Animated.Value(0)).current;
  const opText2 = useRef(new Animated.Value(0)).current;
  const opText3 = useRef(new Animated.Value(0)).current;
  const spinner = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opText, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (!!finished) {
        Animated.timing(opText2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(({ finished }) => {
          if (!!finished) {
            Animated.parallel([
              Animated.timing(opText, {
                toValue: 0,
                delay: 1500,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.linear,
              }),
              Animated.timing(opText2, {
                toValue: 0,
                delay: 1500,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.linear,
              }),
            ]).start(({ finished }) => {
              if (!!finished) {
                setSpinning(false);
                setverifiedIconVis("flex");
                Animated.timing(opText3, {
                  toValue: 1,
                  duration: 1000,
                  delay: 1000,
                  useNativeDriver: true,
                  easing: Easing.linear,
                }).start(({ finished }) => {
                  if (!!finished) {
                    navigation.replace("HomeScreen");
                  }
                });
              }
            });
          }
        });
      }
    });

    return () => {};
  }, [opText]);

  return (
    <View style={styles.container}>
      <View style={[styles.containerInner]}>
        <Animated.View style={{ opacity: opText }}>
          <Text style={[styles.letter, { fontSize: 30 }]}>Please wait</Text>
        </Animated.View>
        <Animated.View style={{ opacity: opText2 }}>
          <Text style={[styles.letter, { fontSize: 10 }]}>
            user verification in progress
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: opText3, display: verifiedIconVis }}>
          <Octicons name="verified" size={100} color="#91ff91" />
        </Animated.View>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          opacity: 0.5,
        }}
      >
        <ActivityIndicator animating={spinning} size={300} color="#c39351" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  containerInner: {
    alignItems: "center",
    zIndex: 2,
  },
  letter: {
    color: "#c39351",
    fontFamily: "HammersmithOne-Bold",
  },
});

export default VerifyScreen;
