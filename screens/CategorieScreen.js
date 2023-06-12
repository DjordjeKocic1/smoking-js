import {
  Animated,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCategories, selectCategories } from "../store/categorieReducer";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { SubmitButton } from "../components/SubmitButton";
import { backButtonHandler } from "../helper/helpers";
import { renderIcons } from "../helper/iconsHelper";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CategorieScreen = ({ navigation }) => {
  const [activeNextButton, setActiveNextButton] = useState(false);
  const { categories } = useSelector(selectCategories);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [contents, setContent] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    backButtonHandler(navigation, "Smoke Calculator");
  }, []);

  useEffect(() => {
    !!categories &&
      categories.length > 0 &&
      setContent(
        categories.map((categorie) => {
          return {
            _id: categorie._id,
            name: categorie.name,
            checked: false,
            style: { borderBottomW: 0.5, color: "#222325" },
          };
        })
      );
    return () => {};
  }, [categories]);

  const onSubmitHandler = () => {
    let checkedContents = contents.filter((content) => content.checked);
    let dataToSend = {
      userVerified: true,
      categories: checkedContents,
    };
    dispatch(updateUser(dataToSend, user._id));
    navigation.replace("VerifyScreen");
  };

  const onPressCategorieHandler = (cont) => {
    Animated.spring();

    setContent(
      contents.map((content) => {
        return content.name == cont.name
          ? {
              ...content,
              checked: content.checked ? false : true,
              style: !content.checked
                ? { borderBottomW: 6, color: "#c39351" }
                : { borderBottomW: 0.5, color: "#c39351" },
            }
          : { ...content };
      })
    );

    setActiveNextButton(true);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={[styles.headerText, { fontFamily: "HammersmithOne-Bold" }]}
          >
            Your favorite lifestyle categories?
          </Text>
        </View>
        <View style={[styles.categorieContainer]}>
          {contents.map((content) => {
            return (
              <View
                key={content.name}
                style={[
                  styles.innerContainer,
                  { borderBottomWidth: content.style.borderBottomW },
                ]}
              >
                <Pressable
                  onPress={() => onPressCategorieHandler(content)}
                  style={styles.pressableContent}
                  android_ripple={{ borderless: true }}
                >
                  {renderIcons(content.name)}
                  <Text style={styles.innerText}>{content.name}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HammersmithOne-Bold",
              color: "#c39351",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            You can choose more then one categorie
          </Text>
        </View>
        <View style={{ height: 80 }}>
          {activeNextButton && (
            <SubmitButton onPress={onSubmitHandler}>Next</SubmitButton>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e1d5c9",
  },
  categorieContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  innerContainer: {
    textAlign: "center",
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#222325",
  },
  pressableContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  innerText: {
    color: "#222325",
    fontFamily: "HammersmithOne-Bold",
    fontSize: 13,
    textAlign: "center",
  },
  headerContainer: {
    paddingHorizontal: 5,
  },
  headerText: {
    color: "#222325",
    fontSize: 25,
    paddingVertical: 20,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  text: {
    fontFamily: "HammersmithOne-Bold",
    textAlign: "center",
  },
});

export default CategorieScreen;
