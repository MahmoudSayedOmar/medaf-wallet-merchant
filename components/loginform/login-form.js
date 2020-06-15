import React, { Component } from "react";
import { LinearGradient } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { styles } from "./login-form-styles";

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
  Icon,
} from "native-base";
var logo = require("../../assets/download.jpg");
export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      showPassword: true,
    };
  }

  props: {
    isLoggedIn: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryLogin: (UserLoginModel) => void,
  };
  toggleSwitch() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

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
          <View style={styles.passwordContainer}>
            <TextInput
              value={this.state.password}
              onChangeText={(txt) => {
                this.setState({ password: txt });
              }}
              secureTextEntry={this.state.showPassword}
              onChangeText={(password) => this.setState({ password })}
              placeholder={"Enter your password"}
              placeholderTextColor="#202945"
              style={{ flex: 1, color: "#202945" }}
            />
            <Icon
              name={this.state.showPassword ? "eye-off" : "eye"}
              onPress={() => this.toggleSwitch()}
              style={styles.showHideIcon}
            />
          </View>
          {loadingSpinner}
        </Form>
      </View>
    );
  }
}
