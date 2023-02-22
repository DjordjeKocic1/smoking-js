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

export const QuitNow = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSaveHandler = () => {
    Alert.alert(
      "Are you sure?",
      "If you select this option, new options will open for you.",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "I wont to quit now",
          onPress: () => {
            const dataToSend = {
              smokingInfo: {
                dateOfQuiting: new Date().toDateString(),
                isQuiting: true,
                noSmokingDays: 0,
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
    <View style={styles.mainContainer}>
      <BackButton navigation={navigation} where={"UserScreen"} />
      <ScrollView>
        <Text
          style={[
            styles.tipsContainerText,
            { fontSize: 20, textAlign: "center" },
          ]}
        >
          Quit Now!
        </Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            1. Don't set yourself up for a smoking relapse. If you usually
            smoked while you talked on the phone, for instance,{" "}
            <Text style={{ color: "#c39351" }}>
              keep a pen and paper nearby
            </Text>{" "}
            to keep busy with doodling rather than smoking..
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            2. If you feel like you're going to give in to your tobacco craving,
            tell yourself that you must first{" "}
            <Text style={{ color: "#c39351" }}>wait 10 more minutes</Text>. Then
            do something to distract yourself during that time. Try going to a
            public smoke-free zone. These simple tricks may be enough to move
            you past your tobacco craving.
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            3.{" "}
            <Text style={{ color: "#c39351" }}>Give your mouth something</Text>{" "}
            to do to resist a tobacco craving. Chew on sugarless gum or hard
            candy. Or munch on raw carrots, nuts or sunflower seeds — something
            crunchy and tasty.
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            4. You might be tempted to have just one cigarette to satisfy a
            tobacco craving.{" "}
            <Text style={{ color: "#c39351" }}>But don't fool yourself</Text>{" "}
            into thinking that you can stop there. More often than not, having
            just one leads to one more. And you may end up using tobacco again.
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            5. Smoking may have been your way to deal with stress.{" "}
            <Text style={{ color: "#c39351" }}>Fighting back</Text>
            against a tobacco craving can itself be stressful. Take the edge off
            stress by trying ways to relax, such as deep breathing, muscle
            relaxation, yoga, visualization, massage or listening to calming
            music.
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsContainerText}>
            6. Write down or say out loud why you want to stop smoking and
            resist tobacco cravings. These reasons might include:{" "}
            <Text style={{ color: "#c39351" }}>
              Feeling better,Getting healthier,Saving money
            </Text>
          </Text>
        </View>
        <Pressable style={styles.pressableContainer} onPress={onSaveHandler}>
          <Text
            style={[
              styles.tipsContainerText,
              { fontSize: 15, textAlign: "center", color: "white" },
            ]}
          >
            Ok, i wont to quit!
          </Text>
        </Pressable>
      </ScrollView>
    </View>
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
    marginBottom: 20,
    borderRadius: 5,
  },
});
