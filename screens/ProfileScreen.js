import * as DocumentPicker from "expo-document-picker";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { backButtonHandler } from "../helper/helpers";
import { useLayoutEffect } from "react";

export const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    image: "",
  });

  useEffect(() => {
    backButtonHandler(navigation, "HomeScreen");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: !!user && user.name.toUpperCase(),
      headerRight: () => (
        <BackButton where={"HomeScreen"} navigation={navigation} />
      ),
      headerStyle: {
        backgroundColor: "#C39351",
      },
      headerTintColor: "white",
    });
  }, [navigation, user]);

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

  const testFile = () => {
    DocumentPicker.getDocumentAsync({ type: "image/*" })
      .then((res) => {
        dispatch(updateUser({ image: res.uri }, user._id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
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
      image: !!user.image ? user.image : "",
    });
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={[styles.imageContainer]}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: user.image }}
              />
            </View>
            <Feather
              onPress={testFile}
              style={styles.editIcon}
              name="edit-3"
              color="black"
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>Full Name</Text>
            <TextInput
              onChangeText={onNameChangeHandler}
              value={userProfile.name}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>Email</Text>
            <TextInput
              onChangeText={onEmailChangeHandler}
              value={userProfile.email}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>Address</Text>
            <TextInput
              onChangeText={onAddressChangeHandler}
              value={userProfile.address}
              style={styles.input}
            />
          </View>
          <View style={styles.inputsContent}>
            <Text>City</Text>
            <TextInput
              onChangeText={onCityChangeHandler}
              value={userProfile.city}
              style={styles.input}
            />
          </View>
        </View>
        <SubmitButton onPress={submittionHandler}>Save Changes</SubmitButton>
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
  headerContainer: {
    position: "relative",
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
});
