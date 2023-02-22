import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions, View } from "react-native";

export const Charts = ({ user }) => {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "#222325",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = [
    {
      name: "Your Saving",
      population: user,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Goal",
      population: 1000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <PieChart
        data={data}
        width={Dimensions.get("screen").width}
        height={250}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        center={[10, 50]}
        absolute
      />
    </View>
  );
};
