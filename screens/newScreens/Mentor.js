import * as WebBrowser from "expo-web-browser";

import {
  Alert,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import {
  createMentor,
  deleteMentor,
  fetchError,
  getMentor,
  selectMentor,
  updateMentor,
} from "../../store/mentorReducer";
import {
  deleteUserMentors,
  selectUser,
  userHealth,
} from "../../store/userReducer";
import { fetchEmailData, selectEmail } from "../../store/emailReducer";
import { paymentModalShow, selectPayment } from "../../store/PaymentReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { EmailModal } from "../../components/EmailModal";
import { Loading } from "../../components/Loading";
import { Payment } from "../../components/Payment";

WebBrowser.maybeCompleteAuthSession();

export const Mentor = ({ navigation }) => {
  const dispatch = useDispatch();
  const { mentor, isMentorLoading } = useSelector(selectMentor);
  const { isPaymentModalVisible } = useSelector(selectPayment);
  const { user, isLoading } = useSelector(selectUser);
  const { isEmailModalVisible } = useSelector(selectEmail);
  const [mentorEmailValue, setMentorEmailValue] = useState("");
  const [mentorNameValue, setMentorNameValue] = useState("");
  const [mentorInvForm, setMentorInvForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getMentor(user._id));
  }, [dispatch, user._id]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getMentor(user._id));
      dispatch(userHealth({}, user._id));
    }, 2000);
  };

  const mentorInputEmailChangeHandler = (e) => {
    setMentorEmailValue(e);
  };

  const mentorInputNameChangeHandler = (e) => {
    setMentorNameValue(e);
  };

  const acceptMentorHandler = (userValue) => {
    Alert.alert(
      "Mentor Request",
      `${userValue.email} invited you to become his/her mentor.`,
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
              name: mentor.name,
              user: {
                userId: userValue.userId,
                accepted: true,
                name: userValue.name,
              },
            };

            dispatch(updateMentor(dataToSend, mentor._id));
          },
        },
      ]
    );
  };

  const mentorViewHandler = (userValue, mentor) => {
    Alert.alert("Mentor", `Are you sure you want to mentor a user?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.replace("MentorViewScreen", {
            user_idParam: userValue.userId,
            mentorParam: mentor,
          });
        },
      },
    ]);
  };

  const deleteMentorHandler = (mentorId, userId) => {
    Alert.alert("", `Are you sure?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteMentor(mentorId, userId));
        },
      },
    ]);
  };

  const deleteUserMentorHandler = (mentorId, userId) => {
    Alert.alert("", `Are you sure?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteUserMentors(mentorId, userId));
        },
      },
    ]);
  };

  const createMentorHandler = () => {
    if (mentorEmailValue == "" && mentorNameValue == "") {
      return;
    }
    const dataToSend = {
      name: mentorNameValue.trim(),
      email: mentorEmailValue.trim(),
      user: {
        email: user.email,
        _id: user._id,
      },
    };
    dispatch(
      fetchEmailData({ name: dataToSend.name, email: dataToSend.email })
    );
    setMentorEmailValue("");
    setMentorNameValue("");

    dispatch(createMentor(dataToSend));

    setTimeout(() => {
      dispatch(fetchError(null));
    }, 5000);
  };

  const askForHelpHanlder = () => {
    if (!!user && !!user.subscriber) {
      setMentorInvForm(true);
      return;
    }
    dispatch(paymentModalShow(true));
  };

  if (isMentorLoading && isLoading) {
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
            mentor. Primary{" "}
            <Text
              style={{
                fontSize: Dimensions.get("screen").width > 600 ? 25 : 18,
              }}
            >
              {"'MENTORING'"}
            </Text>{" "}
            is there so that someone close to you can help you achieve your
            goals by assigning tasks and monitoring your progress.
          </Text>
        </View>
      </View>
      {mentorInvForm && (
        <View style={styles.mentorInvContainer}>
          <View style={[styles.mentorInvInnerContainer]}>
            <Pressable
              onPress={() => setMentorInvForm(false)}
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
            <Pressable
              onPress={createMentorHandler}
              style={[styles.pressableContainer]}
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
        {!!mentor && !!mentor.mentoringUser && !!mentor.mentoringUser.length ? (
          mentor.mentoringUser.map((v) => {
            return (
              <View
                key={v._id}
                style={[styles.mentorView, { marginBottom: 5 }]}
              >
                <View>
                  <Text style={styles.mentorViewText}>{v.name}</Text>
                  <Text
                    style={[
                      styles.mentorViewText,
                      {
                        textTransform: "lowercase",
                        fontSize:
                          Dimensions.get("screen").width > 600 ? 15 : 10,
                        color: "gray",
                      },
                    ]}
                  >
                    {v.email}
                  </Text>
                </View>
                <View>
                  <Text style={styles.statusText}>
                    Status:{" "}
                    <Text
                      style={{
                        color: v.accepted ? "green" : "gray",
                      }}
                    >
                      {v.accepted ? "Active" : "Pending"}
                    </Text>
                  </Text>
                  {!v.accepted ? (
                    <Pressable
                      style={styles.acceptedContainer}
                      android_ripple={{ color: "#0aec0a" }}
                      onPress={() => acceptMentorHandler(v)}
                    >
                      <Text style={styles.accepted}>Accept</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => mentorViewHandler(v, mentor)}
                      android_ripple={{ color: "#c39351" }}
                      style={styles.mentorViewUser}
                    >
                      <Text style={styles.mentorViewUserText}>Go Mentor</Text>
                    </Pressable>
                  )}
                </View>
                <View>
                  <Pressable
                    onPress={() =>
                      deleteMentorHandler(mentor.mentorId, v.userId)
                    }
                    style={styles.mentorViewPressable}
                  >
                    <AntDesign name="close" size={15} color="white" />
                  </Pressable>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.mentoringInfo}>
            Your are not mentoring anyone
          </Text>
        )}
      </View>
      {!!user && user.type != "mentor" && (
        <View style={styles.mentoring}>
          <Text style={styles.mentoringHeader}>Mentor(s)</Text>
          {!!user && !!user.mentors && !!user.mentors.length ? (
            user.mentors.map((v) => {
              return (
                <View
                  key={v._id}
                  style={[styles.mentorView, { marginBottom: 5 }]}
                >
                  <View>
                    <Text style={styles.mentorViewText}>{v.name}</Text>
                    <Text
                      style={[
                        styles.mentorViewText,
                        {
                          textTransform: "lowercase",
                          fontSize:
                            Dimensions.get("screen").width > 600 ? 15 : 10,
                          color: "gray",
                        },
                      ]}
                    >
                      {v.email}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.statusText}>
                      Status:{" "}
                      <Text
                        style={{
                          color: v.accepted ? "green" : "gray",
                        }}
                      >
                        {v.accepted ? "Active" : "Pending"}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Pressable
                      onPress={() =>
                        deleteUserMentorHandler(v.mentorId, user._id)
                      }
                      style={styles.mentorViewPressable}
                    >
                      <AntDesign name="close" size={15} color="white" />
                    </Pressable>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.mentoringInfo}>You dont have a mentor</Text>
          )}
          <Pressable
            android_ripple={{ color: "#6A7152" }}
            onPress={askForHelpHanlder}
            style={styles.pressableContainer}
          >
            <Text style={styles.pressableContainerText}>Ask for help</Text>
          </Pressable>
          {!!user && !!user.subscribeLasts && user.subscriber && (
            <Text
              style={{
                fontStyle: "italic",
                marginTop: 10,
                fontFamily: "HammersmithOne-Bold",
                fontSize: 10,
              }}
            >
              <AntDesign name="star" size={12} color="#c39351" /> Subscription
              lasts for another {user.subscribeLasts} day(s)
              <AntDesign name="star" size={12} color="#c39351" />
            </Text>
          )}
        </View>
      )}
      {isPaymentModalVisible && <Payment />}
      {isEmailModalVisible && <EmailModal />}
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
    position: "relative",
  },
  mentorViewText: {
    color: "black",
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 15 : 10,
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
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 15,
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
    fontSize: Dimensions.get("screen").width > 600 ? 15 : 12,
  },
  acceptedContainer: {
    backgroundColor: "green",
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
  },
  accepted: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 15 : 12,
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
    fontSize: Dimensions.get("screen").width > 600 ? 18 : 15,
  },
});
