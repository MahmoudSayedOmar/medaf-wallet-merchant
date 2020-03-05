import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { HomeButton } from "../components";
import { Dispatch, bindActionCreators } from "redux";

//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static mapStatetToProps(state: State) {
    return {};
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({}, dispatch);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <HomeButton
            iconName="search"
            text="Scana bar code"
            onPress={() => this.props.navigation.navigate("Pay")}
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
    justifyContent: "center",
    backgroundColor: "#60b4c2"
  }
});
