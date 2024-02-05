import { ScrollView, StyleSheet, Text, View } from "react-native";

import { selectUser } from "../store/userReducer";
import { useSelector } from "react-redux";

export const MyData = () => {
  const { user } = useSelector(selectUser);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, position: "relative" }}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>HEALTH MEASUREMENTS</Text>
        <View style={styles.mesure}>
          <Text>Stress tolerance</Text>
          <Text style={{ color: "grey" }}>
            {user && user.healthInfo && user.healthInfo.stressTolerance}%
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Physical</Text>
          <Text style={{ color: "grey" }}>
            {user &&
              user.healthInfo &&
              user.healthInfo.physicalAndBodilyStrength}
            %
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Lung capacity</Text>
          <Text style={{ color: "grey" }}>
            {user && user.healthInfo && user.healthInfo.lungCapacity}%
          </Text>
        </View>
        <Text style={styles.headerText}>FINANCIAL</Text>
        <View style={styles.mesure}>
          <Text>Cigarettes/day</Text>
          <Text style={{ color: "red" }}>
            -$
            {user &&
              user.consumptionInfo &&
              user.consumptionInfo.cigarettesDailyCost}
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Cigarettes/month</Text>
          <Text style={{ color: "red" }}>
            -$
            {user &&
              user.consumptionInfo &&
              user.consumptionInfo.cigarettesMontlyCost}
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Cigarettes/year</Text>
          <Text style={{ color: "red" }}>
            -$
            {user &&
              user.consumptionInfo &&
              user.consumptionInfo.cigarettesYearlyCost}
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Saves</Text>
          <Text style={{ color: "green" }}>
            +$
            {user &&
              user.consumptionInfo &&
              user.consumptionInfo.cigarettesAvoidedCost}
          </Text>
        </View>
        <Text style={styles.headerText}>OTHER</Text>
        <View style={styles.mesure}>
          <Text>No smoking</Text>
          <Text style={{ color: "grey" }}>
            {user && user.smokingInfo && user.smokingInfo.noSmokingDays}/days
          </Text>
        </View>
        <View style={styles.mesure}>
          <Text>Subscription</Text>
          <Text style={{ color: "grey" }}>
            {user && user.subscription ? user.subscription.subscribeLasts : 0}
            /days
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerText: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
  mesure: {
    borderBottomWidth: 0.2,
    borderColor: "grey",
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
