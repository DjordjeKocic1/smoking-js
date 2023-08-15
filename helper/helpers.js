import { Alert, BackHandler } from "react-native";

export const backButtonHandler = (navigation, path) => {
  const backAction = () => {
    navigation.navigate(path);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
};

export const backButtonHandlerAlert = () => {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.exitApp();
};

export const costOfCigarette = (packCost, cigInPack) => {
  return +packCost / +cigInPack;
};

export const isObjEmpty = (obj) => {
  return JSON.stringify(obj) == "{}";
};
