import { Animated } from "react-native";
import Images from "../../../../assets/Images";

export const Box = ({ size, body, color, engine, pose }) => {
  let animatedValue = new Animated.Value(body.velocity.y);
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  let rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ["-20deg", "0deg", "15deg", "45deg"],
    extrapolate: "clamp",
  });
  let image = Images["rocket" + pose];

  return (
    <Animated.Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: rotation }],
      }}
      resizeMode="stretch"
      source={
        !!engine.detector.pairs &&
        engine.detector.pairs.collisionStart.length > 0
          ? Images["rocketGameOver"]
          : image
      }
    />
  );
};
