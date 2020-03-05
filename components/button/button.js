import React from "react";
import { Button, Icon, Text } from "native-base";
//import HomeButton from "./button-styles";

export function HomeButton(props) {
  return (
    <Button
      style={{
        flexDirection: "column",
        backgroundColor: "#D0C21D",
        borderColor: "#202945",
        borderWidth: 2,
        height: 80
      }}
      onPress={props.onPress}
    >
      <Icon style={{ color: "#202945", fontSize: 35 }} name={props.iconName} />
      <Text style={{ color: "#202945", fontSize: 20 }}>{props.text}</Text>
    </Button>
  );
}
