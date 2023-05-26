import { Animated, Image, StyleSheet, Text, View } from "react-native";
import {
  deleteNotification,
  selectNotification,
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
  const pulsAnim = useRef(new Animated.Value(3)).current;
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulsAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      {
        iterations: 2,
      }
    ).start();
    return () => {};
  }, [pulsAnim]);

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
            <Animated.View
              onTouchStart={() => {
                console.log(notif._id);
                dispatch(deleteNotification(notif._id));
                notif.isMentoring
                  ? navigation.replace("Mentor")
                  : navigation.replace("Task");
              }}
              key={notif._id}
              style={[
                styles.pressebleNotificaiton,
                { borderWidth: pulsAnim, borderColor: "#c39351" },
              ]}
            >
              <View style={styles.pressebleNotificaitonInner}>
                {notif.isMentoring ? (
                  <Image
                    source={require("../../assets/images/notImg.png")}
                    style={styles.pressebleNotificaitonInnerImage}
                  />
                ) : (
                  <FontAwesome
                    name="cog"
                    size={24}
                    color="#c39351"
                    style={{ marginRight: 20 }}
                  />
                )}
                <Text style={styles.pressebleNotificaitonInnerText}>
                  {notif.isMentoring ? "New mentor request" : "New Task!"}
                </Text>
              </View>
              <Feather name="info" size={24} color="black" />
            </Animated.View>
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
