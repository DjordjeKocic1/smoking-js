import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCategories, selectCategories } from "../../store/categorieReducer";
import { selectUser, updateUser, userInfo } from "../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { FontAwesome } from "@expo/vector-icons";

export const Categories = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const { categories } = useSelector(selectCategories);
  const [selectedCats, setSelectedCats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setSelectedCats(
      categories.map((cat) => {
        let userCats = user.categories.find((v) => v.name == cat.name);
        if (userCats) {
          return {
            ...cat,
            have: true,
          };
        } else {
          return {
            ...cat,
            have: false,
          };
        }
      })
    );
  }, [categories, user.categories]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(userInfo(user._id));
      dispatch(getCategories());
    }, 2000);
  };

  const onSelectCategorie = (cat) => {
    let userCats = [...user.categories];
    let dataToSend = {
      categories: [...userCats, cat],
    };
    dispatch(updateUser(dataToSend, user._id));
  };

  const onRemoveUserCategorie = (id) => {
    let userCatsRemoved = user.categories.filter((v) => v._id != id);
    let dataToSend = {
      categories: userCatsRemoved,
    };
    dispatch(updateUser(dataToSend, user._id));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BackButton navigation={navigation} where={"Profile"} />
      <Text style={styles.lifeStyleText}>Your lifestyle categories</Text>
      <View style={[styles.lifeStyle, { marginBottom: 50 }]}>
        {!!user && !!user.categories.length && !!selectedCats.length ? (
          selectedCats.map((v) => {
            if (v.have) {
              return (
                <View
                  style={[
                    styles.lifeStyleBox,
                    { backgroundColor: "#c39351", position: "relative" },
                  ]}
                  key={v._id}
                >
                  <FontAwesome
                    name="remove"
                    size={15}
                    color="white"
                    style={styles.removeIcon}
                    onPress={() => onRemoveUserCategorie(v._id)}
                  />
                  <Text style={[styles.lifeStyleBoxText, { color: "white" }]}>
                    {v.name}
                  </Text>
                </View>
              );
            }
          })
        ) : (
          <Text style={styles.noCategoriesText}>
            {"You didn't select any lifestyle categorie"}
          </Text>
        )}
      </View>
      <Text style={styles.lifeStyleText}>Unselected categories</Text>
      <View style={styles.lifeStyle}>
        {!!selectedCats &&
          !!selectedCats.length &&
          selectedCats.map((v) => {
            if (!v.have) {
              return (
                <Pressable
                  android_ripple={{ color: "#c39351" }}
                  onPress={() => onSelectCategorie(v)}
                  style={styles.lifeStyleBox}
                  key={v._id}
                >
                  <Text style={styles.lifeStyleBoxText}>{v.name}</Text>
                </Pressable>
              );
            }
          })}
      </View>
      <Pressable
        android_ripple={{ color: "#c39351" }}
        style={styles.navigatePressable}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.navigatePressableText}>
          Ok <FontAwesome name="chevron-right" color="white" />
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    alignItems: "center",
    paddingTop: 80,
  },
  lifeStyleText: {
    fontSize: 20,
    fontFamily: "HammersmithOne-Bold",
    marginVertical: 10,
    textAlign: "center",
  },
  lifeStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  lifeStyleBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  lifeStyleBoxText: {
    fontSize: 16,
    fontFamily: "HammersmithOne-Bold",
  },
  removeIcon: {
    backgroundColor: "red",
    position: "absolute",
    right: -7,
    top: -7,
    padding: 2,
    borderRadius: 5,
  },
  noCategoriesText: {
    fontSize: 12,
    fontFamily: "HammersmithOne-Bold",
    color: "gray",
  },
  navigatePressable: {
    backgroundColor: "#222325",
    padding: 10,
    borderRadius: 3,
    marginTop: 20,
  },
  navigatePressableText: {
    fontSize: 18,
    fontFamily: "HammersmithOne-Bold",
    color: "white",
  },
});
