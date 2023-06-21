import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createMentor,
  deleteMentor,
  fetchError,
  getMentor,
  selectMentor,
  updateMentor,
} from "../../store/mentorReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { selectError } from "../../store/errorReducer";
import { selectUser } from "../../store/userReducer";

export const Mentor = ({ navigation }) => {
  const dispatch = useDispatch();
  const { mentor } = useSelector(selectMentor);
  const { user } = useSelector(selectUser);
  const { msg } = useSelector(selectError);
  const isLoading = useSelector((state) => state.mentor.isLoading);

  const [mentorEmailValue, setMentorEmailValue] = useState("");
  const [mentorNameValue, setMentorNameValue] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getMentor(user._id));
    }, 2000);
  };

  const mentorInputEmailChangeHandler = (e) => {
    setMentorEmailValue(e);
  };

  const mentorInputNameChangeHandler = (e) => {
    setMentorNameValue(e);
  };

  const acceptMentorHandler = () => {
    Alert.alert(
      "Mentor Request",
      `${mentor.mentoringUser[0].email} invited you to become his/her mentor.`,
      [
        {
          text: "Decline",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            const dataToSend = {
              accepted: true,
            };

            dispatch(updateMentor(dataToSend, mentor._id));
          },
        },
      ]
    );
  };

  const mentorViewHandler = () => {
    Alert.alert("Mentor", `Are you sure you want to mentor a user?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.replace("MentorViewScreen");
        },
      },
    ]);
  };

  const deleteMentorHandler = () => {
    Alert.alert("Mentor", `Remove mentor?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteMentor(mentor._id));
        },
      },
    ]);
  };

  const createMentorHandler = () => {
    const dataToSend = {
      name: mentorNameValue,
      email: mentorEmailValue,
      user: {
        email: user.email,
        _id: user._id,
      },
    };
    setMentorEmailValue("");
    setMentorNameValue("");
    dispatch(createMentor(dataToSend));

    setTimeout(() => {
      dispatch(fetchError(null));
    }, 5000);
  };

  useEffect(() => {
    if (mentorEmailValue != "" && mentorNameValue != "") setIsValid(true);
    else setIsValid(false);

    return () => {};
  }, [mentorEmailValue, mentorNameValue]);

  useEffect(() => {
    dispatch(getMentor(user._id));
    return () => {};
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.infoText}>
        <View
          style={[
            styles.infoInner,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Entypo
            name="info-with-circle"
            size={150}
            color="#c39351"
            style={{
              position: "absolute",
              opacity: 0.15,
            }}
          />
          <Text style={styles.infoTextInner}>
            Mentorship is the influence, guidance, or direction given by a
            mentor. Primary <Text style={{ fontSize: 18 }}>"MENTORING"</Text> is
            there so that someone close to you can help you achieve your goals
            by assigning tasks and monitoring your progress.
          </Text>
        </View>
      </View>
      {isModal && (
        <View style={styles.mentorInvContainer}>
          <View style={[styles.mentorInvInnerContainer]}>
            <Pressable
              onPress={() => setIsModal(false)}
              style={styles.mentorInvCloseBtn}
              android_ripple={{ color: "#c39351" }}
            >
              <FontAwesome name="window-close" size={24} color="black" />
            </Pressable>
            <Text style={styles.mentorInvQuestion}>
              Fill in the mentor info
            </Text>
            <TextInput
              style={styles.mentorInvInput}
              value={mentorNameValue}
              onChangeText={mentorInputNameChangeHandler}
              placeholder="Enter mentor nickname"
            />
            <TextInput
              inputMode="email"
              keyboardType="email-address"
              style={styles.mentorInvInput}
              value={mentorEmailValue}
              onChangeText={mentorInputEmailChangeHandler}
              placeholder="Enter mentor email"
            />
            {/* {!!msg && (
              <Text
                style={{
                  color: "red",
                  fontFamily: "HammersmithOne-Bold",
                  fontSize: 12,
                  marginTop: 8,
                }}
              >
                <AntDesign name="warning" size={12} color="red" /> {errors}
              </Text>
            )} */}
            <Pressable
              disabled={!isValid}
              onPress={createMentorHandler}
              style={[
                styles.pressableContainer,
                { opacity: !isValid ? 0.3 : 1 },
              ]}
              android_ripple={{ color: "#6A7152" }}
            >
              <Text style={[styles.pressableContainerText, { fontSize: 15 }]}>
                Send Request
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      <BackButton navigation={navigation} where={"UserScreen"} />
      <View style={[styles.mentoring, { marginTop: 40 }]}>
        <Text style={styles.mentoringHeader}>Mentoring</Text>
        {!!mentor && mentor.email == user.email ? (
          <View style={[styles.mentorView]}>
            <View>
              <Text style={styles.mentorViewText}>
                {!!mentor.mentoringUser && mentor.mentoringUser[0].name}
              </Text>
              <Text
                style={[
                  styles.mentorViewText,
                  { textTransform: "lowercase", fontSize: 10, color: "gray" },
                ]}
              >
                {!!mentor.mentoringUser && mentor.mentoringUser[0].email}
              </Text>
            </View>
            <View>
              <Text style={styles.statusText}>
                Status:{" "}
                <Text
                  style={{
                    color: !!mentor && mentor.accepted ? "green" : "gray",
                  }}
                >
                  {!!mentor && mentor.accepted ? "Active" : "Pending"}
                </Text>
              </Text>

              {!!mentor && !mentor.accepted ? (
                <Pressable
                  style={styles.acceptedContainer}
                  android_ripple={{ color: "#0aec0a" }}
                  onPress={acceptMentorHandler}
                >
                  <Text style={styles.accepted}>Accept</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={mentorViewHandler}
                  android_ripple={{ color: "#c39351" }}
                  style={styles.mentorViewUser}
                >
                  <Text style={styles.mentorViewUserText}>Go Mentor</Text>
                </Pressable>
              )}
            </View>
            <View>
              <Pressable
                onPress={deleteMentorHandler}
                style={styles.mentorViewPressable}
              >
                <AntDesign name="close" size={15} color="white" />
              </Pressable>
            </View>
          </View>
        ) : (
          <Text style={styles.mentoringInfo}>
            Your are not mentoring anyone
          </Text>
        )}
      </View>
      <View style={styles.mentoring}>
        <Text style={styles.mentoringHeader}>Mentor</Text>
        {!!mentor && mentor.mentoringUser[0].email == user.email ? (
          <View style={[styles.mentorView]}>
            <View>
              <Text style={styles.mentorViewText}>{mentor.name}</Text>
              <Text
                style={[
                  styles.mentorViewText,
                  { textTransform: "lowercase", fontSize: 10, color: "gray" },
                ]}
              >
                {mentor.email}
              </Text>
            </View>
            <View>
              <Text style={styles.statusText}>
                Status:{" "}
                <Text
                  style={{
                    color: !!mentor && mentor.accepted ? "green" : "gray",
                  }}
                >
                  {!!mentor && mentor.accepted ? "Active" : "Pending"}
                </Text>
              </Text>
            </View>
            <View>
              <Pressable
                onPress={deleteMentorHandler}
                style={styles.mentorViewPressable}
              >
                <AntDesign name="close" size={15} color="white" />
              </Pressable>
            </View>
          </View>
        ) : (
          <Text style={styles.mentoringInfo}>You dont have a mentor</Text>
        )}
        {!mentor && (
          <Pressable
            android_ripple={{ color: "#6A7152" }}
            onPress={() => setIsModal(true)}
            style={styles.pressableContainer}
          >
            <Text style={styles.pressableContainerText}>Ask for help</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mentorView: {
    borderWidth: 1,
    borderColor: "#c39351",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mentorViewText: {
    color: "black",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  mentorViewPressable: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  mentorViewPressableText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
  },
  mentoring: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mentoringHeader: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
  },
  mentoringInfo: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
    marginTop: 1,
    color: "gray",
  },
  pressableContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#222325",
    marginTop: 15,
    borderRadius: 5,
  },
  pressableContainerText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 18,
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    position: "relative",
    paddingTop: 80,
  },
  mentorInvContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999999999,
  },
  errorContainer: {
    position: "absolute",
    borderRadius: 10,
    width: 300,
    height: 50,
    bottom: 0,
    backgroundColor: "#c39351",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  mentorInvInnerContainer: {
    borderRadius: 10,
    height: 200,
    width: 300,
    top: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  mentorInvCloseBtn: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  mentorInvQuestion: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
  mentorInvInput: {
    borderBottomWidth: 0.4,
    height: 40,
    width: 200,
    marginTop: 0,
    fontFamily: "HammersmithOne-Bold",
  },
  infoText: { alignItems: "center" },
  infoInner: {
    width: "90%",
    position: "relative",
  },
  infoTextInner: {
    fontFamily: "HammersmithOne-Bold",
    padding: 10,
    textAlign: "center",
  },
  taskPressable: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#222325",
  },
  taskPressableText: { color: "white", fontFamily: "HammersmithOne-Bold" },
  statusText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
  },
  acceptedContainer: {
    backgroundColor: "green",
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
  },
  accepted: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  mentorViewUser: {
    borderRadius: 5,
    backgroundColor: "gray",
    padding: 5,
    marginTop: 5,
  },
  mentorViewUserText: {
    fontFamily: "HammersmithOne-Bold",
    color: "white",
    textAlign: "center",
  },
});
