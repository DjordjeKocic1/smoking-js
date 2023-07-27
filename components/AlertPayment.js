import { Pressable, StyleSheet, Text, View } from "react-native";
import { hide, selectAlert } from "../store/common/alertPaymentReducer";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

export const AlertPayment = () => {
  const dispatch = useDispatch();
  const { alertMsg, isSuccessPayment } = useSelector(selectAlert);
  return (
    <View style={styles.alertOverLay}>
      <View style={styles.alertInner}>
        <Text style={styles.alertText}>
          {isSuccessPayment ? (
            <AntDesign name="checkcircle" size={20} color="green" />
          ) : (
            <AntDesign name="closecircle" size={20} color="red" />
          )}{" "}
          {alertMsg}
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
      </View>
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
