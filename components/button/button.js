import React from "react";
import { Button, Icon, Text } from "native-base";
//import HomeButton from "./button-styles";

export function HomeButton(props) {
  return (
    <Button
      style={{ flexDirection: "column" }}
      transparent
      onPress={props.onPress}
    >
      <Icon style={{ color: "#FFFFFF", fontSize: 35 }} name={props.iconName} />
      <Text style={{ color: "#FFFFFF", fontSize: 20 }}>{props.text}</Text>
    </Button>
  );
}
