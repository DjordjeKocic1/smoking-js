import { Text, View } from "react-native";
import { getUsers, selectUser } from "../../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../../../components/BackButton";
import { Loading } from "../../../components/Loading";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { backButtonHandler } from "../../../helper/helpers";

export const ScoreScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getUsers());
    }, 2000);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    backButtonHandler(navigation, "UserScreen");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BackButton navigation={navigation} where={"UserScreen"} />
      <Text style={styles.rankText}>Rank List</Text>
      {!!users &&
        users.map((v, i) => {
          return (
            <View key={i} style={styles.userCont}>
              <Text
                style={[
                  styles.userName,
                  { backgroundColor: i == 0 ? "#91d491" : "#e1d5c9" },
                ]}
              >
                {i + 1}. {v.name}
              </Text>
              <Text
                style={[
                  styles.gameScore,
                  { backgroundColor: i == 0 ? "#91d491" : "#e1d5c9" },
                ]}
              >
                {!!v.gameScore ? v.gameScore : 0}
              </Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#e1d5c9",
  },
  rankText: {
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
    marginVertical: 20,
  },
  userCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  userName: {
    borderWidth: 0.3,
    width: "80%",
    padding: 10,
    fontFamily: "HammersmithOne-Bold",
  },
  gameScore: {
    borderWidth: 0.3,
    width: "20%",
    textAlign: "center",
    padding: 10,
    fontFamily: "HammersmithOne-Bold",
  },
});
