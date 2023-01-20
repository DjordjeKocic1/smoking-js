import { ImageBackground, View } from "react-native";

import Constants from "../../../../gameUtils/Constants";

export const Tail = ({ elements,size }) => {
  let tailList = elements.map((el, idx) => {
    return (
      <View
        key={idx}
        style={{
          width: size,
          height: size,
          position: "absolute",
          left: el[0] * size,
          top: el[1] * size,
          backgroundColor: "blue",
        }}
      />
    );
  });
  return (
    <View style={{ width: Constants.GRID_SIZE * size, height: Constants.GRID_SIZE * size }}>
        {tailList}
    </View>
);
};
