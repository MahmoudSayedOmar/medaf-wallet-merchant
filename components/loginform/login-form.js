import React, { Component } from "react";
import { LinearGradient } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image
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
var logo = require("../../assets/download.jpg");
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
    let loadingSpinner = this.props.loading ? (
      <Spinner color="#ef9c05" />
    ) : (
      <View style={styles.loginContainer}>
        {this.props.loginFail ? (
          <Text style={{ color: "#202945", alignSelf: "center" }}>
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
          <Item floatingLabel>
            <Label>
              <Text style={{ color: "#202945" }}>Email</Text>
            </Label>
            <Input
              onChangeText={txt => {
                this.setState({ userName: txt });
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>
              {" "}
              <Text style={{ color: "#202945" }}>Password</Text>
            </Label>
            <Input
              secureTextEntry={true}
              onChangeText={txt => {
                this.setState({ password: txt });
              }}
            />
          </Item>

          {loadingSpinner}
        </Form>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 50
  },

  loginContainer: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    paddingTop: 20
  },
  centerLogo: {
    width: wp("100%"),
    height: hp("22%"),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    width: wp("35%"),
    height: hp("5"),
    backgroundColor: "#D0C21D",
    shadowColor: "#000000",
    color: "#202945",

    borderColor: "#202945",
    borderWidth: 2,
    paddingBottom: 5,
    height: 40,
    marginTop: 30,
    alignSelf: "center"
  },
  // button: {
  //   flex: 1,
  //   borderRadius: 25,
  //   paddingTop: 5,
  //   borderRadius: 25,
  //   shadowRadius: 15,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: "#000",
  //       shadowOffset: { width: 0, height: 2 },
  //       // shadowOffset: { width: 1, height: 13 },
  //       shadowOpacity: 0.2
  //     },
  //     android: {
  //       elevation: 6
  //     }
  //   })
  // },
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
