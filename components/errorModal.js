import { Pressable, StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { hideError } from "../store/errorReducer";
import { useDispatch } from "react-redux";

export const ErrorModal = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.errorOverlay}>
      <View style={styles.errorInner}>
        <Text style={styles.errorText}>
          <AntDesign name="warning" size={20} color="orange" /> {message}
        </Text>
        <Pressable
          style={styles.errorPressable}
          onPress={() => dispatch(hideError())}
        >
          <Text
            style={[
              styles.alertText,
              { textDecorationLine: "underline", padding: 5, fontSize: 17 },
            ]}
          >
            Ok
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  errorOverlay: {
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
  errorInner: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 1,
  },
  errorText: { fontSize: 17, fontFamily: "HammersmithOne-Bold" },
  errorPressable: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
