import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { EveryButton } from "../components";
import { Dispatch, bindActionCreators } from "redux";
var logo = require("../assets/download.jpg");
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static mapStatetToProps(state: State) {
    return {
      url: state.authorization.url,
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({}, dispatch);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerLogo}>
          <Image
            source={{ uri: this.props.url }}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <EveryButton
            iconName="search"
            text="Click to scan Bar-code"
            onPress={() => this.props.navigation.navigate("Pay Screen")}
          />
        </View>
      </View>
    );
  }
}
export const HomeScreen = connect(
  HomeContainer.mapStatetToProps,
  HomeContainer.mapDispatchToProps
)(HomeContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: "3%",
    backgroundColor: "#FFFFFF",
  },
  centerLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
});
