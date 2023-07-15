import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  selectUser,
  updateUser,
  updateUserCosts,
} from "../../store/userReducer";
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

  const [savingBox1Enable, setSavedBox1Enable] = useState(false);
  const [savingBox2Enable, setSavedBox2Enable] = useState(false);
  const [savingBox3Enable, setSavedBox3Enable] = useState(false);
  const [savingBox4Enable, setSavedBox4Enable] = useState(false);
  const [savingBox5Enable, setSavedBox5Enable] = useState(false);
  const [savingBox6Enable, setSavedBox6Enable] = useState(false);

  const moveAnime = useRef(new Animated.Value(0)).current;
  const moveAnime1 = useRef(new Animated.Value(0)).current;
  const moveAnime2 = useRef(new Animated.Value(0)).current;

  const savingBox1Anim = useRef(new Animated.Value(120)).current;
  const savingBox2Anim = useRef(new Animated.Value(120)).current;
  const savingBox3Anim = useRef(new Animated.Value(120)).current;
  const savingBox4Anim = useRef(new Animated.Value(120)).current;
  const savingBox5Anim = useRef(new Animated.Value(120)).current;
  const savingBox6Anim = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
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
    dispatch(updateUserCosts(dataToSend, user._id));
    setIsUpdate(false);
  };

  const onSavingBoxChangeHandler = (
    savedBoxBool,
    savedBoxBoolState,
    savedBoxAnim
  ) => {
    if (!savedBoxBool) {
      savedBoxBoolState(true);
      Animated.timing(savedBoxAnim, {
        toValue: 160,
        duration: 700,
        useNativeDriver: false,
        easing: Easing.bounce,
      }).start();
    } else {
      savedBoxBoolState(false);
      Animated.timing(savedBoxAnim, {
        toValue: 120,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.bounce,
      }).start();
    }
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
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={styles.saving}>
        <Animated.View
          style={[styles.savingBox, { height: savingBox1Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox1Enable,
              setSavedBox1Enable,
              savingBox1Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/nosmoking.png")}
            resizeMode="contain"
            style={styles.costImage}
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
          {savingBox1Enable && (
            <View style={{ marginTop: 15 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[styles.savingBox, { height: savingBox2Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox2Enable,
              setSavedBox2Enable,
              savingBox2Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/daymoney.png")}
            resizeMode="contain"
            style={styles.costImage}
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
          {savingBox2Enable && (
            <View style={{ marginTop: 15 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/day
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesDay
                    : user.consumptionInfo.cigarettesDay}
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[styles.savingBox, { height: savingBox3Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox3Enable,
              setSavedBox3Enable,
              savingBox3Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/montly.png")}
            resizeMode="contain"
            style={styles.costImage}
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
          {savingBox3Enable && (
            <View style={{ marginTop: 15, marginBottom: 5 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/day
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesDay
                    : user.consumptionInfo.cigarettesDay}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Avg. Month days
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  30
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[styles.savingBox, { height: savingBox4Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox4Enable,
              setSavedBox4Enable,
              savingBox4Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/yearly.png")}
            resizeMode="contain"
            style={styles.costImage}
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
          {savingBox4Enable && (
            <View style={{ marginTop: 15, marginBottom: 5 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/day
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesDay
                    : user.consumptionInfo.cigarettesDay}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Days
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  365
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[styles.savingBox, { height: savingBox5Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox5Enable,
              setSavedBox5Enable,
              savingBox5Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/5year.png")}
            resizeMode="contain"
            style={styles.costImage2}
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
          {savingBox5Enable && (
            <View style={{ marginTop: 15, marginBottom: 5 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/day
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesDay
                    : user.consumptionInfo.cigarettesDay}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Year
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  5
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[styles.savingBox, { height: savingBox6Anim }]}
          onTouchStart={() =>
            onSavingBoxChangeHandler(
              savingBox6Enable,
              setSavedBox6Enable,
              savingBox6Anim
            )
          }
        >
          <Image
            source={require("../../assets/images/games/10year.png")}
            resizeMode="contain"
            style={styles.costImage2}
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
          {savingBox6Enable && (
            <View style={{ marginTop: 15, marginBottom: 5 }}>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Price
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  $
                  {!!user.savedInfo
                    ? user.savedInfo.packCigarettesPrice
                    : user.consumptionInfo.packCigarettesPrice}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/Pack
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesInPack
                    : user.consumptionInfo.cigarettesInPack}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Cigarette/day
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  {!!user.savedInfo
                    ? user.savedInfo.cigarettesDay
                    : user.consumptionInfo.cigarettesDay}
                </Text>
              </View>
              <View style={styles.extraContainer}>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  Year
                </Text>
                <Text
                  style={[styles.savingText, { fontSize: 10, color: "black" }]}
                >
                  10
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
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
                      <Ionicons name="refresh" size={24} color="#222325" />
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
                      <Ionicons name="refresh" size={24} color="#222325" />
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
                      <Ionicons name="refresh" size={24} color="#222325" />
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
        <View style={styles.isQuitingContainer}>
          <Text style={styles.isQuitingSavedText}>You saved</Text>
          <View style={styles.isQuitingContainerInner}>
            <Text style={styles.isQuitingContainerInnerText}>
              {!!user &&
                !!user.consumptionInfo &&
                (
                  user.consumptionInfo.cigarettesDailyCost *
                  user.smokingInfo.noSmokingDays
                ).toFixed(1)}
              $
            </Text>
          </View>
          <Text style={styles.didSmokeText}>You didn't smoke</Text>
          <View style={styles.didSmokeContainer}>
            <Text style={styles.didSmokeContainerText}>
              {!!user &&
                !!user.consumptionInfo &&
                user.consumptionInfo.cigarettesDay *
                  user.smokingInfo.noSmokingDays}
            </Text>
            <Image
              source={require("../../assets/images/games/cigAnim/cigDidnt.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </View>
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
    justifyContent: "center",
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
  costImage: {
    width: 50,
    height: 50,
  },
  costImage2: { width: 100, height: 50 },
  extraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120,
  },
  isQuitingContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  isQuitingSavedText: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 17,
    marginBottom: 5,
  },
  isQuitingContainerInner: {
    flexDirection: "row",
    justifyContent: "center",
    width: 200,
  },
  isQuitingContainerInnerText: {
    color: "green",
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
  },
  didSmokeText: {
    fontSize: 17,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    marginTop: 20,
  },
  didSmokeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  didSmokeContainerText: {
    color: "#c39351",
    fontSize: 25,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
  },
});
