import { Animated, Image, StyleSheet, Text, View } from "react-native";
import {
  deleteNotification,
  selectNotification,
  updateNotification,
} from "../../store/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

import { BackButton } from "../../components/BackButton";
import { Easing } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import { useRef } from "react";

export const Notification = ({ navigation }) => {
  const { notification } = useSelector(selectNotification);
  const isLoading = useSelector((state) => state.notification.isLoading);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.mainContainer}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <Text
        style={{
          marginVertical: 10,
          fontFamily: "HammersmithOne-Bold",
          fontSize: 25,
        }}
      >
        Notifications
      </Text>
      {!!notification && notification.length > 0 ? (
        notification.map((notif) => {
          return (
            <View
              onTouchStart={() => {
                dispatch(
                  deleteNotification(
                    notif.userId,
                    notif.isTask,
                    notif.isMentoring
                  )
                );
                notif.isMentoring
                  ? navigation.replace("Mentor")
                  : navigation.replace("Task");
              }}
              key={notif._id}
              style={[styles.pressebleNotificaiton, { borderColor: "#c39351" }]}
            >
              <View style={styles.pressebleNotificaitonInner}>
                <Text style={styles.pressebleNotificaitonInnerText}>
                  {notif.isMentoring ? "New mentor request" : "New Task!"}
                </Text>
              </View>
              <Feather name="info" size={24} color="black" />
            </View>
          );
        })
      ) : (
        <Text
          style={[
            styles.pressebleNotificaitonInnerText,
            { fontSize: 11, color: "gray" },
          ]}
        >
          No new notifications
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pressebleNotificaiton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  pressebleNotificaitonInner: { flexDirection: "row", alignItems: "center" },
  pressebleNotificaitonInnerImage: {
    width: 60,
    height: 30,
    resizeMode: "cover",
  },
  pressebleNotificaitonInnerText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 14,
  },
});
