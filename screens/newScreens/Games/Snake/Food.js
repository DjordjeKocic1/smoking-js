import { ImageBackground, StyleSheet, View } from "react-native";

export const Food = ({position,size}) => {
  return (
    <ImageBackground
    source={require("../../../../assets/images/games/istockphoto-90692172-612x612-removebg-preview.png")}
    resizeMode="contain"
      style={[
        styles.finger,
        {
          width: size,
          height: size,
          left: position[0] * size,
          top: position[1] * size,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  finger: {
    position: "absolute",
  },
});
