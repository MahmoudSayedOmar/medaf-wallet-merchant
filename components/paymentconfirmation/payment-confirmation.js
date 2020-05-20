import React from "react";
import { View, Text } from "native-base";
import { WalletTextInput } from "../../components/textbox/textbox";
import PaymentConfirmationStyles from "./payment-confirmation-styles";

export function PaymentConfirmation(props) {
  return (
    <View style={PaymentConfirmationStyles.container}>
      <View style={{ width: "80%" }}>
        <Text style={{ margin: 12, color: "#ffffff" }}>
          <Text style={{ fontSize: 20, color: "#ffffff" }}>
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
    </View>
  );
}
