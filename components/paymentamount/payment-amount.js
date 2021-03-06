import React from "react";
import { WalletTextInput } from "../../components/textbox/textbox";
import { View } from "react-native";
import PaymentAmountStyles from "./payment-amount-styles";
export function PaymentAmount(props) {
  return (
    <View style={PaymentAmountStyles.container}>
      <WalletTextInput
        value={props.refNumber}
        onChangeText={props.onChangeRefNumber}
        placeholder={"Enter Ref Number"}
        keyboardType="numeric"
      />
      <WalletTextInput
        value={props.amount}
        onChangeText={props.onChangeAmount}
        placeholder={"Enter amount in EGP"}
        keyboardType="decimal-pad"
      />
    </View>
  );
}
