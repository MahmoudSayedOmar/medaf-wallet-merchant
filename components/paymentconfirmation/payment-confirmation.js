import React from "react";
import { View, Text, Button } from "native-base";
import { Platform } from "react-native";
import { WalletTextInput } from "../../components/textbox/textbox";
import PaymentConfirmationStyles from "./payment-confirmation-styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export function PaymentConfirmation(props) {
  let textStyle = { margin: 12, color: "#ffffff" };
  if (Platform.OS === "android" && Platform.Version > 21) {
    textStyle = { margin: 12, marginTop: 30, color: "#ffffff" };
  }
  let cancelStyle = {
    flexDirection: "column",
    alignItems: "center",
    width: wp("35%"),
    height: hp("5"),
    backgroundColor: "#D0C21D",
    shadowColor: "#000000",
    color: "#202945",
    borderColor: "#202945",
    borderWidth: 2,
    paddingTop: 8,
    paddingBottom: 5,
    height: 40,

    alignSelf: "center",
  };
  if (Platform.OS === "android" && Platform.Version > 21) {
    cancelStyle = {
      flexDirection: "column",
      alignItems: "center",
      width: wp("35%"),
      height: hp("5"),
      backgroundColor: "#D0C21D",
      shadowColor: "#000000",
      color: "#202945",
      borderColor: "#202945",
      borderWidth: 2,
      paddingTop: 8,
      paddingBottom: 5,
      height: 40,
      marginTop: -53,
      alignSelf: "center",
    };
  }
  return (
    <View style={PaymentConfirmationStyles.container}>
      <View style={{ width: "80%" }}>
        <Text style={textStyle}>
          <Text style={{ fontSize: 18, color: "#ffffff" }}>
            You will pay for Ref Number
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#D0C21D" }}>
            {" "}
            {props.refNumber}{" "}
          </Text>
          <Text style={{ fontSize: 20, color: "#ffffff" }}>with amount </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#D0C21D" }}>
            {" "}
            {props.amount} EGP
          </Text>
        </Text>
      </View>
      <WalletTextInput
        value={props.pinCode}
        onChangeText={props.onChangePinCode}
        placeholder={"Enter Your Pin Code And Confirm"}
        keyboardType="numeric"
      />
      <Text style={{ margin: 12, fontSize: 20, color: "#ffffff" }}>
        {props.errorMessage}
      </Text>
      <Button style={cancelStyle} onPress={props.onCancel}>
        <Text>Cancel</Text>
      </Button>
    </View>
  );
}
