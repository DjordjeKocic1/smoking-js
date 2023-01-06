import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Loading } from "../components/Loading";
import { UserProfileIcon } from "../components/UserProfileIcon";
import { backButtonHandlerAlert } from "../helper/helpers";
import { selectUser } from "../store/userReducer";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "HOME",
      headerStyle: {
        backgroundColor: "#C39351",
      },
      headerTintColor: "white",
      headerRight: () => {
        return (
          <UserProfileIcon
            onPress={() => navigation.navigate("Profile")}
            user={user}
          />
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {/* <View style={styles.headerCont}>
          <Text style={styles.headerText}>HOME</Text>
        </View> */}
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Savings</Text>
              <Image
                source={require("../assets/images/economy.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Stop It</Text>
              <Image
                source={require("../assets/images/game.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Health Tracker</Text>
              <Image
                source={require("../assets/images/traning.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Achievements</Text>
              <Image
                source={require("../assets/images/ach.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Community</Text>
              <Image
                source={require("../assets/images/community.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerBox}>
              <Text style={styles.innerText}>Advices</Text>
              <Image
                source={require("../assets/images/advice.png")}
                style={{ width: 100, height: 100, aspectRatio: 1 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    justifyContent: "center",
    position: "relative",
  },
  headerCont: {
    backgroundColor: "#C39351",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderColor: "#C39351",
    borderRadius: 10,
  },
  headerText: {
    color: "white",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 20,
    textAlign: "center",
  },
  innerText: {
    fontFamily: "HammersmithOne-Bold",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 10,
  },
  innerContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  innerContainerBox: {
    width: 130,
    height: 130,
    margin: 10,
    borderWidth: 1,
    borderColor: "#0006",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
