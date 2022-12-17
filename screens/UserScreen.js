import * as Font from "expo-font";

import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { useLayoutEffect } from "react";

function UserScreen({ navigation }) {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [inputFocused, setInputFocused] = useState({
    inputFirst: false,
    inputSecund: false,
    inputT: false,
  });
  const [counter, setCounter] = useState(1);
  const [amount, setAmount] = useState("");
  const [cigarettesInPack, setCigarettesInPack] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: false,
    });
  }, [navigation]);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HammersmithOne-Bold": require("../assets/fonts/HammersmithOne-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    !!user.cigarettes ? setCounter(parseFloat(user.cigarettes)) : setCounter(1);
    !!user.packCigarettesPrice
      ? setAmount(user.packCigarettesPrice)
      : setAmount("");
    !!user.cigarettesInPack
      ? setCigarettesInPack(user.cigarettesInPack)
      : setCigarettesInPack("");
  }, [user]);

  const increaseHander = () => {
    setCounter((prev) => prev + 1);
  };
  const increaseLongHander = () => {
    setCounter((prev) => prev + 10);
  };

  const decreaseHander = () => {
    setCounter((prev) => (prev == 0 ? prev : prev - 1));
  };

  const amountChangeHandler = (enteredValue) => {
    setAmount(enteredValue.replace(/[^0-9*\.]/g, ""));
  };

  const cigarettesInPackChangeHandler = (enteredValue) => {
    setCigarettesInPack(enteredValue.replace(/[^0-9*]/g, ""));
  };

  const submittionHandler = () => {
    const dataToSend = {
      cigarettes: counter.toString(),
      packCigarettesPrice: amount.toString(),
      cigarettesInPack: cigarettesInPack.toString(),
    };

    dispatch(updateUser(dataToSend, user._id));
    navigation.replace("Categories");
  };

  if (!fontsLoaded) {
    return;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={[styles.headerText, { fontFamily: "HammersmithOne-Bold" }]}
        >
          How much do you spend
        </Text>
        <Image
          style={{
            width: 100,
            height: 200,
            resizeMode: "stretch",
            aspectRatio: 2,
          }}
          source={require("../assets/images/spendings.png")}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.pressebleContent}>
          <Text
            style={[
              styles.pressebleText,
              { color: inputFocused.inputFirst ? "#c39351" : "#222325" },
            ]}
          >
            Cigarettes/Day
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.counter}>{counter}</Text>
            <View
              style={[
                styles.buttonContent,
                { marginRight: Dimensions.get("window").width < 380 ? 5 : 15 },
              ]}
            >
              <Pressable
                onPress={decreaseHander}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
                onPressIn={() =>
                  setInputFocused((prev) => {
                    return {
                      ...prev,
                      inputFirst: true,
                    };
                  })
                }
                onPressOut={() =>
                  setInputFocused((prev) => {
                    return {
                      ...prev,
                      inputFirst: false,
                    };
                  })
                }
              >
                <Ionicons name="remove" size={20} color="#222325" />
              </Pressable>
            </View>
            <View style={styles.buttonContent}>
              <Pressable
                onPress={increaseHander}
                onLongPress={increaseLongHander}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
                onPressIn={() =>
                  setInputFocused((prev) => {
                    return {
                      ...prev,
                      inputFirst: true,
                    };
                  })
                }
                onPressOut={() =>
                  setInputFocused((prev) => {
                    return {
                      ...prev,
                      inputFirst: false,
                    };
                  })
                }
              >
                <Ionicons name="add" size={20} color="#222325" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.pressebleContent]}>
          <Text
            style={[
              styles.pressebleText,
              { color: inputFocused.inputT ? "#c39351" : "#222325" },
            ]}
          >
            Cigarettes/Pack
          </Text>
          <View style={styles.inputsContent}>
            <Text
              style={{
                color: "#222325",
                fontFamily: "HammersmithOne-Bold",
                fontSize: Dimensions.get("window").width < 380 ? 12 : 15,
              }}
            >
              Cigarettes
            </Text>
            <TextInput
              onChangeText={cigarettesInPackChangeHandler}
              value={cigarettesInPack}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="0"
              onPressIn={() =>
                setInputFocused((prev) => {
                  return {
                    ...prev,
                    inputT: true,
                  };
                })
              }
              onPressOut={() =>
                setInputFocused((prev) => {
                  return {
                    ...prev,
                    inputT: false,
                  };
                })
              }
            />
          </View>
        </View>
        <View style={[styles.pressebleContent]}>
          <Text
            style={[
              styles.pressebleText,
              { color: inputFocused.inputSecund ? "#c39351" : "#222325" },
            ]}
          >
            Pack of Cigarettes Cost
          </Text>
          <View style={styles.inputsContent}>
            <Text
              style={{
                color: "#222325",
                fontFamily: "HammersmithOne-Bold",
                fontSize: Dimensions.get("window").width < 380 ? 12 : 15,
              }}
            >
              Amount
            </Text>
            <TextInput
              onChangeText={amountChangeHandler}
              value={amount}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="$10"
              onPressIn={() =>
                setInputFocused((prev) => {
                  return {
                    ...prev,
                    inputSecund: true,
                  };
                })
              }
              onPressOut={() =>
                setInputFocused((prev) => {
                  return {
                    ...prev,
                    inputSecund: false,
                  };
                })
              }
            />
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <SubmitButton onPress={submittionHandler}>{"Done"}</SubmitButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: "#e1d5c9",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerText: {
    color: "#222325",
    fontSize: Dimensions.get("window").width < 380 ? 25 : 24,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#e1d5c9",
  },
  pressebleContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },
  pressebleText: {
    fontSize: Dimensions.get("window").width < 380 ? 17 : 20,
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
  },
  buttonContent: {
    overflow: "hidden",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#222325",
    width: Dimensions.get("window").width < 380 ? 33 : 33,
    height: Dimensions.get("window").width < 380 ? 33 : 33,
    borderRadius: Dimensions.get("window").width < 380 ? 33 / 2 : 33 / 2,
  },
  button: { flex: 1, justifyContent: "center", alignItems: "center" },
  counter: {
    fontSize: Dimensions.get("window").width < 380 ? 24 : 24,
    marginRight: 10,
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
  },
  inputsContent: {
    width: Dimensions.get("window").width < 380 ? "27%" : "30%",
    borderBottomWidth: 1,
    borderColor: "#222325",
  },
  input: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
  },
});

export default UserScreen;
