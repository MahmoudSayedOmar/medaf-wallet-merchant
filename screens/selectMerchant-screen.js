import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Picker } from "native-base";
import { State, trySetCurrentMerchant } from "../state";

import { SelectMerchantComponent } from "../components";

class SelectMerchantContainer extends Component {
  constructor() {
    super();
    this.state = {
      selected: undefined,
      merchantList: [],
    };
  }
  static mapStatetToProps(state: State) {
    
    return {
      merchants: state.authorization.merchants,
      haveSelectMerchant: state.authorization.haveSelectMerchant,
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ trySetCurrentMerchant }, dispatch);
  }
componentWillMount(){
  debugger;
  if (this.state.selected == undefined && this.props.merchants) {
    this.setState({ selected: this.props.merchants[0].Id });
  }
}
  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.haveSelectMerchant) {
      this.props.navigation.reset({
        routes: [{ name: "Application" }],
      });
    }
    if (this.state.selected == undefined && this.props.merchants) {
      this.setState({ selected: this.props.merchants[0].Id });
    }
  }

  onValueChange(value: string) {
    debugger;
    this.setState({
      selected: value,
    });
  }
  onNavigateTo(goTo) {

    if (this.state.selected != undefined) {
 
    this.props.trySetCurrentMerchant(this.state.selected);
  }
  }

  render() {

    let allMerchantList = this.props.merchants.map((eachMerchant, index) => {
      return (
        <Picker.Item
          label={eachMerchant.Name}
          value={eachMerchant.Id}
          key={eachMerchant.Id}
        />
      );
    });
    return (
      <View style={styles.container}>
        <SelectMerchantComponent
          onValueChange={(value) => this.onValueChange(value)}
          selected={this.state.selected}
          onNavigateTo={(goTo) => this.onNavigateTo(goTo)}
          listOfMerchants={allMerchantList}
        />
      </View>
    );
  }
}

export const SelectMerchantScreen = connect(
  SelectMerchantContainer.mapStatetToProps,
  SelectMerchantContainer.mapDispatchToProps
)(SelectMerchantContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%",
    backgroundColor: "#FFFFFF",
  },
});
