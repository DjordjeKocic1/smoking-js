import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { deleteUser, selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../components/BackButton";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";

export const ProfileScreen = ({ navigation }) => {
  const { user, isLoading } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    image: "",
  });

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
      userBasicInfo: {
        address: userProfile.address,
        city: userProfile.city,
      },
    };
    dispatch(updateUser(dataTosend, user._id));
  };

  const onRemoveAccount = () => {
    Alert.alert("Are you sure?", "Your are about to remove your account", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.removeItem("@user").then((r) => {
            dispatch(deleteUser(user._id, navigation));
          });
        },
      },
    ]);
  };

  useEffect(() => {
    if (!!user) {
      setUserProfile({
        email: !!user.email ? user.email : "",
        name: !!user.name ? user.name : "",
        address:
          !!user.userBasicInfo && !!user.userBasicInfo.address
            ? user.userBasicInfo.address
            : "",
        city:
          !!user.userBasicInfo && !!user.userBasicInfo.city
            ? user.userBasicInfo.city
            : "",
        image: require("../assets/images/user.png"),
      });
    }

    return () => {};
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, position: "relative" }}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={[styles.imageContainer]}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={require("../assets/images/user.png")}
              />
            </View>
            <Text style={styles.regText}>{!!user && user.name}</Text>
            <Text style={styles.regText}>
              Last updated:{" "}
              {!!user && new Date(user.updatedAt).toLocaleDateString()}
            </Text>
            <Text style={[styles.regText, { fontSize: 15 }]}>
              type: {!!user && !!user.type ? user.type : "user"}
            </Text>
          </View>
          <View style={styles.inputsContent}>
            <Text>Full Name</Text>
            <TextInput
              placeholder="enter full name"
              onChangeText={onNameChangeHandler}
              value={userProfile.name}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>Email</Text>
            <TextInput
              placeholder="enter email address"
              onChangeText={onEmailChangeHandler}
              value={userProfile.email}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>Address</Text>
            <TextInput
              placeholder="your street address"
              onChangeText={onAddressChangeHandler}
              value={userProfile.address}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>City</Text>
            <TextInput
              placeholder="your city"
              onChangeText={onCityChangeHandler}
              value={userProfile.city}
              style={styles.input}
            />
          </View>
        </View>
        <SubmitButton onPress={submittionHandler}>Save Changes</SubmitButton>
        <View style={styles.removeAccContainer}>
          <Pressable onPress={onRemoveAccount} style={styles.removeAcc}>
            <Text style={styles.removeAccText}>Remove account</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    padding: 30,
  },
  removeAccContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  removeAcc: {
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 3,
  },
  removeAccText: { fontSize: 15, fontFamily: "HammersmithOne-Bold" },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputsContent: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#222325",
    marginTop: 20,
  },
  countryBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  countryBoxFlags: {
    padding: 10,
    width: 100,
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  countryBoxText: {
    textAlign: "center",
    paddingVertical: 15,
    fontFamily: "HammersmithOne-Bold",
  },
  headerContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer_text: {
    textAlign: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
  },
  input: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#c39351",
    borderRadius: 100,
    color: "white",
    backgroundColor: "#c39351",
    padding: 5,
    fontSize: 15,
  },
  regText: {
    fontSize: 11,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 5,
  },
});
