import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  deleteTask,
  fetchTaskSuccess,
  getTasks,
  selectTask,
  updateTask,
} from "../../store/taskReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { Loading } from "../../components/Loading";
import openSocket from "socket.io-client";
import { selectUser } from "../../store/userReducer";

export const Task = ({ navigation }) => {
  const dispatch = useDispatch();
  const { task, isLoading } = useSelector(selectTask);
  const { user } = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);
  const taskCompleted =
    !!task && !!task.length && task.filter((v) => v.status === "done");
  const taskNotFin =
    !!task && !!task.length && task.filter((v) => v.status !== "done");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getTasks(user._id));
    }, 2000);
  };

  useEffect(() => {
    dispatch(getTasks(user._id));
  }, [dispatch, user._id]);

  useEffect(() => {
    const socket = openSocket("https://istop.site");
    socket.on("live", (data) => {
      const { action, task, ID } = data;
      if (action === "create" && user && user._id === ID) {
        !!task && dispatch(fetchTaskSuccess(task));
      }
    });
  }, [dispatch, user]);

  const onTaskStatusHandler = (status, id) => {
    Alert.alert(
      "Task",
      `Are you sure ${status === "accept" && "you wont to accept task?"}`,
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(updateTask({ status }, id));
          },
        },
      ]
    );
  };

  const onTaskDeleteStatusHandler = (id) => {
    Alert.alert("Task", `Are you sure you want to cancel the task?`, [
      {
        text: "No",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteTask(id));
        },
      },
    ]);
  };

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
      <BackButton navigation={navigation} where={"Profile"} />
      <Text style={styles.text}>Tasks</Text>
      <View style={styles.taskContainer}>
        {!!taskNotFin && !!taskNotFin.length ? (
          taskNotFin.map((t) => {
            return (
              <View
                style={[
                  styles.taskContainerInner,
                  {
                    opacity: t.status == "done" ? 0.3 : 1,
                  },
                ]}
                key={t._id}
              >
                <View>
                  <Text
                    style={[styles.taskText, { marginBottom: 5, fontSize: 10 }]}
                  >
                    Status:{" "}
                    {t.status == "accept"
                      ? "accepted"
                      : t.status == "done"
                      ? "done"
                      : "pending"}
                  </Text>
                  <Text style={[styles.taskText, { fontSize: 12 }]}>
                    {t.comment}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {t.status == "" && (
                    <View
                      onTouchStart={() =>
                        onTaskStatusHandler(t.status == "" && "accept", t._id)
                      }
                      style={[
                        styles.pressableCont,
                        {
                          backgroundColor: "green",
                        },
                      ]}
                    >
                      <Text style={styles.pressableContText}>accept</Text>
                    </View>
                  )}

                  {t.status != "done" && (
                    <View
                      onTouchStart={() => onTaskDeleteStatusHandler(t._id)}
                      style={[
                        styles.pressableCont,
                        {
                          backgroundColor: "red",
                        },
                      ]}
                    >
                      <Text style={styles.pressableContText}>decline</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <Text style={[styles.text, { fontSize: 14, color: "gray" }]}>
            No tasks assigned
          </Text>
        )}
      </View>
      <Text style={[styles.text, { marginTop: 20 }]}>Completed</Text>
      <View style={styles.taskContainer}>
        {!!taskCompleted && !!taskCompleted.length ? (
          taskCompleted.map((t) => {
            return (
              <View
                style={[
                  styles.taskContainerInner,
                  {
                    opacity: t.status == "done" ? 0.3 : 1,
                  },
                ]}
                key={t._id}
              >
                <View>
                  <Text
                    style={[styles.taskText, { marginBottom: 5, fontSize: 10 }]}
                  >
                    Status:{" "}
                    {t.status == "accept"
                      ? "accepted"
                      : t.status == "done"
                      ? "done"
                      : "pending"}
                  </Text>
                  <Text style={[styles.taskText, { fontSize: 12 }]}>
                    {t.comment}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {t.status == "" && (
                    <View
                      onTouchStart={() =>
                        onTaskStatusHandler(t.status == "" && "accept", t._id)
                      }
                      style={[
                        styles.pressableCont,
                        {
                          backgroundColor: "green",
                        },
                      ]}
                    >
                      <Text style={styles.pressableContText}>accept</Text>
                    </View>
                  )}

                  {t.status != "done" && (
                    <View
                      onTouchStart={() => onTaskDeleteStatusHandler(t._id)}
                      style={[
                        styles.pressableCont,
                        {
                          backgroundColor: "red",
                        },
                      ]}
                    >
                      <Text style={styles.pressableContText}>decline</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <Text style={[styles.text, { fontSize: 14, color: "gray" }]}>
            No completed tasks
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
  },
  taskContainer: {
    alignItems: "center",
  },
  taskContainerInner: {
    width: Dimensions.get("screen").width / 1.1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  taskText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 15,
  },
  pressableCont: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
  },
  pressableContText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
});
