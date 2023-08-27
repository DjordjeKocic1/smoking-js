import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, updateUser } from "../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

import { BackButton } from "../../components/BackButton";

export const Slow = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSaveHandler = () => {
    Alert.alert(
      "Are you sure?",
      "if you accept this, all your progress(the time you have not smoked , achievements and a money you saved) when you didnt smoke will be removed.",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "I wont",
          onPress: () => {
            const dataToSend = {
              smokingInfo: {
                dateOfQuiting: new Date().toDateString(),
                isQuiting: false,
                noSmokingDays: 0,
              },
              healthInfo: {
                ...user.healthInfo,
                avgHealth: 0,
              },
            };

            dispatch(updateUser(dataToSend, user._id));
            navigation.replace("UserScreen");
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsHorizontalScrollIndicator={false}
      endFillColor="#000"
      overScrollMode="never"
    >
      <BackButton navigation={navigation} where={"UserScreen"} />
      <Text
        style={[
          styles.tipsContainerText,
          { fontSize: 20, textAlign: "center" },
        ]}
      >
        Take it Slow!
      </Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          1. Try as long as you are in the application{" "}
          <Text style={{ color: "#c39351" }}>NOT</Text> to light a cigar.
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          2. If you smoked every hour, now try on{" "}
          <Text style={{ color: "#c39351" }}>two or three hours.</Text>
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          3. One of the ways to forget about the cigarette is to{" "}
          <Text style={{ color: "#c39351" }}>PLAY</Text> the game and be the
          best on the app.
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          4. After <Text style={{ color: "#c39351" }}>every meal</Text>, I know
          you want to smoke a cigar, but try to resist and do not light it right
          away.
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          5. <Text style={{ color: "#c39351" }}>Set goals</Text> - think about
          reducing your cigarettes each day, each week or fortnight.
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          6. Continue to <Text style={{ color: "#c39351" }}>reduce</Text> the
          number of cigarettes you smoke as you approach your ‘quit date’.
        </Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsContainerText}>
          7. Use{" "}
          <Text style={{ color: "#c39351" }}>
            nicotine replacement therapies
          </Text>{" "}
          in the cutting down phase - these help prevent you compensating for
          fewer cigarettes by taking more and deeper puffs.
        </Text>
      </View>
      <Pressable style={styles.pressableContainer} onPress={onSaveHandler}>
        <Text
          style={[
            styles.tipsContainerText,
            { fontSize: 15, textAlign: "center", color: "white" },
          ]}
        >
          Ok, i will take it slow
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    flexDirection: "column",
    position: "relative",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tipsContainer: {
    justifyContent: "center",
    marginTop: 20,
  },
  tipsContainerText: {
    fontSize: 14,
    fontFamily: "HammersmithOne-Bold",
  },
  pressableContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#222325",
    marginTop: 20,
    borderRadius: 5,
  },
});
