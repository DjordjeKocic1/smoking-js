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

export const backButtonHandlerAlert = (alertMsg, alertQuestion) => {
  const backAction = () => {
    Alert.alert(alertMsg, alertQuestion, [
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

export const costOfCigaretteAday = (packCost, cigInPack, cigPerDay) => {
  return (+packCost / +cigInPack) * +cigPerDay;
};

export const costOfCigaretteAmonth = (packCost, cigInPack, cigPerDay) => {
  return (+packCost / +cigInPack) * +cigPerDay * 30;
};

export const costOfCigaretteAyear = (packCost, cigInPack, cigPerDay) => {
  return (+packCost / +cigInPack) * +cigPerDay * 365;
};
