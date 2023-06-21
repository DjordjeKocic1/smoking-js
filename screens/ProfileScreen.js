import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { backButtonHandler, backButtonHandlerAlert } from "../helper/helpers";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";

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
    backButtonHandler(navigation, "UserScreen");
  }, []);

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
        image: !!user.image ? user.image : "",
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
                source={{ uri: user.image }}
              />
            </View>
            <Text style={styles.regText}>
              {!!user.smokingInfo && user.smokingInfo.dateOfQuiting}
            </Text>
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
