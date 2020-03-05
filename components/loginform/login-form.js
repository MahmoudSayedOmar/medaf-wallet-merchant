import React, { Component } from "react";
import { LinearGradient } from "expo";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import {
  Form,
  Item,
  Input,
  View,
  Text,
  Spinner,
  Label,
  Button
} from "native-base";

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }

  props: {
    isLoggedIn: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryLogin: UserLoginModel => void
  };

  login() {
    this.props.tryLogin(this.state);
  }

  render() {
    const loadingSpinner = this.props.loading ? (
      <Spinner color="#ef9c05" />
    ) : (
      <Text style={{ alignSelf: "center", marginTop: 5 }} bold>
        {this.props.errorMessage}
      </Text>
    );

    return (
      <View style={{ margin: 10 }}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={txt => {
                this.setState({ userName: txt });
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={txt => {
                this.setState({ password: txt });
              }}
            />
          </Item>
          <View style={styles.forgetContainer}>
            <Text
              style={styles.forgetText}
              onPress={() => console.log("Forget password")}
            >
              ForgetPassword
            </Text>
          </View>
          <View style={styles.loginContainer}>
            <Button
              dark
              full
              style={{
                borderRadius: 25,
                borderWidth: 0.8,
                backgroundColor: "#ef9c05"
              }}
              onPress={() => {
                this.props.tryLogin(this.state);
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Login</Text>
            </Button>
          </View>
          {loadingSpinner}
        </Form>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginContainer: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    paddingTop: 20
  },
  button: {
    flex: 1,
    borderRadius: 25,
    paddingTop: 5,
    borderRadius: 25,
    shadowRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        // shadowOffset: { width: 1, height: 13 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 6
      }
    })
  },
  forgetContainer: {
    flex: 1,
    // width: DEVICE_WIDTH,
    flexDirection: "row-reverse"
  },
  forgetText: {
    color: "rgba(3, 3, 3, 0.5)",
    backgroundColor: "transparent",
    fontSize: 14
  },
  registerTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  }
});
