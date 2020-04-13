import React from "react";
import { Button, Icon, Text } from "native-base";

import { styles } from "./button-styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export function EveryButton(props) {
  return (
    <Button style={styles.buttonStyle} onPress={props.onPress}>
      {/* <Icon style={{ color: "#202945", fontSize: 35 }} name={props.iconName} /> */}
      <Text style={{ color: "#202945" }}>{props.text}</Text>
    </Button>
  );
}
