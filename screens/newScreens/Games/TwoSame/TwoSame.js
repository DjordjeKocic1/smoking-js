import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { selectUser, updateUser } from "../../../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BackButton } from "../../../../components/BackButton";

export const TwoSame = ({ navigation }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    {
      id: 1,
      src: require("../../../../assets/images/twoSameImgs/apple.png"),
      catgorie: "apple",
      active: false,
    },
    {
      id: 2,
      src: require("../../../../assets/images/twoSameImgs/banana.png"),
      catgorie: "banana",
      active: false,
    },
    {
      id: 3,
      src: require("../../../../assets/images/twoSameImgs/painapple.png"),
      catgorie: "painapple",
      active: false,
    },
    {
      id: 4,
      src: require("../../../../assets/images/twoSameImgs/apple.png"),
      catgorie: "apple",
      active: false,
      done: false,
    },
    {
      id: 5,
      src: require("../../../../assets/images/twoSameImgs/banana.png"),
      catgorie: "banana",
      active: false,
      done: false,
    },
    {
      id: 6,
      src: require("../../../../assets/images/twoSameImgs/painapple.png"),
      catgorie: "painapple",
      active: false,
      done: false,
    },
  ]);

  const { user } = useSelector(selectUser);
  const [isVisible, setVisible] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const shuffle = () => {
    setImages(
      images
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  };

  const onImagePressHandler = ({ id }) => {
    let imagesCopy = [...images];
    let imgIndex = images.findIndex((v) => v.id == id);
    imagesCopy[imgIndex].active = true;
    let lengthOfActiveImages = imagesCopy.filter((v) => v.active).length;
    let imageSame = imagesCopy.filter((a) => a.active);
    if (lengthOfActiveImages > 2) {
      return setImages(
        imagesCopy.map((v) => {
          return {
            ...v,
            active: false,
          };
        })
      );
    }
    if (
      imageSame.length > 1 &&
      imageSame[0].catgorie == imageSame[1].catgorie
    ) {
      setVisible(true);
      setTimeout(() => {
        imagesCopy = imagesCopy.filter((v) => {
          if (v.catgorie !== imageSame[0].catgorie) {
            return v;
          }
        });
        setImages(imagesCopy);
        setVisible(false);
      }, 1000);
    }
    setImages(imagesCopy);
  };

  const onImgLoad = () => {
    if (isCollected) return;
    dispatch(
      updateUser(
        {
          gameScore: (!!user && !!user.gameScore ? user.gameScore : 0) + 5,
        },
        user._id
      )
    );
    setIsCollected(true);
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.animatedCont}>
        <Pressable
          onPress={() => navigation.navigate("UserScreen")}
          style={styles.animatedContPressable}
        >
          <Ionicons name="arrow-back-circle-sharp" size={25} color="white" />
        </Pressable>
        <View style={styles.scoreContainer}>
          <FontAwesome name="trophy" size={22} color="gold" />
          <Text
            style={[
              styles.animatedContPressableText,
              { fontSize: 17, marginLeft: 5 },
            ]}
          >
            {!!user && !!user.gameScore ? user.gameScore : 0}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("ScoreScreen")}
          style={styles.animatedContPressable}
        >
          <Text style={[styles.animatedContPressableText]}>
            <Entypo name="area-graph" color="white" /> rank list
          </Text>
        </Pressable>
      </View>
      {isVisible && (
        <View style={styles.doneContainer}>
          <ImageBackground
            source={require("../../../../assets/images/done.png")}
            resizeMode="contain"
          >
            <Text style={styles.doneContainerText}>Nice!</Text>
          </ImageBackground>
        </View>
      )}
      <View style={styles.imageContainer}>
        {images.map((img) => {
          return (
            <Pressable
              key={img.id}
              onPress={() => onImagePressHandler(img)}
              style={styles.imagePressable}
            >
              <View
                style={[
                  styles.imageOverlay,
                  {
                    zIndex: 2,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: img.active ? "transparent" : "#c39351",
                  },
                ]}
              >
                <Text
                  style={{ fontFamily: "HammersmithOne-Bold", color: "white" }}
                >
                  {img.active ? "" : "Click"}
                </Text>
              </View>
              <Image source={img["src"]} style={styles.image} />
            </Pressable>
          );
        })}
      </View>
      {images.length == 0 && (
        <View style={styles.nextLevel}>
          <BackButton navigation={navigation} where={"UserScreen"} />
          <ImageBackground
            source={require("../../../../assets/images/twoSameImgs/nextlvl.png")}
            resizeMode="contain"
            onLoad={onImgLoad}
            style={styles.nextLevelImgBG}
          ></ImageBackground>
          <View style={styles.imageNextContainer}>
            <ImageBackground
              source={require("../../../../assets/images/twoSameImgs/next.png")}
              resizeMode="contain"
              style={styles.nextLevelImgBGNext}
            >
              <Pressable
                style={{ width: "100%", height: "100%" }}
                onPress={() => navigation.navigate("TwoSameLevel2")}
              ></Pressable>
            </ImageBackground>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    position: "relative",
  },
  doneContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "transparent",
    zIndex: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  doneContainerText: {
    fontSize: 30,
    color: "white",
    padding: 50,
    fontFamily: "HammersmithOne-Bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  imagePressable: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    position: "relative",
  },
  imageOverlay: {
    width: 70,
    height: 70,
    position: "absolute",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  nextLevel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#e1d5c9",
  },
  nextLevelImgBG: {
    width: 300,
    height: 200,
  },
  nextLevelImgBGNext: {
    width: 50,
    height: 50,
  },
  imageNextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 300,
  },
  nextLeveltext: {
    fontFamily: "HammersmithOne-Bold",
  },
  animatedContPressable: {
    borderRadius: 5,
    padding: 5,
  },
  animatedCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#c39351",
  },
  animatedContPressableText: {
    fontFamily: "HammersmithOne-Bold",
    borderRadius: 5,
    color: "white",
    fontSize: 15,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
