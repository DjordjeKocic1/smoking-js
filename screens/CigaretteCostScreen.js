import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { selectUser, userInfo } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../components/Loading";
import { SubmitButton } from "../components/SubmitButton";
import { useState } from "react";

const CigaretteCostScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cigarettesInPack, setCigarettesInPack] = useState(0);
  const [imgOpacitiy, setImgOpacity] = useState(false);

  const increaseHander = (state, innerState) => {
    state(innerState + 1);
  };
  const increaseLongHander = (state, innerState) => {
    state(innerState + 10);
  };

  const decreaseHander = (state, innerState) => {
    if (innerState == 0) {
      return;
    }
    state(innerState - 1);
  };

  const submittionHandler = () => {
    const dataToSend = {
      consumptionInfo: {
        cigarettesDay: counter == 0 ? 10 : counter,
        packCigarettesPrice: amount == 0 ? 10 : amount,
        cigarettesInPack: cigarettesInPack == 0 ? 10 : cigarettesInPack,
        cigarettesAvoided: 0,
      },
    };
    if (amount == 0 || cigarettesInPack == 0) {
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
              dispatch(
                userInfo(user._id, dataToSend, navigation, "SmokingScreen")
              );
            },
          },
        ]
      );
    }

    dispatch(userInfo(user._id, dataToSend, navigation, "SmokingScreen"));
  };

  const onMentorChangeHandler = () => {
    const dataToSend = {
      type: "mentor",
      userVerified: true,
      consumptionInfo: {
        cigarettesDay: counter == 0 ? 10 : counter,
        packCigarettesPrice: amount == 0 ? 10 : amount,
        cigarettesInPack: cigarettesInPack == 0 ? 10 : cigarettesInPack,
        cigarettesAvoided: 0,
      },
    };
    dispatch(userInfo(user._id, dataToSend, navigation, "LoadingScreen"));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <View
        onTouchStart={() => setImgOpacity(true)}
        onTouchEnd={() => setImgOpacity(false)}
        style={styles.headerContainer}
      >
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
            opacity: imgOpacitiy ? 0.4 : 1,
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
        <View style={styles.mentorContainer}>
          <Pressable
            onPress={onMentorChangeHandler}
            android_ripple={{ color: "#c39351" }}
            style={styles.pressebleContentMentor}
          >
            <Text style={styles.pressebleContentMentorText}>
              {"I'm joining as a mentor"}
            </Text>
            <FontAwesome
              name="hand-pointer-o"
              size={20}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: "#222325",
    fontSize: Dimensions.get("window").width < 380 ? 25 : 24,
    textAlign: "center",
  },
  mainContainer: {
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
  mentorContainer: {
    alignItems: "center",
  },
  pressebleContentMentor: {
    padding: 10,
    borderRadius: 5,
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c39351",
  },
  pressebleContentMentorText: {
    fontFamily: "HammersmithOne-Bold",
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
});

export default CigaretteCostScreen;
