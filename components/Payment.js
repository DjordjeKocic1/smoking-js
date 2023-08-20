import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import {
  cancelPayment,
  paymentLoading,
  paymentModalShow,
  selectAlert,
  successPayment,
} from "../store/common/alertPaymentReducer";
import { selectUser, updateUser } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { http } from "../utils/http";

export const Payment = () => {
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const { user } = useSelector(selectUser);
  const { isLoading } = useSelector(selectAlert);
  const [publishableKey, setPublishableKey] = useState("");

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const fetchPublishableKey = async () => {
    const key = (await http.stripeKey()).data;
    setPublishableKey(key);
  };

  const addLinkingListener = () => {
    Linking.addEventListener("url", handleRedirec);
  };

  const handleRedirec = async (event) => {
    if (!event) return;
    let data = Linking.parse(event.url);
    if (!!data && !!data.queryParams && !!data.queryParams.paymentId) {
      dispatch(
        updateUser(
          { subscriber: true, subscribeDate: new Date().toDateString() },
          user._id
        )
      );
      dispatch(successPayment());
    } else {
      dispatch(cancelPayment());
    }
    dispatch(paymentModalShow(false));
  };

  const paypalHandler = async () => {
    dispatch(paymentLoading(true));
    try {
      const r = await http.paypalPay();
      addLinkingListener();
      await WebBrowser.openBrowserAsync(r.data.link);
      dispatch(paymentLoading(false));
    } catch (error) {
      dispatch(paymentLoading(false));
    }
  };

  const stripeHandler = async () => {
    dispatch(paymentLoading(true));
    const { error } = await presentPaymentSheet();
    if (error) {
      dispatch(cancelPayment());
      dispatch(paymentLoading(false));
    } else {
      dispatch(
        updateUser(
          { subscriber: true, subscribeDate: new Date().toDateString() },
          user._id
        )
      );
      dispatch(successPayment());
      dispatch(paymentLoading(false));
    }
  };

  const fetchPaymentSheetsParams = async () => {
    let userData = !!user && !!user.email && user.email;
    const response = await http.paymentSheet({ email: userData });
    const { paymentIntent, ephemeralKey, customer } = await response.data;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetsParams();
    try {
      const paymentResponseSheet = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "IStop Inc.",
        allowsDelayedPaymentMethods: true,
        returnURL: "exp://192.168.0.11:19000",
        googlePay: {
          merchantCountryCode: "US",
          currencyCode: "usd",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.paymentContainerOverLay}>
      <View style={styles.paymentContainer}>
        <Text style={[styles.paymentText, { marginBottom: 10 }]}>
          Invite your best friend to become your mentor and help you quit
          smoking
        </Text>
        <Text style={[styles.paymentText, { marginBottom: 20, fontSize: 12 }]}>
          Try the new mentoring system for only{" "}
          <Text style={{ color: "blue" }}>$5</Text> a month!
        </Text>
        <Pressable onPress={paypalHandler} style={styles.paymentPay}>
          {isLoading ? (
            <ActivityIndicator
              style={{ width: 50, height: 50 }}
              size="small"
              color="#222325"
            />
          ) : (
            <Image
              source={require("../assets/images/PayPal-Logo.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          )}
        </Pressable>
        <Text style={[styles.paymentText, { fontSize: 12, marginBottom: 5 }]}>
          or
        </Text>
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
        >
          <Pressable
            onPress={stripeHandler}
            style={[styles.paymentPay, { backgroundColor: "white" }]}
          >
            {isLoading ? (
              <ActivityIndicator
                style={{ width: 50, height: 50 }}
                size="small"
                color="#222325"
              />
            ) : (
              <>
                <Text style={[styles.paymentText, { fontSize: 15,borderWidth:0.3,borderRadius:5,width:'100%',padding:10 }]}>
                  Credit Card
                </Text>
              </>
            )}
          </Pressable>
        </StripeProvider>
        <View
          pointerEvents={isLoading ? "none" : "auto"}
          onTouchEnd={() => dispatch(paymentModalShow(false))}
          style={styles.paymentCancel}
        >
          <Text
            style={[
              styles.paymentText,
              {
                fontSize: 12,
                textDecorationLine: "underline",
                textDecorationColor: "gray",
                color: "gray",
              },
            ]}
          >
            <AntDesign name="closecircle" color="gray" /> cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainerOverLay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#00000045",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  paymentContainer: {
    width: Dimensions.get("screen").width > 700 ? "60%" : "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
  paymentText: {
    textAlign: "center",
    fontFamily: "HammersmithOne-Bold",
  },
  paymentPay: {
    backgroundColor: "#ffc439",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 5,
  },
  paymentCancel: { alignItems: "center", marginTop: 10 },
});