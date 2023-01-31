import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Images from "../assets/Images";

export const CigAnimation = ({ onCigFinishHandler }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [onFinAnimation, setOnFinAnim] = useState(false);
  const [clock, setClock] = useState({
    minutes: 0,
    sec: 59,
  });
  const cigImageW = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (onFinAnimation) {
      onCigFinishHandler(onFinAnimation);
    }
  }, [onFinAnimation]);

  useEffect(() => {
    let time = setInterval(() => {
      if (clock.minutes == 0 && clock.sec == 0) {
        setClock({
          minutes: 0,
          sec: 58,
        });
      } else {
        if (clock.sec <= 0) {
          setClock((prev) => {
            return {
              minutes: prev.minutes - 1,
              sec: 59,
            };
          });
        } else {
          setClock((prev) => {
            return {
              ...prev,
              sec: prev.sec - 1,
            };
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [clock]);

  useEffect(() => {
    if (!onFinAnimation) {
      Animated.timing(cigImageW, {
        toValue: 0,
        delay: 2000,
        duration: 1000000,
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

          dispatch(updateUser(dataToUpdate, user._id));
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

  return (
    <View style={styles.container}>
      <View style={styles.cig}>
        <Image
          source={Images["cigImg"]}
          style={{
            width: 60,
            height: 20,
          }}
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
            style={{ width: "100%", height: 20 }}
          />
        </Animated.View>
        <View
          style={[
            {
              position: "relative",
              flexDirection: "row",
            },
          ]}
        >
          <Image
            source={Images.cigSmoke}
            style={{ position: "absolute", right: -30, top: -100, width: 50 }}
            resizeMode="contain"
          />
          <View
            style={{
              width: 3,
              height: 21,
              backgroundColor: "#d21010",
              opacity: 0.7,
            }}
          ></View>
          <View
            style={{
              width: 5,
              height: 21,
              backgroundColor: "#332f2f",
              borderWidth: 0.5,
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
              opacity: 0.7,
            }}
          ></View>

          <Image
            resizeMode="stretch"
            source={Images.cig3}
            style={{ width: 20, height: 22, transform: [{ translateX: -5 }] }}
          />
        </View>
      </View>
      {/* <View style={styles.timer}>
        <Text style={styles.timerText}>
          0{clock.minutes}:
          {clock.sec >= 0 && clock.sec < 10 ? "0" + clock.sec : clock.sec}
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
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
  timerText: { fontSize: 15, fontFamily: "HammersmithOne-Bold" },
});
