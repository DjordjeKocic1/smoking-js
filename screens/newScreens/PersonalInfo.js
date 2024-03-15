import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { deleteUser, selectUser, updateUser } from "../../store/userReducer";
import { paymentModalShow, selectPayment } from "../../store/PaymentReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../../components/BackButton";
import { FontAwesome } from "@expo/vector-icons";
import { Payment } from "../../components/Payment";
import { SubmitButton } from "../../components/SubmitButton";

export const PersonalInfo = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const { isPaymentModalVisible } = useSelector(selectPayment);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    setUserProfile({
      name: !!user && user.name ? user.name : "",
      email: !!user && user.email ? user.email : "",
      address: !!user && user.address ? user.address : "",
      city: !!user && user.city ? user.city : "",
      image: !!user && user.image ? user.image : "",
      subscription: !!user && !!user.subscription && user.subscription,
      smoking: !!user && !!user.smokingInfo && user.smokingInfo,
    });
  }, [user]);

  const onNameChangeHandler = (enteredValue) => {
    setUserProfile((prev) => {
      return {
        ...prev,
        name: enteredValue,
      };
    });
  };

  const onEmailChangeHandler = (enteredValue) => {
    setUserProfile((prev) => {
      return {
        ...prev,
        email: enteredValue,
      };
    });
  };

  const onAddressChangeHandler = (enteredValue) => {
    setUserProfile((prev) => {
      return {
        ...prev,
        address: enteredValue,
      };
    });
  };

  const onCityChangeHandler = (enteredValue) => {
    setUserProfile((prev) => {
      return {
        ...prev,
        city: enteredValue,
      };
    });
  };

  const submittionHandler = () => {
    const dataTosend = {
      email: userProfile.email,
      name: userProfile.name,
      address: userProfile.address,
      city: userProfile.city,
    };
    dispatch(updateUser(dataTosend, user._id));
    setEditable(false);
  };

  const removeUser = () => {
    Alert.alert("Remove Account", "Are you sure you want to remove account?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          AsyncStorage.removeItem("@user").then(() => {
            dispatch(deleteUser(user._id, navigation));
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} where={"Profile"} />
      <View style={styles.flex}>
        <Text style={styles.headerText}>Personal Info</Text>
        <FontAwesome
          onPress={() => setEditable(!editable)}
          name="edit"
          size={Dimensions.get("screen").width > 600 ? 40 : 24}
          color="black"
        />
      </View>
      <View
        style={{
          backgroundColor: editable ? "transparent" : "#ece5de",
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <View
          style={[styles.inputsContent, { paddingVertical: editable ? 2 : 15 }]}
        >
          <Text style={styles.personalText}>Full name</Text>
          {editable ? (
            <TextInput
              placeholder="enter full name"
              onChangeText={onNameChangeHandler}
              value={userProfile.name}
              style={styles.input}
            />
          ) : (
            <Text>{userProfile.name ? userProfile.name : "N/a"}</Text>
          )}
        </View>
        <View
          style={[styles.inputsContent, { paddingVertical: editable ? 2 : 15 }]}
        >
          <Text style={styles.personalText}>Email</Text>
          {editable ? (
            <TextInput
              placeholder="enter email address"
              onChangeText={onEmailChangeHandler}
              value={userProfile.email}
              style={styles.input}
            />
          ) : (
            <Text>{userProfile.email ? userProfile.email : "N/a"}</Text>
          )}
        </View>
        <View
          style={[styles.inputsContent, { paddingVertical: editable ? 2 : 15 }]}
        >
          <Text style={styles.personalText}>Address</Text>
          {editable ? (
            <TextInput
              placeholder="your street address"
              onChangeText={onAddressChangeHandler}
              value={userProfile.address}
              style={styles.input}
            />
          ) : (
            <Text>{userProfile.address ? userProfile.address : "N/a"}</Text>
          )}
        </View>
        <View
          style={[styles.inputsContent, { paddingVertical: editable ? 2 : 15 }]}
        >
          <Text style={styles.personalText}>City</Text>
          {editable ? (
            <TextInput
              placeholder="your city"
              onChangeText={onCityChangeHandler}
              value={userProfile.city}
              style={styles.input}
            />
          ) : (
            <Text>{userProfile.city ? userProfile.city : "N/a"}</Text>
          )}
        </View>
        {!editable && (
          <>
            <View style={[styles.inputsContent]}>
              <Text style={styles.personalText}>Quits smoking</Text>
              <Text>
                {userProfile.smoking && userProfile.smoking.isQuiting
                  ? "YES"
                  : "NO"}
              </Text>
            </View>
            <View style={[styles.inputsContent, { borderBottomWidth: 0 }]}>
              <Text style={styles.personalText}>Quit smoking day</Text>
              <Text>
                {userProfile.smoking &&
                userProfile.smoking.isQuiting &&
                userProfile.smoking.dateOfQuiting
                  ? userProfile.smoking.dateOfQuiting
                  : "N/a"}
              </Text>
            </View>
            <View style={[styles.inputsContent, { borderBottomWidth: 0 }]}>
              {userProfile.subscription &&
              userProfile.subscription.subscriber ? (
                <Text style={{ textAlign: "center" }}>
                  -{userProfile.subscription.subscribeLasts} day(s) of
                  subscription left-
                </Text>
              ) : (
                <Pressable
                  onPress={() => dispatch(paymentModalShow(true))}
                  style={styles.payment}
                >
                  <Text style={styles.paymentText}>
                    Subscribe now{" "}
                    <FontAwesome name="angle-right" color="black" />
                  </Text>
                </Pressable>
              )}
            </View>
          </>
        )}
      </View>
      <Pressable onPress={removeUser}>
        <Text style={styles.removeAccText}>Remove Account</Text>
      </Pressable>
      {editable && (
        <SubmitButton onPress={submittionHandler}>Save Changes</SubmitButton>
      )}
      {isPaymentModalVisible && <Payment />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  inputsContent: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    borderColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  input: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
    marginTop: 5,
  },
  headerText: {
    fontSize: Dimensions.get("screen").width > 600 ? 25 : 20,
    fontWeight: "bold",
    fontFamily: "HammersmithOne-Bold",
  },
  personalText: {
    fontWeight: "bold",
    marginTop: 2,
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 16,
  },
  payment: {
    marginTop: 5,
  },
  paymentText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
  },
  removeAccText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
