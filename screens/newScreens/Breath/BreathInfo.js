import { Pressable, StyleSheet, Text, View } from "react-native";

export const BreathInfo = ({ onReadChangeHandler }) => {
  return (
    <View style={styles.readContainerPopup}>
      <View style={styles.readContainer}>
        <Text
          style={[
            styles.readContainerText,
            { textAlign: "center", fontSize: 15, marginBottom: 10 },
          ]}
        >
          How to Do Breath Holding Exercise:
        </Text>
        <Text style={[styles.readContainerText, { fontSize: 12 }]}>
          1. Sit straight and keep your hands on your thighs
        </Text>
        <Text style={[styles.readContainerText, { fontSize: 12 }]}>
          2. Open your mouth and suck in as much air as you can to fill your
          chest
        </Text>
        <Text style={[styles.readContainerText, { fontSize: 12 }]}>
          3. Close your lips tightly
        </Text>
        <Text style={[styles.readContainerText, { fontSize: 12 }]}>
          4. Hold your breath for 25, 60, 90 or 120 seconds
        </Text>
        <Text
          style={[styles.readContainerText, { fontSize: 13, marginTop: 10 }]}
        >
          *Those with breath holding time of 25 seconds and above are considered
          to be safe. One must take care to not try too hard and get exhausted
          in the process.
        </Text>
        <Pressable
          onPress={() => onReadChangeHandler(false)}
          android_ripple={{ color: "#6A7152" }}
          style={styles.readPresseble}
        >
          <Text style={styles.readPressebleText}>Okey</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  readContainerPopup: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#00000045",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  readContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    width: "80%",
  },
  readContainerText: {
    fontFamily: "HammersmithOne-Bold",
    marginBottom: 5,
  },
  readPresseble: {
    backgroundColor: "#222325",
    padding: 10,
    borderRadius: 5,
  },
  readPressebleText: {
    fontFamily: "HammersmithOne-Bold",
    color: "white",
    textAlign: "center",
  },
});
