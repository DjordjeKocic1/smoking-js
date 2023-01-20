import {
  Alert,
  Animated,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Constants from "../../../../gameUtils/Constants";
import { Entypo } from '@expo/vector-icons';
import { Food } from "./Food";
import { GameEngine } from "react-native-game-engine";
import { GameLoop } from "../../../../gameUtils/GameLoop";
import Head from "./Head";
import { StatusBar } from "expo-status-bar";
import { Tail } from "./Tail";
import { useState } from "react";

export const Snake = () => {
  const [engine, setEngine] = useState(null);
  let boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const [running, setRunning] = useState(true);

  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onEvent = (e) => {
    console.log(e);
    if (e.type === "game-over") {
      setRunning(false);
    }
  };

  const reset = () => {
    engine.swap({
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        size: 20,
        renderer: <Head />,
      },
      food: { position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
      tail: { size: 20, elements: [], renderer: <Tail /> },
    });
    setRunning(true);
  };

  return (
    <ImageBackground
    resizeMode="cover"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../../../../assets/images/games/greenField.png")}
    >
      <ImageBackground resizeMode="contain"  style={{  justifyContent: "center", alignItems: "center"}} source={require("../../../../assets/images/games/fence.png")}>
      <GameEngine
        style={[
          {
            width: boardSize,
            height: boardSize,
            flex: null,
          },
        ]}
        ref={(ref) => setEngine(ref)}
        systems={[GameLoop]}
        entities={{
          head: {
            position: [0, 0],
            size: 20,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 1,
            yspeed: 0,
            renderer: <Head />,
          },
          food: { position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
          tail: { size: 20, elements: [], renderer: <Tail /> },
        }}
        running={running}
        onEvent={onEvent}
      >
        <StatusBar hidden={true} />
      </GameEngine>
      </ImageBackground>
      <Button title="New Game" onPress={reset} />
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: "move-up" });
            }}
          >
            <Entypo name="arrow-bold-up" size={50} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: "move-left" });
            }}
          >
            <Entypo name="arrow-bold-left" size={50} color="black" />
          </TouchableOpacity>
          <View style={[styles.control, { backgroundColor: null }]} />
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: "move-right" });
            }}
          >
            <Entypo name="arrow-bold-right" size={50} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: "move-down" });
            }}
          >
            <Entypo name="arrow-bold-down" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginTop:20,
    flexDirection: "column",
  },
  controlRow: {
    height: 100,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  control: {
    width: 150,
    height: 150,
    backgroundColor: "blue",
    justifyContent:'center',
    alignItems:'center'
  },
});
