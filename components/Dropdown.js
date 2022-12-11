import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";

export const Dropdown = () => {
  return (
    <View style={styles.dropdown}>
      <ModalDropdown
        dropdownStyle={{ direction: "ltr" }}
        isFullWidth
        animated
        options={["option 1", "option 2"]}
      >
        <Ionicons name="md-menu" size={30} color="black" />
      </ModalDropdown>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    left: 30,
    top: 50,
    zIndex: 99,
    width: "30%",
  },
});
