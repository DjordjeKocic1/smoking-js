import { Pressable, StyleSheet, Text, View } from "react-native";

export const BreathFinModal = ({ onSuccessHandler }) => {
  return (
    <View style={styles.successContainerOverLay}>
      <View style={styles.successContainer}>
        <Text style={styles.successContainerText}>Were you successful?</Text>
        <Text style={[styles.successContainerText, { fontSize: 14 }]}>
          lunge capacity <Text style={{ color: "green" }}>+0.1%</Text>
        </Text>
        <View style={styles.successContainerPresseble}>
          <Pressable
            onPress={() => onSuccessHandler(true)}
            android_ripple={{ color: "red" }}
            style={[styles.successPresseble, { backgroundColor: "green" }]}
          >
            <Text style={styles.successPressebleText}>YES</Text>
          </Pressable>
          <Pressable
            onPress={() => onSuccessHandler(false)}
            android_ripple={{ color: "green" }}
            style={[styles.successPresseble, { backgroundColor: "red" }]}
          >
            <Text style={styles.successPressebleText}>NO</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  successContainerOverLay: {
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
  successContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  successContainerText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  successContainerPresseble: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  successPresseble: {
    margin: 5,
    padding: 10,
    borderRadius: 2,
  },
  successPressebleText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
    color: "white",
  },
});
