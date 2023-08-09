import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import {
  deleteTask,
  getTasks,
  selectTask,
  updateTask,
} from "../../store/taskReducer";
import { useDispatch, useSelector } from "react-redux";

import { BackButton } from "../../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { selectUser } from "../../store/userReducer";
import { useEffect } from "react";

export const Task = ({ navigation }) => {
  const dispatch = useDispatch();
  const { task } = useSelector(selectTask);
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.task.isLoading);
  useEffect(() => {
    dispatch(getTasks(user._id));
  }, [dispatch]);

  const onTaskStatusHandler = (status, id, userId) => {
    console.log(status);
    Alert.alert(
      "Task",
      `Are you sure ${
        status == "accept"
          ? "you wont to accept task?"
          : status == "done" && "you completed the task?"
      }`,
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
    <View style={styles.mainContainer}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <Text style={styles.text}>Tasks</Text>
      <View style={styles.taskContainer}>
        {!!task && !!task.length ? (
          task
            .map((t) => {
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
                      style={[
                        styles.taskText,
                        { marginBottom: 5, fontSize: 10 },
                      ]}
                    >
                      Status:{" "}
                      {t.status == "accept"
                        ? "accepted"
                        : t.status == "done"
                        ? "done"
                        : "pending"}
                    </Text>
                    <Text
                      style={[
                        styles.taskText,
                        { textDecorationLine: "underline", marginBottom: 5 },
                      ]}
                    >
                      {t.toDo}
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
                    <View
                      onTouchStart={() =>
                        onTaskStatusHandler(
                          t.status == "accept"
                            ? "done"
                            : t.status == "" && "accept",
                          t._id
                        )
                      }
                      style={[
                        styles.pressableCont,
                        {
                          backgroundColor: "green",
                        },
                      ]}
                    >
                      <Text style={styles.pressableContText}>
                        {t.status == "accept" ? (
                          "done"
                        ) : t.status == "done" ? (
                          <Ionicons
                            name="checkmark-done-outline"
                            size={24}
                            color="black"
                          />
                        ) : (
                          t.status == "" && "accept"
                        )}
                      </Text>
                    </View>
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
            .sort((d) => d.status == "done")
        ) : (
          <Text style={[styles.text, { fontSize: 14, color: "gray" }]}>
            No tasks assigned
          </Text>
        )}
      </View>
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
