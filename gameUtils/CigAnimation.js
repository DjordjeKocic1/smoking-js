import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { selectUser, updateUserCosts } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { BackButton } from "../components/BackButton";
import { FontAwesome } from "@expo/vector-icons";
import Images from "../assets/Images";
import { selectNotification } from "../store/notificationReducer";
import { useNavigation } from "@react-navigation/native";

export const CigAnimation = ({ onCigFinishHandler }) => {
  const router = useNavigation();
  const { user } = useSelector(selectUser);
  const { notification } = useSelector(selectNotification);
  const dispatch = useDispatch();
  const [onFinAnimation, setOnFinAnim] = useState(false);
  const cigImageW = useRef(new Animated.Value(100)).current;
  const bellAnim = new Animated.Value(0);

  useEffect(() => {
    if (onFinAnimation) {
      onCigFinishHandler(onFinAnimation);
    }
    return () => {};
  }, [onFinAnimation]);

  useEffect(() => {
    if (!!notification && !!notification.length && notification.length > 0) {
      Animated.loop(
        Animated.timing(bellAnim, {
          toValue: 4,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        { iterations: 2 }
      ).start();
    }
  }, [bellAnim, notification]);

  useEffect(() => {
    if (!onFinAnimation) {
      Animated.timing(cigImageW, {
        toValue: 0,
        delay: 2000,
        duration: 300000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(({ finished }) => {
        if (!!finished) {
          setOnFinAnim(true);
          let dataToUpdate;
          if (user.savedInfo) {
            dataToUpdate = {
              savedInfo: {
                ...user.savedInfo,
                cigarettesAvoided:
                  user.consumptionInfo.cigarettesAvoided +
                  user.savedInfo.cigarettesAvoided,
              },
            };
          } else {
            dataToUpdate = {
              consumptionInfo: {
                ...user.consumptionInfo,
                cigarettesAvoided: user.consumptionInfo.cigarettesAvoided + 1,
              },
            };
          }

          dispatch(updateUserCosts(dataToUpdate, user._id));
        }
      });
    } else {
      Animated.timing(cigImageW, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(({ finished }) => {
        if (finished) {
          setOnFinAnim(false);
        }
      });
    }

    return () => {};
  }, [user, onFinAnimation]);

  const spin = bellAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "30deg", "-30deg", "30deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.cig}>
        <Image
          source={Images["cigImg"]}
          style={styles.cigImg}
          resizeMode="stretch"
        />
        <Animated.View
          style={[
            {
              position: "relative",
              width: cigImageW,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={Images.cig2}
            style={styles.cigImg2}
          />
        </Animated.View>
        <View
          style={{
            position: "relative",
            flexDirection: "row",
          }}
        >
          <Image
            source={Images.cigSmoke}
            style={styles.cigSmoke}
            resizeMode="contain"
          />
          <View style={styles.overLay}></View>
          <View style={styles.overLay2}></View>

          <Image
            resizeMode="stretch"
            source={Images.cig3}
            style={styles.cigImg3}
          />
        </View>
      </View>
      <View
        onTouchStart={() => router.navigate("Notification")}
        style={[styles.notificationContainer]}
      >
        <View style={styles.shareContainer}>
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationIconText}>
              {!!notification && !!notification.length
                ? notification.length
                : 0}
            </Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <FontAwesome name="bell" size={22} color="black" />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 35,
    justifyContent: "flex-end",
    backgroundColor: "#e1d5c9",
  },
  cig: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  shareContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: 30,
    bottom: 0,
    zIndex: 99999,
    paddingBottom: 10,
  },
  notificationIcon: {
    zIndex: 99999,
    backgroundColor: "#c39351",
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: 10 }, { translateY: 5 }],
  },
  notificationIconText: {
    fontSize: 10,
    color: "white",
    fontFamily: "HammersmithOne-Bold",
  },
  timerText: { fontSize: 15, fontFamily: "HammersmithOne-Bold" },
  cigImg: {
    width: 60,
    height: 20,
  },
  cigImg2: { width: "100%", height: 20 },
  cigImg3: { width: 20, height: 22, transform: [{ translateX: -5 }] },
  cigSmoke: { position: "absolute", right: -30, top: -100, width: 50 },
  overLay: {
    width: 3,
    height: 21,
    backgroundColor: "#d21010",
    opacity: 0.7,
  },
  overLay2: {
    width: 5,
    height: 21,
    backgroundColor: "#332f2f",
    borderWidth: 0.5,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    opacity: 0.7,
  },
});
