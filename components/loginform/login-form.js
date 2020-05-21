import React, { Component } from "react";
import { LinearGradient } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  TextInput,
} from "react-native";
import {
  Form,
  Item,
  Input,
  View,
  Text,
  Spinner,
  Label,
  Button,
} from "native-base";
var logo = require("../../assets/download.jpg");
export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
  }

  props: {
    isLoggedIn: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryLogin: (UserLoginModel) => void,
  };

  login() {
    this.props.tryLogin(this.state);
  }

  render() {
    let loadingSpinner = this.props.loading ? (
      <Spinner color="#ef9c05" />
    ) : (
      <View style={styles.loginContainer}>
        {this.props.loginFail ? (
          <Text style={{ color: "red", alignSelf: "center" }}>
            Check your Email or Password
          </Text>
        ) : null}
        <Button
          style={styles.button}
          onPress={() => {
            this.props.tryLogin(this.state);
          }}
        >
          <Text style={{ color: "#202945" }}>Login</Text>
        </Button>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.centerLogo}>
          <Image source={logo} style={{ width: 150 }} />
        </View>
        <Form>
          <TextInput
            value={this.state.userName}
            onChangeText={(txt) => {
              this.setState({ userName: txt });
            }}
            placeholder={"Email"}
            placeholderTextColor="#202945"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(txt) => {
              this.setState({ password: txt });
            }}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor="#202945"
            style={styles.input}
          />

          {loadingSpinner}
        </Form>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "13%",
    backgroundColor: "#FFFFFF",
  },

  loginContainer: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    paddingTop: 20,
  },
  centerLogo: {
    width: wp("100%"),
    height: hp("22%"),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    height: hp("5"),
    backgroundColor: "#D0C21D",
    shadowColor: "#000000",
    color: "#202945",
    borderColor: "#202945",
    borderWidth: 1,
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    paddingTop: 5,
  },

  forgetContainer: {
    flex: 1,
    // width: DEVICE_WIDTH,
    flexDirection: "row-reverse",
  },
  forgetText: {
    color: "rgba(3, 3, 3, 0.5)",
    backgroundColor: "transparent",
    fontSize: 14,
  },
  registerTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    textAlign: "left",
    paddingLeft: 8,
    height: 50,
    borderWidth: 2,
    borderColor: "#D0C21D",
    borderRadius: 5,
    color: "#202945",

    margin: 10,
  },
});
