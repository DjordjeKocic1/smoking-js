import { StyleSheet, Switch, Text, View } from "react-native";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

import { SubmitButton } from "../components/SubmitButton";
import { useState } from "react";

export const SmokingScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onSaveChangeHandler = () => {
    let dataToSend = {
      smokingInfo: {
        isQuiting: isEnabled,
        dateOfQuiting: new Date().toDateString(),
        noSmokingDays: 0,
      },
    };

    dispatch(updateUser(dataToSend, user._id));
    navigation.replace("Categories");
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.innerContainerText}>
          Do you want to quit now or take it slow?
        </Text>
        <Text style={styles.innerContainerText2}>
          I want to <Text style={{ color: "#c39351" }}>Quit now</Text>
        </Text>
        <Switch
          style={{ transform: [{ scale: 2 }], marginBottom: 3 }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.innerContainerText3}>
          {isEnabled ? "Yes" : "No"}
        </Text>
        <SubmitButton onPress={onSaveChangeHandler}>Save Changes</SubmitButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  innerContainerText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
  innerContainerText2: {
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
  },
  innerContainerText3: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    color: "#c39351",
    fontSize: 12,
    marginBottom: 30,
  },
});
