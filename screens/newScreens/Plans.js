import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createPlane, deletePlan, selectUser } from "../../store/userReducer";
import { getMentor, selectMentor } from "../../store/mentorReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Entypo } from "@expo/vector-icons";

export const Plans = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(selectUser);
  const { mentor } = useSelector(selectMentor);
  const [create, setCreate] = useState(false);
  const [titles, setTitles] = useState([
    {
      name: "save $100",
      price: 100,
      userType: "user",
    },
    {
      name: "save $300",
      price: 300,
      userType: "user",
    },
    {
      name: "save $500",
      price: 500,
      userType: "user",
    },
    {
      name: "save $700",
      price: 700,
      userType: "user",
    },
    {
      name: "save $1000",
      price: 1000,
      userType: "user",
    },
    {
      name: "help a user to save $100",
      price: 100,
      userType: "mentor",
    },
    {
      name: "help a user to save $300",
      price: 300,
      userType: "mentor",
    },
    {
      name: "help a user to save $500",
      price: 500,
      userType: "mentor",
    },
    {
      name: "help a user to save $700",
      price: 700,
      userType: "mentor",
    },
    {
      name: "help a user to save $1000",
      price: 1000,
      userType: "mentor",
    },
  ]);

  useEffect(() => {
    dispatch(getMentor(user._id));
  }, [dispatch, user._id]);

  const onTopicCheck = (plan) => {
    Alert.alert("", `Are you sure the plan is completed?`, [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => dispatch(deletePlan(plan._id)) },
    ]);
  };

  const onTopicChangeHandler = (topic) => {
    let cloneTitles = [...titles].map((clone) =>
      topic.name == clone.name
        ? { ...clone, active: true }
        : { ...clone, active: false }
    );
    setTitles(cloneTitles);
  };

  const onTopicSaveChangeHanlder = (topic) => {
    dispatch(createPlane(topic, user._id));
    setCreate(false);
  };

  const onTopicDeleteHanlder = (id) => {
    Alert.alert("", "Are you sure you want to delete the plan?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => dispatch(deletePlan(id)) },
    ]);
  };

  let bestScoreUser =
    !!mentor && !!mentor.mentoringUser && mentor.mentoringUser.length
      ? mentor.mentoringUser.filter((b) =>
          Math.max(b.consumptionInfo.cigarettesAvoidedCost)
        )
      : [];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      endFillColor="#000"
      overScrollMode="never"
    >
      <Text style={styles.plansHeaderText}>My Plans</Text>
      {isLoading && (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator
            style={{ width: 50, height: 50 }}
            size="small"
            color="#222325"
          />
        </View>
      )}
      {!!user && !!user.plans && !!user.plans.length ? (
        user.plans.map((plan) => {
          return (
            <Pressable
              android_ripple={{ color: "#e1d5c9" }}
              style={[styles.plansCard, { opacity: plan.completed ? 0.3 : 1 }]}
              key={plan._id}
            >
              <Entypo
                onPress={() => onTopicDeleteHanlder(plan._id)}
                name="circle-with-cross"
                style={{ position: "absolute", right: -10, top: -15 }}
                size={24}
                color="red"
              />
              <View>
                <Text style={styles.plansCardText}>{plan.name}</Text>
                {plan.userType === "user" ? (
                  <Text
                    style={[
                      styles.plansCompleted,
                      {
                        color:
                          user.consumptionInfo.cigarettesAvoidedCost >=
                          +plan.price
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    You saved +${user.consumptionInfo.cigarettesAvoidedCost}
                  </Text>
                ) : (
                  <>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>
                      Highest save:
                    </Text>
                    <Text
                      style={[
                        styles.plansCompleted,
                        {
                          color: "green",
                        },
                      ]}
                    >
                      +$
                      {!!bestScoreUser.length &&
                      !!bestScoreUser[0].consumptionInfo
                        ? bestScoreUser[0].consumptionInfo.cigarettesAvoidedCost
                        : 0}
                    </Text>
                  </>
                )}
              </View>
              <View
                onTouchEnd={() => onTopicCheck(plan)}
                style={[styles.doneCheck]}
              >
                <Entypo name="check" size={20} color="white" />
              </View>
            </Pressable>
          );
        })
      ) : (
        <View style={styles.noplansContainer}>
          <Text style={styles.noplansContainerText}>
            No plans created. {`Click "Create New Plan"`}
          </Text>
        </View>
      )}
      {create && (
        <View style={styles.titlesContainer}>
          <Text style={styles.titlesContainerText}>Pick a plan:</Text>
          {titles.map((t, i) => {
            if (!!user && !!user.type && user.type == t.userType) {
              return (
                <View style={styles.titlesCardContainer} key={i}>
                  <View
                    onTouchEnd={() => onTopicChangeHandler(t)}
                    style={[
                      styles.titlesCard,
                      {
                        borderWidth: t.active ? 2 : 0,
                        width:
                          !!user && !!user.type && user.type == "user"
                            ? "50%"
                            : "70%",
                      },
                    ]}
                  >
                    <Text style={styles.titlesCardText}>{t.name}</Text>
                  </View>
                  {t.active && (
                    <Entypo
                      onPress={() => onTopicSaveChangeHanlder(t)}
                      name="circle-with-plus"
                      style={styles.downloadIcon}
                      color="black"
                    />
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>
      )}
      <View style={styles.plansCreateContainer}>
        <Pressable
          onPress={() => setCreate(!create)}
          android_ripple={{ color: "#e1d5c9" }}
          style={styles.plansCreateButton}
        >
          <Text style={styles.plansCreateButtonText}>
            {create ? "Hide" : "Create new plan"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  plansHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  plansCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ece5de",
    borderRadius: 10,
    padding: 20,
    position: "relative",
    marginVertical: 10,
  },
  plansCardText: {
    fontSize: 16,
  },
  plansCreateContainer: { flexDirection: "column", alignItems: "center" },
  plansCreateButton: {
    marginVertical: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    width: "50%",
    position: "relative",
  },
  plansCreateButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  noplansContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  noplansContainerText: {
    textAlign: "center",
    paddingVertical: 50,
    paddingHorizontal: 10,
    backgroundColor: "#ece5de",
    color: "grey",
    width: 200,
    borderRadius: 100,
  },
  titlesContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  titlesContainerText: {
    fontSize: 16,
  },
  titlesCard: {
    backgroundColor: "#ece5de",
    padding: 15,
    width: "60%",
    marginVertical: 5,
    borderRadius: 10,
  },
  titlesCardText: {
    fontSize: 15,
    textAlign: "center",
  },
  titlesCardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  downloadIcon: {
    marginLeft: 5,
    fontSize: 27,
    color: "black",
  },
  doneCheck: {
    fontSize: 15,
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 10,
  },
  plansCompleted: { fontSize: 12, marginTop: 5, color: "green" },
});
