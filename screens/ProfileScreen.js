import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../components/Loading";

export const ProfileScreen = ({ navigation }) => {
  const { user, isLoading } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onUserTypeChangeHandler = (type) => {
    dispatch(updateUser({ type }, user._id));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, position: "relative" }}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={[styles.imageContainer]}>
              <Image
                style={{
                  width: Dimensions.get("screen").width > 600 ? 100 : 50,
                  height: Dimensions.get("screen").width > 600 ? 100 : 50,
                }}
                source={require("../assets/images/user.png")}
              />
            </View>
            <View style={styles.userTypeContainer}>
              <Text
                style={{
                  fontSize: Dimensions.get("screen").width > 600 ? 20 : 12,
                }}
              >
                user type
              </Text>
              <View style={styles.userTypeInner}>
                <Pressable
                  onPress={() => onUserTypeChangeHandler("user")}
                  android_ripple={{ color: "#6A7152" }}
                  style={{
                    marginLeft: 3,
                    marginTop: 10,
                    backgroundColor:
                      !!user && !!user.type && user.type == "user"
                        ? "#222325"
                        : "transparent",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color:
                        !!user && !!user.type && user.type == "user"
                          ? "white"
                          : "black",
                      fontFamily: "HammersmithOne-Bold",
                      fontSize: Dimensions.get("screen").width > 600 ? 20 : 12,
                    }}
                  >
                    user
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onUserTypeChangeHandler("mentor")}
                  android_ripple={{ color: "#6A7152" }}
                  style={{
                    marginLeft: 3,
                    marginTop: 10,
                    backgroundColor:
                      !!user && !!user.type && user.type == "mentor"
                        ? "#222325"
                        : "transparent",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color:
                        !!user && !!user.type && user.type == "mentor"
                          ? "white"
                          : "black",
                      fontFamily: "HammersmithOne-Bold",
                      fontSize: Dimensions.get("screen").width > 600 ? 20 : 12,
                    }}
                  >
                    mentor
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Text style={styles.headerText}>HEALTH DATA</Text>
          <View style={styles.heathData}>
            <View
              onTouchEnd={() => navigation.navigate("Achievements")}
              style={[styles.info, { borderBottomWidth: 0.2 }]}
            >
              <Text style={styles.infoText}>
                <Ionicons
                  name="medal-outline"
                  size={Dimensions.get("screen").width ? 20 : 17}
                  color="black"
                />{" "}
                My achievements
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
            <View
              onTouchEnd={() => navigation.navigate("Plans")}
              style={[styles.info, { borderBottomWidth: 0.2 }]}
            >
              <Text style={styles.infoText}>
                <AntDesign
                  name="book"
                  size={Dimensions.get("screen").width ? 20 : 17}
                  color="black"
                />{" "}
                My plans
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
            <View
              onTouchEnd={() => navigation.navigate("Task")}
              style={[styles.info, { borderBottomWidth: 0.2 }]}
            >
              <Text style={styles.infoText}>
                <FontAwesome
                  name="sticky-note-o"
                  size={Dimensions.get("screen").width ? 20 : 17}
                  color="black"
                />{" "}
                My Tasks
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
            <View
              onTouchEnd={() => navigation.navigate("MyData")}
              style={[styles.info]}
            >
              <Text style={styles.infoText}>
                <AntDesign
                  name="barschart"
                  size={Dimensions.get("screen").width ? 20 : 17}
                  color="black"
                />{" "}
                My Data
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
          </View>
          <Text style={styles.headerText}>OTHER</Text>
          <View style={styles.heathData}>
            <View
              onTouchEnd={() => navigation.navigate("Personal")}
              style={[styles.info, { borderBottomWidth: 0.2 }]}
            >
              <Text style={styles.infoText}>
                <AntDesign
                  name="user"
                  size={Dimensions.get("screen").width > 600 ? 22 : 17}
                  color="black"
                />{" "}
                Personal info
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
            <View
              onTouchEnd={() => navigation.navigate("CategoriesMy")}
              style={[styles.info]}
            >
              <Text style={styles.infoText}>
                <Ionicons name="heart-circle-outline" size={17} color="black" />{" "}
                Favorite categories
              </Text>
              <AntDesign
                name="right"
                size={Dimensions.get("screen").width > 600 ? 20 : 15}
                color="grey"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    paddingHorizontal: 20,
  },
  removeAccContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  removeAcc: {
    padding: 3,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  removeAccText: {
    fontSize: 12,
    fontFamily: "HammersmithOne-Bold",
    color: "grey",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent:
      Dimensions.get("screen").width > 600 ? "flex-start" : "center",
    flex: 1,
    paddingTop: Dimensions.get("screen").width > 600 ? 50 : 0,
  },
  headerContainer: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#ece5de",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    borderRadius: 10,
  },
  headerContainer_text: {
    textAlign: "center",
  },
  imageContainer: {
    borderRadius: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1d5c9",
  },
  input: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#c39351",
    borderRadius: 100,
    color: "white",
    backgroundColor: "#c39351",
    padding: 5,
    fontSize: 15,
  },
  regText: {
    fontSize: 11,
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 5,
  },
  lifestylecategoriesContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  lifestylecategoriesContainerText: {
    fontSize: 16,
    fontFamily: "HammersmithOne-Bold",
  },
  lifestylecategoriesContainerSubText: {
    fontFamily: "HammersmithOne-Bold",
    backgroundColor: "#222325",
    color: "white",
    borderRadius: 5,
    marginLeft: 5,
    padding: Dimensions.get("screen").width > 600 ? 5 : 2,
    fontSize: Dimensions.get("screen").width > 600 ? 17 : 15,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ece5de",
    margin: 5,
    width: "100%",
    padding: 15,
    borderRadius: 5,
    borderColor: "black",
  },
  infoText: {
    fontSize: Dimensions.get("screen").width > 600 ? 22 : 18,
  },
  heathData: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#ece5de",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 2,
  },
  userTypeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userTypeInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginTop: 20,
    fontWeight: "bold",
    fontFamily: "HammersmithOne-Bold",
    fontSize: Dimensions.get("screen").width > 600 ? 20 : 16,
  },
});
