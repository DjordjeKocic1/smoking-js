import * as Progress from "react-native-progress";

import { Dimensions, View } from "react-native";

export const Charts = ({ user }) => {
  return (
    <View>
      <Progress.CircleSnail
        color={["red", "green", "blue"]}
        spinDuration={10000}
      />
    </View>
  );
};
