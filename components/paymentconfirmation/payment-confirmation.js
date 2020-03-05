import React from "react";
import { View, Text } from "native-base";
import { WalletTextInput } from "../../components/textbox/textbox";
import PaymentConfirmationStyles from "./payment-confirmation-styles";

export function PaymentConfirmation(props) {
  return (
    <View style={PaymentConfirmationStyles.container}>
      <Text style={{ margin: 12 }}>
        <Text style={{ fontSize: 20 }}>You will pay for Bill Number</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {" "}
          {props.billNumber}{" "}
        </Text>
        <Text style={{ fontSize: 20 }}>with amount </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {" "}
          {props.amount} EGP
        </Text>
      </Text>
      <WalletTextInput
        value={props.pinCode}
        onChangeText={props.onChangePinCode}
        placeholder={"Enter Your Pin Code And Confirm"}
      />
    </View>
  );
}
