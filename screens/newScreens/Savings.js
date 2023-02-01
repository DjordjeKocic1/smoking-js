import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, updateUser } from "../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { SubmitButton } from "../../components/SubmitButton";
import { backButtonHandlerAlert } from "../../helper/helpers";

export const Savings = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [cigarettesDay, setCounter] = useState(0);
  const [packCigarettesPrice, setAmount] = useState(0);
  const [cigarettesInPack, setCigarettesInPack] = useState(0);

  const moveAnime = useRef(new Animated.Value(0)).current;
  const moveAnime1 = useRef(new Animated.Value(0)).current;
  const moveAnime2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  useEffect(() => {
    !!user && !!user.savedInfo && !!user.savedInfo.cigarettesDay
      ? setCounter(user.savedInfo.cigarettesDay)
      : setCounter(user.consumptionInfo.cigarettesDay);
    !!user && !!user.savedInfo && !!user.savedInfo.packCigarettesPrice
      ? setAmount(user.savedInfo.packCigarettesPrice)
      : setAmount(user.consumptionInfo.packCigarettesPrice);
    !!user && !!user.savedInfo && !!user.savedInfo.cigarettesInPack
      ? setCigarettesInPack(user.savedInfo.cigarettesInPack)
      : setCigarettesInPack(user.consumptionInfo.cigarettesInPack);

    return () => {};
  }, [user]);

  const removechangeHandler = (state, innerState) => {
    if (innerState <= 0) {
      return;
    }
    state(innerState - 1);
    if (innerState == cigarettesDay) {
      Animated.timing(moveAnime, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!!finished) {
          Animated.timing(moveAnime, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      });
    } else if (innerState == packCigarettesPrice) {
      Animated.timing(moveAnime1, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!!finished) {
          Animated.timing(moveAnime1, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      });
    } else {
      Animated.timing(moveAnime2, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!!finished) {
          Animated.timing(moveAnime2, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      });
    }
  };

  const submitNewconsumptionInfoHanlder = () => {
    let dataToSend = {
      savedInfo: {
        cigarettesDay: cigarettesDay,
        packCigarettesPrice: packCigarettesPrice,
        cigarettesInPack: cigarettesInPack,
        cigarettesAvoided:
          !!user.savedInfo && !!user.savedInfo.cigarettesAvoided
            ? user.savedInfo.cigarettesAvoided
            : 0,
      },
    };
    dispatch(updateUser(dataToSend, user._id));
    setIsUpdate(false);
  };

  console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={styles.saving}>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/nosmoking.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={[styles.savingText]}>Avoided</Text>
          <Text style={[styles.savingText, { color: "green" }]}>
            +
            {!!user.savedInfo && !!user.savedInfo.cigarettesAvoidedCost
              ? user.savedInfo.cigarettesAvoidedCost +
                !!user.consumptionInfo.cigarettesAvoidedCost
              : user.consumptionInfo.cigarettesAvoidedCost}
            $
          </Text>
        </View>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/daymoney.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={[styles.savingText]}>Cigarette daily</Text>
          <Text
            style={[
              styles.savingText,
              {
                color:
                  !!user.smokingInfo && user.smokingInfo.isQuiting
                    ? "green"
                    : "red",
              },
            ]}
          >
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? "+" : "-"}
            {!!user.savedInfo && user.savedInfo.cigarettesDailyCost
              ? user.savedInfo.cigarettesDailyCost
              : user.consumptionInfo.cigarettesDailyCost}
            $
          </Text>
        </View>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/montly.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={[styles.savingText]}>Cigarette monthly</Text>
          <Text
            style={[
              styles.savingText,
              {
                color:
                  !!user.smokingInfo && user.smokingInfo.isQuiting
                    ? "green"
                    : "red",
              },
            ]}
          >
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? "+" : "-"}
            {!!user.savedInfo && !!user.savedInfo.cigarettesMontlyCost
              ? user.savedInfo.cigarettesMontlyCost
              : user.consumptionInfo.cigarettesMontlyCost}
            $
          </Text>
        </View>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/yearly.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={[styles.savingText]}>Cigarette yearly</Text>
          <Text
            style={[
              styles.savingText,
              {
                color:
                  !!user.smokingInfo && user.smokingInfo.isQuiting
                    ? "green"
                    : "red",
              },
            ]}
          >
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? "+" : "-"}
            {!!user.savedInfo && !!user.savedInfo.cigarettesYearlyCost
              ? user.savedInfo.cigarettesYearlyCost
              : user.consumptionInfo.cigarettesYearlyCost}
            $
          </Text>
        </View>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/5year.png")}
            resizeMode="contain"
            style={{ width: 100, height: 50 }}
          />
          <Text style={[styles.savingText]}>Cigarette 5 Years</Text>
          <Text
            style={[
              styles.savingText,
              {
                color:
                  !!user.smokingInfo && user.smokingInfo.isQuiting
                    ? "green"
                    : "red",
              },
            ]}
          >
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? "+" : "-"}
            {!!user.savedInfo && !!user.savedInfo.cigarettes5YearCost
              ? user.savedInfo.cigarettes5YearCost
              : user.consumptionInfo.cigarettes5YearCost}
            $
          </Text>
        </View>
        <View style={styles.savingBox}>
          <Image
            source={require("../../assets/images/games/10year.png")}
            resizeMode="contain"
            style={{ width: 100, height: 50 }}
          />
          <Text style={[styles.savingText]}>Cigarette 10 Years</Text>
          <Text
            style={[
              styles.savingText,
              {
                color:
                  !!user.smokingInfo && user.smokingInfo.isQuiting
                    ? "green"
                    : "red",
              },
            ]}
          >
            {!!user.smokingInfo && user.smokingInfo.isQuiting ? "+" : "-"}
            {!!user.savedInfo && !!user.savedInfo.cigarettes10YearCost
              ? user.savedInfo.cigarettes10YearCost
              : user.consumptionInfo.cigarettes10YearCost}
            $
          </Text>
        </View>
      </View>
      {!!user.smokingInfo && !user.smokingInfo.isQuiting && (
        <Pressable
          onPress={() => setIsUpdate(!isUpdate)}
          style={[styles.updateCost]}
          android_ripple={{ color: "white" }}
        >
          <Text style={[styles.savingText, { color: "white", fontSize: 17 }]}>
            {isUpdate
              ? "You did? Congratulations!"
              : "You cut down on smoking? Click"}
          </Text>
        </Pressable>
      )}
      {isUpdate &&
        !!user &&
        !!user.smokingInfo &&
        !user.smokingInfo.isQuiting && (
          <>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <View style={styles.updateCostInner}>
                <Text style={styles.updateCostInnerText1}>Cigarette/Day</Text>
                <Text style={styles.updateCostInnerText2}>{cigarettesDay}</Text>
                <Animated.View
                  style={[
                    styles.updateCostInnerPress,
                    { transform: [{ translateY: moveAnime }] },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      removechangeHandler(setCounter, cigarettesDay)
                    }
                    style={{ backgroundColor: "#C39351" }}
                    android_ripple={{ color: "white" }}
                  >
                    <Ionicons name="remove" size={30} color="white" />
                  </Pressable>
                </Animated.View>
                {cigarettesDay < user.consumptionInfo.cigarettesDay && (
                  <View style={[styles.refrash]}>
                    <Pressable
                      onPress={() =>
                        setCounter(user.consumptionInfo.cigarettesDay)
                      }
                    >
                      <Ionicons name="refresh" size={24} color="black" />
                    </Pressable>
                  </View>
                )}
              </View>
              <View style={styles.updateCostInner}>
                <Text style={styles.updateCostInnerText1}>Pack Costs</Text>
                <Text style={styles.updateCostInnerText2}>
                  {packCigarettesPrice}
                </Text>
                <Animated.View
                  style={[
                    styles.updateCostInnerPress,
                    { transform: [{ translateY: moveAnime1 }] },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      removechangeHandler(setAmount, packCigarettesPrice)
                    }
                    style={{ backgroundColor: "#C39351" }}
                    android_ripple={{ color: "white" }}
                  >
                    <Ionicons name="remove" size={30} color="white" />
                  </Pressable>
                </Animated.View>
                {packCigarettesPrice <
                  user.consumptionInfo.packCigarettesPrice && (
                  <View style={[styles.refrash]}>
                    <Pressable
                      onPress={() =>
                        setAmount(user.consumptionInfo.packCigarettesPrice)
                      }
                    >
                      <Ionicons name="refresh" size={24} color="black" />
                    </Pressable>
                  </View>
                )}
              </View>
              <View style={styles.updateCostInner}>
                <Text style={styles.updateCostInnerText1}>
                  Cigarette in Pack
                </Text>
                <Text style={styles.updateCostInnerText2}>
                  {cigarettesInPack}
                </Text>
                <Animated.View
                  style={[
                    styles.updateCostInnerPress,
                    { transform: [{ translateY: moveAnime2 }] },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      removechangeHandler(setCigarettesInPack, cigarettesInPack)
                    }
                    style={{ backgroundColor: "#C39351" }}
                    android_ripple={{ color: "white" }}
                  >
                    <Ionicons name="remove" size={30} color="white" />
                  </Pressable>
                </Animated.View>
                {cigarettesInPack < user.consumptionInfo.cigarettesInPack && (
                  <View style={[styles.refrash]}>
                    <Pressable
                      onPress={() =>
                        setCigarettesInPack(
                          user.consumptionInfo.cigarettesInPack
                        )
                      }
                    >
                      <Ionicons name="refresh" size={24} color="black" />
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
            <SubmitButton onPress={submitNewconsumptionInfoHanlder}>
              Update
            </SubmitButton>
          </>
        )}
      {user.smokingInfo.isQuiting && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              fontSize: 17,
              marginBottom: 5,
            }}
          >
            Grand Savings per day
          </Text>
          <Text
            style={{
              color: "green",
              fontSize: 25,
              fontFamily: "HammersmithOne-Bold",
              textAlign: "center",
            }}
          >
            +
            {!!user &&
              !!user.consumptionInfo &&
              user.consumptionInfo.cigarettesDailyCost *
                user.smokingInfo.noSmokingDays}
            $
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: "relative",
    backgroundColor: "#e1d5c9",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  saving: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  savingBox: {
    width: 150,
    height: 120,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    justifyContent: "space-evenly",
    backgroundColor: "#c393513d",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    opacity: 0.7,
    padding: 5,
  },
  savingText: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  updateCost: {
    backgroundColor: "#c39351",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 5,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  updateCostContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  updateCostInner: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    margin: 2,
    padding: 10,
    borderRadius: 10,
    width: 160,
    backgroundColor: "#c393513d",
  },
  updateCostInnerPress: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 20,
  },
  updateCostInnerText1: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
  updateCostInnerText2: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
  },
  refrash: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
});
