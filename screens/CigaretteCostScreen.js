import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, updateUserCosts } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { backButtonHandlerAlert } from "../helper/helpers";
import { useLayoutEffect } from "react";

const CigaretteCostScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cigarettesInPack, setCigarettesInPack] = useState(0);
  const[imgOpacitiy,setImgOpacity] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
  }, []);

  const increaseHander = (state, innerState) => {
    state(innerState + 1);
  };
  const increaseLongHander = (state, innerState) => {
    state(innerState + 10);
  };

  const decreaseHander = (state, innerState) => {
    if(innerState == 0){
      return
    }
    state(innerState - 1);
  };

  const submittionHandler = () => {
    const dataToSend = {
      consumptionInfo: {
        cigarettesDay: counter,
        packCigarettesPrice: amount == "" ? 20 : amount,
        cigarettesInPack: cigarettesInPack == "" ? 20 : cigarettesInPack,
        cigarettesAvoided: 0,
      },
    };
    if (amount == "" || cigarettesInPack == "") {
      return Alert.alert(
        "Are you sure",
        "We need infomation about how much do you smoke and the costs",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              dispatch(updateUserCosts(dataToSend, user._id));
              navigation.replace("SmokingScreen");
            },
          },
        ]
      );
    }

    dispatch(updateUserCosts(dataToSend, user._id));
    navigation.replace("SmokingScreen");
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View onTouchStart={() => setImgOpacity(true)} onTouchEnd={() => setImgOpacity(false)} style={styles.headerContainer}>
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
            opacity:imgOpacitiy ? 0.4 : 1
          }}
          source={require("../assets/images/spendings.png")}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.pressebleContent}>
          <Text style={[styles.pressebleText]}>Cigarettes/Day</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.counter}>{counter}</Text>
            <View
              style={[
                styles.buttonContent,
                { marginRight: Dimensions.get("window").width < 380 ? 5 : 15 },
              ]}
            >
              <Pressable
                onPress={() => decreaseHander(setCounter, counter)}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="remove" size={20} color="#222325" />
              </Pressable>
            </View>
            <View style={styles.buttonContent}>
              <Pressable
                onPress={() => increaseHander(setCounter, counter)}
                onLongPress={() => increaseLongHander(setCounter, counter)}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="add" size={20} color="#222325" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.pressebleContent}>
          <Text style={[styles.pressebleText]}>Pack of Cigarette Cost</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.counter}>${amount}</Text>
            <View
              style={[
                styles.buttonContent,
                { marginRight: Dimensions.get("window").width < 380 ? 5 : 15 },
              ]}
            >
              <Pressable
                onPress={() => decreaseHander(setAmount, amount)}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="remove" size={20} color="#222325" />
              </Pressable>
            </View>
            <View style={styles.buttonContent}>
              <Pressable
                onPress={() => increaseHander(setAmount, amount)}
                onLongPress={() => increaseLongHander(setAmount, amount)}
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="add" size={20} color="#222325" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.pressebleContent}>
          <Text style={[styles.pressebleText]}>Cigarette in a Pack</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.counter}>{cigarettesInPack}</Text>
            <View
              style={[
                styles.buttonContent,
                { marginRight: Dimensions.get("window").width < 380 ? 5 : 15 },
              ]}
            >
              <Pressable
                onPress={() =>
                  decreaseHander(setCigarettesInPack, cigarettesInPack)
                }
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="remove" size={20} color="#222325" />
              </Pressable>
            </View>
            <View style={styles.buttonContent}>
              <Pressable
                onPress={() =>
                  increaseHander(setCigarettesInPack, cigarettesInPack)
                }
                onLongPress={() =>
                  increaseLongHander(setCigarettesInPack, cigarettesInPack)
                }
                style={styles.button}
                android_ripple={{ color: "#c39351" }}
              >
                <Ionicons name="add" size={20} color="#222325" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 30 }}>
          <SubmitButton onPress={submittionHandler}>{"Done"}</SubmitButton>
        </View>
      </View>
    </View>
  );
};

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
    fontSize: 18,
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
    fontSize: 18,
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

export default CigaretteCostScreen;
