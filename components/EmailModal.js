import { Pressable, StyleSheet, Text, View } from "react-native";
import { hideModal, selectEmail, sendEmail } from "../store/emailReducer";
import { useDispatch, useSelector } from "react-redux";

import { Animated } from "react-native";
import { Easing } from "react-native";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const EmailModal = () => {
  const dispatch = useDispatch();
  const { email, name, isEmailModalVisible } = useSelector(selectEmail);

  const anim = new Animated.Value(-10);

  const onEmailSendHandler = () => {
    const dataToSend = {
      name,
      email,
      params: {
        name,
        email,
      },
      templateId: 1,
    };
    dispatch(sendEmail(dataToSend));
  };

  useEffect(() => {
    if (isEmailModalVisible) {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.bounce,
      }).start();
    }
  }, [isEmailModalVisible]);

  return (
    <View style={styles.emailOverlay}>
      <Animated.View
        style={[styles.emailInner, { transform: [{ translateY: anim }] }]}
      >
        <Text style={styles.emailText}>
          User <Text style={{ color: "blue" }}>{email}</Text> does not exists in
          our system. If you want you can send him an email with invitation?
        </Text>
        <View style={styles.emailInnerPresContainer}>
          <Pressable
            onPress={onEmailSendHandler}
            android_ripple={{ color: "white" }}
            style={[styles.emailPressable, { backgroundColor: "green" }]}
          >
            <Text style={styles.alertText}>Yes, send an email</Text>
          </Pressable>
          <Pressable
            onPress={() => dispatch(hideModal())}
            android_ripple={{ color: "white" }}
            style={[styles.emailPressable, { backgroundColor: "red" }]}
          >
            <Text style={styles.alertText}>No</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

EmailModal.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  emailOverlay: {
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
  emailInner: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    margin: 1,
  },
  emailText: {
    fontSize: 17,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emailPressable: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  alertText: {
    fontSize: 17,
    fontFamily: "HammersmithOne-Bold",
    padding: 8,
    color: "white",
  },
  emailInnerPresContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
