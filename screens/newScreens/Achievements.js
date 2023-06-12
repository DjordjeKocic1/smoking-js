import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import {
  getAchievements,
  selectAchievements,
} from "../../store/achievementReducer";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../../components/Loading";
import { backButtonHandler } from "../../helper/helpers";
import { selectUser } from "../../store/userReducer";
import { useEffect } from "react";

export const Achievements = ({ navigation }) => {
  const dispatch = useDispatch();
  const { achievements, isLoading } = useSelector(selectAchievements);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getAchievements(user._id));
  }, [dispatch]);

  useEffect(() => {
    backButtonHandler(navigation, "UserScreen");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={[styles.mainContainer]}>
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
        renderItem={({ item }) => (
          <LinearGradient
            style={[styles.outerAch, { opacity: item.holding ? 1 : 0.3 }]}
            colors={["#a97d3b", "#c58f2b", "#a97d3b"]}
            start={{ x: 0.5, y: 0 }}
          >
            <View style={styles.innerAch}>
              <LinearGradient
                colors={["#956625", "#6e4119", "#956625"]}
                start={{ x: 0.2, y: 0 }}
              >
                <Text style={[styles.innerAchText]}>{item.name}</Text>
              </LinearGradient>
              <Text style={styles.innerAchText2}>{item.description}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/images/achImg.png")}
              />
            </View>
            <Text style={styles.innerAchText3}>{item.points}</Text>
          </LinearGradient>
        )}
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
  },
  achievementsEarnContainer: {
    borderWidth: 0.2,
    borderColor: "4e3f28",
    width: "100%",
    padding: 5,
    borderRadius: 2,
    marginVertical: 10,
  },
  outerAch: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#4e3f28",
    position: "relative",
  },
  innerAchText: {
    textAlign: "center",
    fontSize: 15,
    color: "#e7e4e1",
    fontFamily: "HammersmithOne-Bold",
  },
  innerAchText2: {
    textAlign: "center",
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 2,
    color: "#433113",
    fontFamily: "HammersmithOne-Bold",
  },
  innerAchText3: {
    textAlign: "center",
    fontSize: 13,
    color: "white",
    position: "absolute",
    right: 9,
    top: 13,
    fontFamily: "HammersmithOne-Bold",
  },
  imageContainer: { position: "absolute", right: 0, top: 3 },
  image: {
    width: 35,
    height: 35,
  },
});
