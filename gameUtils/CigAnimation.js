import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
} from "react-native";

import Images from "../assets/Images";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const CigAnimation = () => {
  const cig1Op = useRef(new Animated.Value(1)).current;
  const [cig1ShowDirt, setCig1ShowDirt] = useState(false);

  const cig2Op = useRef(new Animated.Value(1)).current;
  const [cig2ShowDirt, setCig2ShowDirt] = useState(false);

  const cig3Op = useRef(new Animated.Value(1)).current;
  const [cig3ShowDirt, setCig3ShowDirt] = useState(false);

  const cig4Op = useRef(new Animated.Value(1)).current;
  const [cig4ShowDirt, setCig4ShowDirt] = useState(false);

  const cig5Op = useRef(new Animated.Value(1)).current;
  const [cig5ShowDirt, setCig5ShowDirt] = useState(false);

  const cig6Op = useRef(new Animated.Value(1)).current;
  const [cig6ShowDirt, setCig6ShowDirt] = useState(false);

  const cig7Op = useRef(new Animated.Value(1)).current;
  const [cig7ShowDirt, setCig7ShowDirt] = useState(false);

  const cig8Op = useRef(new Animated.Value(1)).current;
  const [cig8ShowDirt, setCig8ShowDirt] = useState(false);

  const cig9Op = useRef(new Animated.Value(1)).current;
  const [cig9ShowDirt, setCig9ShowDirt] = useState(false);

  useEffect(() => {
    Animated.timing(cig1Op, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!!finished) {
        setCig1ShowDirt(true);
        Animated.timing(cig2Op, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (!!finished) {
            setCig2ShowDirt(true);
            Animated.timing(cig3Op, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: false,
            }).start(({ finished }) => {
              if (!!finished) {
                setCig3ShowDirt(true);
                Animated.timing(cig4Op, {
                  toValue: 0,
                  duration: 2000,
                  useNativeDriver: false,
                }).start(({ finished }) => {
                  if (!!finished) {
                    setCig4ShowDirt(true);
                    Animated.timing(cig5Op, {
                      toValue: 0,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start(({ finished }) => {
                      if (!!finished) {
                        setCig5ShowDirt(true);
                        Animated.timing(cig6Op, {
                          toValue: 0,
                          duration: 2000,
                          useNativeDriver: false,
                        }).start(({ finished }) => {
                          if (!!finished) {
                            setCig6ShowDirt(true);
                            Animated.timing(cig7Op, {
                              toValue: 0,
                              duration: 2000,
                              useNativeDriver: false,
                            }).start(({ finished }) => {
                              if (!!finished) {
                                setCig7ShowDirt(true);
                                Animated.timing(cig8Op, {
                                  toValue: 0,
                                  duration: 2000,
                                  useNativeDriver: false,
                                }).start(({ finished }) => {
                                  if (!!finished) {
                                    setCig8ShowDirt(true);
                                    Animated.timing(cig9Op, {
                                      toValue: 0,
                                      duration: 2000,
                                      useNativeDriver: false,
                                    }).start(({ finished }) => {
                                      if (!!finished) {
                                        setCig9ShowDirt(true);
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
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
          <Image resizeMode="stretch" source={Images.cig2} />
        </View>
        <View style={styles.cigWhite}>
          <Image resizeMode="stretch" source={Images.cig2} />
        </View>
        <View style={styles.cigWhite}>
          <Image
            resizeMode="stretch"
            source={cig9ShowDirt ? Images.cig3 : Images.cig2}
          />
        </View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig9Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig8ShowDirt ? Images.cig3 : Images.cig2}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig8Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig7ShowDirt ? Images.cig3 : Images.cig2}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig7Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig6ShowDirt ? Images.cig3 : Images.cig2}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cigWhite,
            {
              opacity: cig6Op,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            source={cig5ShowDirt ? Images.cig3 : Images.cig2}
          />
        </Animated.View>
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
          <Image resizeMode="stretch" source={Images.cig3} />
        </Animated.View>
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
  },
  cig: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cigWhite: {
    width: 10,
    height: 19,
  },
});
