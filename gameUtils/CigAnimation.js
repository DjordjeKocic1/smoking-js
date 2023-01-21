import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Images from "../assets/Images";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const CigAnimation = ({ clock }) => {
  const cig1Op = useRef(new Animated.Value(1)).current;
  const [cig1ShowDirt, setCig1ShowDirt] = useState(false);

  const cig2Op = useRef(new Animated.Value(1)).current;
  const [cig2ShowDirt, setCig2ShowDirt] = useState(false);

  const cig3Op = useRef(new Animated.Value(1)).current;
  const [cig3ShowDirt, setCig3ShowDirt] = useState(false);

  const cig4Op = useRef(new Animated.Value(1)).current;
  const [cig4ShowDirt, setCig4ShowDirt] = useState(false);

  const cig5Op = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(cig1Op, {
      toValue: 0,
      duration: 300,
      delay: 2000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!!finished) {
        setCig1ShowDirt(true);
        Animated.timing(cig2Op, {
          toValue: 0,
          duration: 300,
          delay: 2000,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (!!finished) {
            setCig2ShowDirt(true);
            Animated.timing(cig3Op, {
              toValue: 0,
              delay: 2000,
              duration: 300,
              useNativeDriver: false,
            }).start(({ finished }) => {
              if (!!finished) {
                setCig3ShowDirt(true);
                Animated.timing(cig4Op, {
                  toValue: 0,
                  duration: 300,
                  delay: 2000,
                  useNativeDriver: false,
                }).start(({ finished }) => {
                  if (!!finished) {
                    setCig4ShowDirt(true);
                  }
                });
              }
            });
          }
        });
      }
    });

    return () => {};
  }, [cig1Op]);
  return (
    <View style={styles.container}>
      <View style={styles.cig}>
        <Image
          source={Images["cig1"]}
          style={{
            width: 60,
            height: 20,
          }}
          resizeMode="stretch"
        />
        <View style={styles.cigWhite}>
          <Image
            resizeMode="stretch"
            style={{ width: 20 }}
            source={Images.cig2}
          />
        </View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig5Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig4ShowDirt ? Images.cig3 : Images.cig2}
            style={{ width: 20 }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig4Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig3ShowDirt ? Images.cig3 : Images.cig2}
            style={{ width: 20 }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig3Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig2ShowDirt ? Images.cig3 : Images.cig2}
            style={{ width: 20 }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig2Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig1ShowDirt ? Images.cig3 : Images.cig2}
            style={{ width: 20 }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig1Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={Images.cig3}
            style={{ width: 20 }}
          />
        </Animated.View>
      </View>
      <View style={styles.timer}>
        <Text style={styles.timerText}>
          0{clock.minutes}:{clock.sec}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    paddingVertical: 20,
    zIndex: 999,
    borderBottomWidth: 5,
    borderBottomColor: "#C39351",
    borderRadius: 10,
  },
  cig: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cigWhite: {
    width: 20,
    height: 19,
  },
  timer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  timerText: { fontSize: 20, fontFamily: "HammersmithOne-Bold" },
});
