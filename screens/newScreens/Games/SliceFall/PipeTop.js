import { Image, Pressable, TouchableWithoutFeedback, View } from "react-native";

import Images from "../../../../assets/Images";

export const PipeTop = ({ size, body, color, engine }) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      resizeMode="stretch"
      source={Images.pipeTop}
    />
  );
};
