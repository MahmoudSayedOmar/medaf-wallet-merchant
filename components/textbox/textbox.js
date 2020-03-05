import React from "react";
import { TextInput } from "react-native";
import WalletTextInputStyles from "./textbox-styles";

export function WalletTextInput(props) {
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      style={WalletTextInputStyles.input}
    />
  );
}
