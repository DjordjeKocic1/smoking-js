import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getCategories, selectCategories } from "../../store/categorieReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { selectUser } from "../../store/userReducer";

export const Categories = () => {
  const { user, isLoading } = useSelector(selectUser);
  const { categories } = useSelector(selectCategories);
  const [selectedCats, setSelectedCats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(selectedCats);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <Text style={styles.lifeStyleText}>Your lifestyle categories</Text>
      <View style={[styles.lifeStyle, { marginBottom: 50 }]}>
        {!!user && !!user.categories ? (
          user.categories.map((v) => {
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
                />
                <Text style={[styles.lifeStyleBoxText, { color: "white" }]}>
                  {v.name}
                </Text>
              </View>
            );
          })
        ) : (
          <Text>You didn't select any lifestyle categorie</Text>
        )}
      </View>
      <Text style={styles.lifeStyleText}>Unselected categories</Text>
      <View style={styles.lifeStyle}>
        {!!categories &&
          categories.map((v) => {
            return (
              <View style={styles.lifeStyleBox} key={v._id}>
                <Text style={styles.lifeStyleBoxText}>{v.name}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
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
});
