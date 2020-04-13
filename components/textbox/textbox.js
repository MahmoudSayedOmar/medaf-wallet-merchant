import React from "react";
import { TextInput } from "react-native";
import WalletTextInputStyles from "./textbox-styles";

export function WalletTextInput(props) {
  return (
    <TextInput
      placeholderTextColor="#D0C21D"
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      style={WalletTextInputStyles.input}
      keyboardType={props.keyboardType}
    />
  );
}
