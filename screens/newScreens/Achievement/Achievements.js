import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import {
  getAchievements,
  selectAchievements,
} from "../../../store/achievementReducer";
import { useDispatch, useSelector } from "react-redux";

import AchievementsItem from "./AchievementsItem";
import { BackButton } from "../../../components/BackButton";
import { Loading } from "../../../components/Loading";
import { selectUser } from "../../../store/userReducer";
import { useEffect } from "react";

export const Achievements = ({ navigation }) => {
  const dispatch = useDispatch();
  const { achievements, isLoading } = useSelector(selectAchievements);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getAchievements(user._id));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[styles.mainContainer]}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerText}>Progress Overview</Text>
        <View style={styles.achievementsEarnContainer}>
          <Text style={styles.textCenter}>Achievements Earned</Text>
          <Text style={styles.textCenter}>
            {!!achievements &&
              !!achievements.length &&
              achievements.filter((v) => v.holding).length}
            /{!!achievements && achievements.length}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View style={[styles.achievementsEarnContainer, { width: "50%" }]}>
            <Text style={styles.textCenter}>Cigarette Avoided</Text>
            <Text style={styles.textCenter}>
              {!!achievements &&
                !!achievements.length &&
                achievements.filter(
                  (v) => v.categorie == "cigarettesAvoided" && v.holding
                ).length}
              /
              {!!achievements &&
                !!achievements.length &&
                achievements.filter((v) => v.categorie == "cigarettesAvoided")
                  .length}
            </Text>
          </View>
          <View style={[styles.achievementsEarnContainer, { width: "50%" }]}>
            <Text style={styles.textCenter}>Health</Text>
            <Text style={styles.textCenter}>
              {!!achievements &&
                !!achievements.length &&
                achievements.filter(
                  (v) => v.categorie == "avgHealth" && v.holding
                ).length}
              /
              {!!achievements &&
                !!achievements.length &&
                achievements.filter((v) => v.categorie == "avgHealth").length}
            </Text>
          </View>
          <View style={[styles.achievementsEarnContainer, { width: "50%" }]}>
            <Text style={styles.textCenter}>No Smoking Days</Text>
            <Text style={styles.textCenter}>
              {!!achievements &&
                !!achievements.length &&
                achievements.filter(
                  (v) => v.categorie == "noSmokingDays" && v.holding
                ).length}
              /
              {!!achievements &&
                !!achievements.length &&
                achievements.filter((v) => v.categorie == "noSmokingDays")
                  .length}
            </Text>
          </View>
          <View style={[styles.achievementsEarnContainer, { width: "50%" }]}>
            <Text style={styles.textCenter}>Tasks</Text>
            <Text style={styles.textCenter}>
              {!!achievements &&
                !!achievements.length &&
                achievements.filter((v) => v.categorie == "tasks" && v.holding)
                  .length}
              /
              {!!achievements &&
                !!achievements.length &&
                achievements.filter((v) => v.categorie == "tasks").length}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={!!achievements && !!achievements.length && achievements}
        renderItem={({ item }) => <AchievementsItem item={item} />}
        key={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    position: "relative",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  textCenter: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 17 : 13,
  },
  achievementsEarnContainer: {
    borderWidth: 0.2,
    borderColor: "4e3f28",
    width: "100%",
    height: Dimensions.get("screen").width > 600 ? 100 : 50,
    justifyContent: "center",
    padding: 5,
    borderRadius: 2,
    marginVertical: 10,
  },
});
