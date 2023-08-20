import {
  Alert,
  Animated,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createTask, getTasks, selectTask } from "../store/taskReducer";
import { getMentor, selectMentor } from "../store/mentorReducer";
import { selectUser, userHealthMentore } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../components/Loading";

export const MentorViewScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { mentor } = useSelector(selectMentor);
  const { mentorUser, isLoading } = useSelector(selectUser);
  const { task } = useSelector(selectTask);
  const isLoadingTask = useSelector((state) => state.task.isLoading);
  const [taskValue, setTaskValue] = useState("");
  const [taskCommentValue, setTaskCommentValue] = useState("");
  const [taskPopupShow, setTaskPopupShow] = useState(false);
  const popUpAnim = useRef(new Animated.Value(0)).current;
  const cogAnim = new Animated.Value(0);

  const [refreshing, setRefreshing] = useState(false);

  const { user_idParam, mentorParam } = route.params;

  useEffect(() => {
    dispatch(userHealthMentore({}, user_idParam));
  }, [dispatch, user_idParam]);

  useEffect(() => {
    dispatch(getTasks(user_idParam));
  }, [dispatch, user_idParam]);

  useEffect(() => {
    dispatch(getMentor(mentorParam.mentorId));
  }, [dispatch, mentorParam.mentorId]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(userHealthMentore({}, user_idParam));
      dispatch(getTasks(user_idParam));
    }, 2000);
  };

  const onCogClickHanlder = () => {
    Animated.timing(cogAnim, {
      toValue: 4,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!!finished) {
        Animated.timing(cogAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
        dispatch(userHealthMentore({}, user_idParam));
        dispatch(getTasks(user_idParam));
      }
    });
  };

  const exitMentoringHandler = () => {
    Alert.alert("Mentor", `Exit Mentoring?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.navigate("HomeScreen", { screen: "Mentor" });
        },
      },
    ]);
  };

  const onTaskValueChange = (e) => {
    setTaskValue(e);
  };
  const onTaskCommentValueChange = (e) => {
    setTaskCommentValue(e);
  };

  const onPopupShowHandler = () => {
    Animated.timing(popUpAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
    setTaskPopupShow(true);
  };

  const onPopupHideHandler = () => {
    Animated.timing(popUpAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (!!finished) {
        setTaskPopupShow(false);
        setTaskValue("");
        setTaskCommentValue("");
      }
    });
  };

  const onAssignTaskHandler = () => {
    let dataToSend = {
      toDo: taskValue.trim(),
      comment: taskCommentValue.trim(),
      userId: mentorUser._id,
      mentorId: mentor.mentorId,
    };
    dispatch(createTask(dataToSend));
    setTaskPopupShow(false);
    setTaskValue("");
    setTaskCommentValue("");
  };

  const spin = cogAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "180deg", "-180deg", "180deg", "0deg"],
  });

  const userHealthAndExpenses = [
    {
      name: "No Smoking Days",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.smokingInfo &&
        mentorUser.smokingInfo.noSmokingDays,
      prefix: "",
      info: "",
    },
    {
      name: "Is Quiting?",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.smokingInfo &&
        mentorUser.smokingInfo.isQuiting
          ? "YES"
          : "NO",
      prefix: "",
      info: "",
    },
    {
      name: "Lunge Capacity",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.lungCapacity,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.lungCapacity < 20
          ? "low"
          : "healing...",
    },
    {
      name: "Blood Pressure",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.bloodPressure,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.bloodPressure < 20
          ? "low"
          : "healing...",
    },
    {
      name: "Heart Rhythm",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.heartRhythm,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.heartRhythm < 20
          ? "low"
          : "healing...",
    },
    {
      name: "Phisical Strength",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.physicalAndBodilyStrength,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.physicalAndBodilyStrength < 20
          ? "low"
          : "healing...",
    },
    {
      name: "Stress Tolerance",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.stressTolerance,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.stressTolerance < 20
          ? "low"
          : "healing...",
    },
    {
      name: "Irritating Cough",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.irritatingCough,
      prefix: "%",
      info:
        !!mentorUser &&
        !!mentorUser.healthInfo &&
        mentorUser.healthInfo.irritatingCough < 20
          ? "low"
          : "healing...",
    },
  ];

  const cigInfo = [
    {
      name: "Cigarette Avoided",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.consumptionInfo &&
        mentorUser.consumptionInfo.cigarettesAvoided,
      prefix: "",
    },
    {
      name: "Cigarette in a Pack",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.consumptionInfo &&
        mentorUser.consumptionInfo.cigarettesInPack,
      prefix: "",
    },
    {
      name: "Cigarette Daily Cost",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.consumptionInfo &&
        mentorUser.consumptionInfo.cigarettesDailyCost,
      prefix: "$",
    },
    {
      name: "Pack of Cigarette Cost",
      dinamicInfo:
        !!mentorUser &&
        !!mentorUser.consumptionInfo &&
        mentorUser.consumptionInfo.packCigarettesPrice,
      prefix: "$",
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Animated.View
        onTouchEnd={onCogClickHanlder}
        style={[styles.cogs, { transform: [{ rotate: spin }] }]}
      >
        <FontAwesome name="refresh" size={50} color="black" />
      </Animated.View>
      <FontAwesome5
        name="screwdriver"
        size={50}
        color="black"
        style={styles.screw}
      />
      <Pressable
        onPress={exitMentoringHandler}
        style={styles.pressebleContainerExit}
      >
        <FontAwesome name="window-close" size={30} color="red" />
      </Pressable>

      <Text style={[styles.text, { marginBottom: 0, fontSize: 30 }]}>
        Mentoring
      </Text>
      <Text
        style={[
          styles.text,
          {
            fontSize: 12,
            color: "gray",
            textTransform: "capitalize",
          },
        ]}
      >
        -{!!mentorUser && mentorUser.name}-
      </Text>
      <View style={styles.basicLikesContainer}>
        <View style={styles.basicInfo}>
          <Text
            style={[
              styles.basicText,
              { textDecorationLine: "underline", fontSize: 16 },
            ]}
          >
            Basic Info
          </Text>
          <Text style={[styles.basicText, { color: "gray" }]}>
            name: {!!mentorUser && mentorUser.name}
          </Text>
          <Text style={[styles.basicText, { color: "gray" }]}>
            e-mail: {!!mentorUser && mentorUser.email}
          </Text>
          <Text style={[styles.basicText, { color: "gray" }]}>
            verified: {!!mentorUser && !!mentorUser.userVerified && "YES"}
          </Text>
          {!!mentorUser &&
            !!mentorUser.smokingInfo &&
            !!mentorUser.smokingInfo.isQuiting && (
              <Text style={[styles.basicText, { color: "gray" }]}>
                Quiting Date: {mentorUser.smokingInfo.dateOfQuiting}
              </Text>
            )}
        </View>
        <View style={styles.likeInfo}>
          <Text
            style={[
              styles.basicText,
              { textDecorationLine: "underline", fontSize: 16 },
            ]}
          >
            Likes
          </Text>
          {!!mentorUser &&
            !!mentorUser.categories &&
            mentorUser.categories.map((cat) => {
              return (
                <Text
                  key={cat._id}
                  style={[styles.basicText, { color: "gray" }]}
                >
                  {cat.name}
                </Text>
              );
            })}
        </View>
      </View>
      <Text
        style={[
          styles.taskContainerHeader,
          { marginBottom: 10, marginTop: 20 },
        ]}
      >
        User health & expenses info
      </Text>
      <View style={styles.boxContainer}>
        {!!userHealthAndExpenses &&
          !!userHealthAndExpenses.length &&
          userHealthAndExpenses.map((userH) => {
            return (
              <View key={userH.name} style={styles.innerboxContainer}>
                <Text style={styles.innerboxContainerText}>{userH.name}</Text>
                <Text style={styles.innerboxContainerText2}>
                  {userH.dinamicInfo}
                  {userH.prefix}
                </Text>
                {userH.info != "" && (
                  <Text style={styles.userhTextInfo}>{userH.info}</Text>
                )}
              </View>
            );
          })}
      </View>
      <LinearGradient
        colors={["#222325", "#c39351"]}
        start={{ x: 1, y: -1 }}
        end={{ x: 0.6, y: 0.1 }}
        style={styles.cigaretteInfoCosts}
      >
        {!!cigInfo &&
          !!cigInfo.length &&
          cigInfo.map((cigI) => {
            return (
              <View key={cigI.name} style={styles.cigaretteInfoCostsInner}>
                <Text style={styles.cigaretteInfoCostsInnerText}>
                  {cigI.name}
                </Text>
                <Text style={styles.cigaretteInfoCostsInnerText}>
                  {cigI.prefix}
                  {cigI.dinamicInfo}
                </Text>
              </View>
            );
          })}
      </LinearGradient>
      <View style={[styles.taskContainer, { width: "100%" }]}>
        <Text style={styles.taskContainerHeader}>Assigned tasks</Text>
        {taskPopupShow && (
          <Animated.View style={[styles.taskPopup, { opacity: popUpAnim }]}>
            <Pressable
              onPress={onPopupHideHandler}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <FontAwesome name="close" size={24} color="black" />
            </Pressable>
            <Text style={{ fontFamily: "HammersmithOne-Bold", color: "black" }}>
              Task
            </Text>
            <TextInput
              placeholder="task title here"
              selectionColor="#c39351"
              onChangeText={onTaskValueChange}
              value={taskValue}
              style={styles.input}
            />
            <TextInput
              placeholder="comment here"
              selectionColor="#c39351"
              multiline={true}
              numberOfLines={10}
              onChangeText={onTaskCommentValueChange}
              value={taskCommentValue}
              style={[
                styles.input,
                {
                  height: 100,
                  textAlignVertical: "top",
                },
              ]}
            />
            <Pressable
              onPress={onAssignTaskHandler}
              disabled={taskValue == "" && taskCommentValue == ""}
              android_ripple={{ color: "black" }}
              style={styles.pressebleContainerAdd}
            >
              <Text
                style={{ fontFamily: "HammersmithOne-Bold", color: "white" }}
              >
                Send
              </Text>
            </Pressable>
          </Animated.View>
        )}
        {isLoadingTask && <Loading />}
        {!!task ? (
          task.map((t) => {
            return (
              <View
                key={t._id}
                style={[
                  styles.taskList,
                  { opacity: t.status == "done" ? 0.3 : 1 },
                ]}
              >
                <View style={{ width: "70%" }}>
                  <Text style={styles.textTitle}>task title:</Text>
                  <Text
                    style={{
                      fontFamily: "HammersmithOne-Bold",
                    }}
                  >
                    {t.toDo}
                  </Text>
                </View>
                {t.status == "done" ? (
                  <Text style={styles.taskCompleted}>completed</Text>
                ) : (
                  <MaterialIcons
                    name="pending-actions"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            );
          })
        ) : (
          <Text style={styles.taskContainerSub}>No Tasks added</Text>
        )}
        <Pressable
          onPress={onPopupShowHandler}
          android_ripple={{ color: "#c39351" }}
          style={styles.pressebleContainer}
        >
          <Text style={styles.pressebleContainerText}>Assign Task</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pressebleContainer: {
    backgroundColor: "#222325",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  taskPopup: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width / 1.1,
    paddingVertical: 20,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  input: {
    height: 30,
    width: "80%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "HammersmithOne-Bold",
    padding: 5,
  },
  pressebleContainerAdd: {
    padding: 10,
    backgroundColor: "#c39351",
    borderRadius: 5,
    marginTop: 20,
  },
  pressebleContainerText: { color: "white", fontFamily: "HammersmithOne-Bold" },
  taskContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  taskContainerHeader: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  taskContainerSub: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 10,
    color: "gray",
    marginTop: 5,
  },
  mainContainer: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#e1d5c9",
  },
  text: {
    fontFamily: "HammersmithOne-Bold",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  innerboxContainer: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#c39351",
    borderRadius: 30,
    width: Dimensions.get("screen").width > 600 ? 200 : 130,
    height: Dimensions.get("screen").width > 600 ? 180 : 100,
    overflow: "hidden",
  },
  innerboxContainerText: {
    fontSize: Dimensions.get("screen").width > 600 ? 18 : 12,
    fontFamily: "HammersmithOne-Bold",
    marginBottom: 15,
    color: "black",
    textAlign: "center",
  },
  innerboxContainerText2: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 25 : 20,
    color: "black",
  },
  taskList: {
    borderColor: "#c39351",
    backgroundColor: "white",
    borderWidth: 1,
    width: "80%",
    margin: 5,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressebleContainerExit: { position: "absolute", right: 30, top: 50 },
  cogs: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: -1,
    opacity: 0.2,
  },
  screw: {
    position: "absolute",
    left: 0,
    bottom: 10,
    zIndex: -1,
    opacity: 0.2,
  },
  basicInfo: {
    padding: 10,
    marginTop: 10,
    borderWidth: 0.2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  likeInfo: {
    padding: 10,
    marginTop: 10,
    borderWidth: 0.2,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  basicText: {
    fontFamily: "HammersmithOne-Bold",
  },
  textTitle: { fontFamily: "HammersmithOne-Bold", fontSize: 10 },
  taskCompleted: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 10,
    color: "green",
  },
  basicLikesContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cigaretteInfoCosts: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: Dimensions.get("screen").width / 1.1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  cigaretteInfoCostsInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cigaretteInfoCostsInnerText: {
    fontFamily: "HammersmithOne-Bold",
    color: "white",
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 15,
  },
  userhTextInfo: {
    fontFamily: "HammersmithOne-Bold",
    marginTop: 10,
    fontSize: Dimensions.get("screen").width > 600 ? 15 : 12,
  },
});
