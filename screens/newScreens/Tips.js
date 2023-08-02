import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BackButton } from "../../components/BackButton";
import { backButtonHandlerAlert } from "../../helper/helpers";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

export const Tips = ({ navigation }) => {
  useEffect(() => {
    backButtonHandlerAlert("Hold on!", "Are you sure you want to exit app?");
    return () => {};
  }, []);

  return (
      <ScrollView
        contentContainerStyle={[styles.mainContainer, { position: "relative" }]}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        overScrollMode="never"
      >
        <BackButton navigation={navigation} where={"UserScreen"} />
        <Text style={styles.tipsHeaderText2}>Tips</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.tipsHeaderText]}>
            1. Prepare before you go 'Cold Turkey'.
          </Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            There’s more to it than just tossing your cigarettes out. Smoking is
            an addiction. The brain is hooked on nicotine. Without it, you’ll go
            through withdrawal. Line up support in advance. Ask your doctor
            about all the methods that will help, such as quit-smoking classes
            and apps, counseling, medication, and hypnosis. You’ll be ready for
            the day you choose to quit.
          </Text>
        </View>
        <View style={{marginTop: 20 }}>
          <Text style={[styles.tipsHeaderText]}>
            2. Try nicotine replacement therapy.
          </Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            Short-acting nicotine replacement therapies — such as nicotine gum,
            lozenges, nasal sprays or inhalers — can help you overcome intense
            cravings. These short-acting therapies are usually safe to use along
            with long-acting nicotine patches or one of the non-nicotine
            stop-smoking drugs.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.tipsHeaderText,{textAlign:'left'}]}>3. Avoid triggers.</Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            Don't set yourself up for a smoking relapse. If you usually smoked
            while you talked on the phone, for instance, keep a pen and paper
            nearby to keep busy with doodling rather than smoking..
          </Text>
        </View>
        <View style={{  marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>4. Delay.</Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            If you feel like you're going to give in to your tobacco craving,
            tell yourself that you must first wait 10 more minutes. Then do
            something to distract yourself during that time. Try going to a
            public smoke-free zone. These simple tricks may be enough to move
            you past your tobacco craving.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>5. Chew on it.</Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            Give your mouth something to do to resist a tobacco craving. Chew on
            sugarless gum or hard candy. Or munch on raw carrots, nuts or
            sunflower seeds — something crunchy and tasty.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>6. Don't have 'just one'.</Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            You might be tempted to have just one cigarette to satisfy a tobacco
            craving. But don't fool yourself into thinking that you can stop
            there. More often than not, having just one leads to one more. And
            you may end up using tobacco again.
          </Text>
        </View>
        <View style={{marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>
            7. Try relaxation techniques.
          </Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            Smoking may have been your way to deal with stress. Fighting back
            against a tobacco craving can itself be stressful. Take the edge off
            stress by trying ways to relax, such as deep breathing, muscle
            relaxation, yoga, visualization, massage or listening to calming
            music.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.tipsHeaderText}>
            8. Remind yourself of the benefits.
          </Text>
          <Text
            style={[styles.tipsHeaderText, { fontSize: 12, marginTop: 10 }]}
          >
            Write down or say out loud why you want to stop smoking and resist
            tobacco cravings. These reasons might include: Feeling
            better,Getting healthier,Saving money
          </Text>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#e1d5c9",
    position: "relative",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: "column",
  },
  tipsHeaderText: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 18,
    textAlign:'left'
  },
  tipsHeaderText2: {
    fontFamily: "HammersmithOne-Bold",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
});
