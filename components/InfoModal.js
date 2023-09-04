import { Pressable, StyleSheet, Text, View } from "react-native";
import { hide, selectInfo } from "../store/infoReducer";
import { useDispatch, useSelector } from "react-redux";

import { Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Easing } from "react-native";
import { useEffect } from "react";

export const InfoModal = () => {
  const dispatch = useDispatch();
  const { message, isModalVisible } = useSelector(selectInfo);

  const anim = new Animated.Value(-20);

  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [isModalVisible]);

  return (
    <View style={styles.alertOverLay}>
      <Animated.View
        style={[styles.alertInner, { transform: [{ translateY: anim }] }]}
      >
        <Text style={styles.alertText}>
          <AntDesign name="infocirlce" size={20} color="orange" /> {message}
        </Text>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => dispatch(hide())}
        >
          <Text
            style={[
              styles.alertText,
              { textDecorationLine: "underline", padding: 5 },
            ]}
          >
            Ok
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertOverLay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000045",
  },
  alertInner: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
  alertText: { fontSize: 20, fontFamily: "HammersmithOne-Bold" },
  alertClose: { position: "absolute", right: 5, top: 5 },
});
