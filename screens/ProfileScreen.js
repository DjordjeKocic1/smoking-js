import * as DocumentPicker from "expo-document-picker";

import {
  Animated,
  Image,
  Pressable,
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
import { countries } from "../utils/countries";
import { useLayoutEffect } from "react";

export const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const [countriesAr, setCountriesAr] = useState(countries);

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
    const countrySelected = countriesAr.find((count) => count.checked);
    const dataTosend = {
      email: userProfile.email,
      name: userProfile.name,
      userBasicInfo: {
        address: userProfile.address,
        city: userProfile.city,
        country: countrySelected.name,
        flag: countrySelected.flag,
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

  const onCountryChangeHanlder = (country) => {
    Animated.spring();
    setCountriesAr(
      countriesAr.map((cont) => {
        if (cont.id == country.id) {
          return { ...cont, checked: true, opacity: 1 };
        } else {
          return { ...cont, checked: false, opacity: 0.3 };
        }
      })
    );
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
      setCountriesAr(
        countriesAr.map((count) =>
          !!user.userBasicInfo &&
          !!user.userBasicInfo.country &&
          count.name == user.userBasicInfo.country
            ? { ...count, checked: true, opacity: 1 }
            : { ...count, checked: false, opacity: 0.3 }
        )
      );
    }

    return () => {};
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
        <View style={{ flex: 1 }}>
          <Text style={styles.countryBoxText}>Your Country?</Text>
          <View style={styles.countryBox}>
            {countriesAr.map((country) => {
              return (
                <Pressable
                  onPress={() => onCountryChangeHanlder(country)}
                  android_ripple={{
                    color: "#c39351",
                    foreground: true,
                    radius: 100,
                  }}
                  style={[
                    styles.countryBoxFlags,
                    {
                      opacity: country.opacity && country.opacity,
                    },
                  ]}
                  key={country.id}
                >
                  <Image
                    style={{ width: 70, height: 40 }}
                    source={{ uri: country.flag }}
                  />
                </Pressable>
              );
            })}
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
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden",
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
});
