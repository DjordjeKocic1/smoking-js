import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Physics, { resetPipes } from "./Physicts";
import { Box } from "./Box";
import { CigAnimation } from "../../../../gameUtils/CigAnimation";
import { Floor } from "./Floor";
import { GameEngine } from "react-native-game-engine";
import Images from "../../../../assets/Images";
import { MaterialIcons } from "@expo/vector-icons";
import Matter from "matter-js";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { backButtonHandler } from "../../../../helper/helpers";

const Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 320,
  PIPE_WIDTH: 100,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 41,
};

export const SliceFall = ({ navigation }) => {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [isTapped, setTapped] = useState(false);
  const [isClockEx, setIsClockEx] = useState(false);
  const [clock, setClock] = useState({
    minutes: 1,
    sec: 10,
  });
  const op = useRef(new Animated.Value(1)).current;
  const gameOverAnim = useRef(
    new Animated.Value(Constants.MAX_HEIGHT - 20)
  ).current;

  useEffect(() => {
    backButtonHandler(navigation, "HomeScreen");
  }, []);

  function setupWorld() {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0.0;

    let initialBox = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT
    );

    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [initialBox, floor1, floor2]);

    return {
      physics: {
        engine: engine,
        world: world,
      },
      floor1: {
        body: floor1,
        renderer: Floor,
      },
      floor2: {
        body: floor2,
        renderer: Floor,
      },
      initialBox: {
        engine: engine,
        body: initialBox,
        pose: 1,
        renderer: Box,
      },
    };
  }

  function onEvent(e) {
    if (e.type === "tapped") {
      Animated.timing(op, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setTapped(true);
        }
      });
    }
    if (e.type === "game-over") {
      setRunning(false);
    } else if (e.type === "score") {
      setScore(score + 1);
    }
  }

  const reset = () => {
    Animated.timing(gameOverAnim, {
      toValue: Constants.MAX_HEIGHT - 20,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!!finished) {
        resetPipes();
        gameEngine.swap(setupWorld());
        setRunning(true);
        setScore(0);
      }
    });
  };

  useEffect(() => {
    if (!running) {
      Animated.timing(gameOverAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
        easing: Easing.circle,
      }).start();
    }
  }, [gameOverAnim, running]);

  useLayoutEffect(() => {
    let time = setInterval(() => {
      if (clock.minutes == 0 && clock.sec == 0) {
        setIsClockEx(true);
        clearInterval(time);
      } else {
        if (clock.sec <= 0) {
          setClock((prev) => {
            return {
              minutes: prev.minutes - 1,
              sec: 60,
            };
          });
        } else {
          setClock((prev) => {
            return {
              ...prev,
              sec: prev.sec - 10,
            };
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [clock]);

  return (
    <View style={styles.container}>
      <Image
        source={Images.background}
        style={[styles.backgroundImage]}
        resizeMode="stretch"
      />
      <CigAnimation clock={clock} />
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[Physics]}
        entities={setupWorld()}
        onEvent={onEvent}
        running={running}
      >
        <StatusBar hidden={true} />
      </GameEngine>
      {!isTapped && (
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 50,
            zIndex: 999,
            paddingVertical: 20,
            paddingHorizontal: 40,
            backgroundColor: "white",
            width: Constants.MAX_WIDTH,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderWidth: 10,
            borderColor: "orange",
            borderRadius: 10,
          }}
        >
          <Animated.View style={{ alignItems: "center", opacity: op }}>
            <MaterialIcons name="touch-app" size={30} color="black" />
            <Text
              style={{ textAlign: "center", fontFamily: "HammersmithOne-Bold" }}
            >
              Tap on screen to rise
            </Text>
          </Animated.View>
        </View>
      )}
      {!running && !isClockEx && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={[
              styles.gameOver,
              {
                transform: [
                  {
                    translateY: gameOverAnim,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.gameOverText}>Game Over</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={[styles.resetBtn, { backgroundColor: "green" }]}
                onPress={reset}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10,
                    fontSize: 20,
                    fontFamily: "HammersmithOne-Bold",
                  }}
                >
                  Try Again
                </Text>
              </Pressable>
              <Pressable
                style={[styles.resetBtn, { backgroundColor: "red" }]}
                onPress={reset}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10,
                    fontSize: 20,
                    fontFamily: "HammersmithOne-Bold",
                  }}
                >
                  Exit
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      )}
      {isClockEx && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <View style={[styles.gameOver]}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HammersmithOne-Bold",
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Congratulations you didn't smoke
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={[styles.resetBtn, { backgroundColor: "green" }]}
                onPress={() => navigation.replace("HomeScreen")}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10,
                    fontSize: 20,
                    fontFamily: "HammersmithOne-Bold",
                  }}
                >
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    width: Constants.MAX_WIDTH,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 7,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderRadius: 10,
    borderColor: "orange",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOver: {
    padding: 20,
    backgroundColor: "white",
    borderWidth: 7,
    borderColor: "#C39351",
    borderRadius: 10,
  },
  bestGameHeaderText: {
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
  },
  bestGameHeaderText2: {
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
  },
  gameOverText: {
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
});
