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
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Floor } from "./Floor";
import { GameEngine } from "react-native-game-engine";
import Images from "../../../../assets/Images";
import Matter from "matter-js";
import { backButtonHandlerAlert } from "../../../../helper/helpers";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

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
  const op = useRef(new Animated.Value(1)).current;
  const gameOverAnim = useRef(
    new Animated.Value(Constants.MAX_HEIGHT - 20)
  ).current;

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit game?");
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
        duration: 500,
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

  return (
    <View style={styles.container}>
      <Image
        source={Images.background}
        style={[styles.backgroundImage]}
        resizeMode="stretch"
      />
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[Physics]}
        entities={setupWorld()}
        onEvent={onEvent}
        running={running}
      >
        <StatusBar hidden={true} />
      </GameEngine>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: Constants.MAX_WIDTH / 2.5,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          opacity: 0.7,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 50,
            fontFamily: "HammersmithOne-Bold",
          }}
        >
          {score}
        </Text>
      </View>
      {!isTapped && (
        <Animated.View
          style={[
            styles.infoContainer,
            {
              opacity: op,
            },
          ]}
        >
          <Entypo
            name="info-with-circle"
            size={20}
            color="#222325"
            style={{ position: "absolute", left: 10, top: 7 }}
          />
          <View style={{ alignItems: "flex-start", position: "relative" }}>
            <Text style={{ fontFamily: "HammersmithOne-Bold" }}>
              -Tap on screen to rise
            </Text>
            <Text style={{ fontFamily: "HammersmithOne-Bold" }}>
              -Avoid blocks
            </Text>
            <Text style={{ fontFamily: "HammersmithOne-Bold" }}>
              -Try not to smoke for a 5 minutes
            </Text>
          </View>
        </Animated.View>
      )}
      {!running && (
        <View style={styles.gameOverContainer}>
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
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: "HammersmithOne-Bold",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#222325",
                }}
              >
                <Feather name="award" size={15} color="#c39351" /> Your Best:{" "}
                {score} <Feather name="award" size={15} color="#c39351" />
              </Text>
              <Text style={{ fontFamily: "HammersmithOne-Bold" }}>
                Score: {score}
              </Text>
            </View>
            <View style={styles.centeredContent}>
              <Pressable
                style={[styles.resetBtn, { backgroundColor: "green" }]}
                onPress={reset}
              >
                <Text style={styles.gameOverContainerTryAgain}>Continue</Text>
              </Pressable>
              <Pressable
                style={[styles.resetBtn, { backgroundColor: "red" }]}
                onPress={() => navigation.pop()}
              >
                <Text style={styles.gameOverContainerExit}>Exit</Text>
              </Pressable>
            </View>
          </Animated.View>
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
  centeredContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  infoContainer: {
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
    borderWidth: 5,
    borderColor: "#c39351",
    borderRadius: 10,
  },
  gameOverContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverContainerTryAgain: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
  },
  gameOverContainerExit: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
  },
  finContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  finContainerText: {
    fontSize: 17,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    marginBottom: 15,
  },
  finContainerText2: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
  },
});
