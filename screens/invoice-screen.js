import React, { Component } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, Button } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect } from "react-redux";
import { EveryButton } from "../components";
import { Dispatch, bindActionCreators } from "redux";
var logo = require("../assets/download.jpg");
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class InvoiceContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static mapStatetToProps(state: State) {
    return {
      url: state.authorization.url,
      merchantName: state.authorization.selectedMerchantName,
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({}, dispatch);
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <View style={styles.centerTitle}>
            <Text
              style={{ fontWeight: "bold", color: "#D0C21D", fontSize: 16 }}
            >
              Receipt
            </Text>
          </View>
          <View style={styles.centerLogo}>
            <Text style={styles.merchantTitle}>Merchant Title</Text>
            <Image source={logo} style={{ width: 150 }} />
            <Text style={styles.invoiceDate}>Mon 25 Feb, 2020</Text>
          </View>
          <View style={styles.restOfDetails}>
            <Text style={styles.detailsTitle}>UserName : </Text>
            <Text style={styles.detailsData}>mohsen abdel raoof</Text>
          </View>
          <View style={styles.restOfDetails}>
            <Text style={styles.detailsTitle}>Ref. Number : </Text>
            <Text style={styles.detailsData}>#47988234</Text>
          </View>
          <View style={styles.restOfDetails}>
            <Text style={styles.detailsTitle}>Total Amount : </Text>
            <Text style={styles.detailsData}>5894 EGP</Text>
          </View>
          <View style={styles.restOfDetails}>
            <Text style={styles.detailsTitle}>Printed On : </Text>
            <Text style={styles.detailsData}>Mon 25 Feb, 2020</Text>
          </View>
          <View style={styles.centerLogo}>
            <Image source={logo} style={{ width: 150 }} />
          </View>
          <Button
            style={styles.button}
            onPress={() => {
              console.log("print function");
            }}
          >
            <Text style={{ color: "#202945" }}>Print</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export const InvoiceScreen = connect(
  InvoiceContainer.mapStatetToProps,
  InvoiceContainer.mapDispatchToProps
)(InvoiceContainer);

const styles = StyleSheet.create({
  centerTitle: {
    borderColor: "#D0C21D",
    borderBottomWidth: 1,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 7,
    paddingBottom: 11,
    paddingTop: 30,
  },
  container: {
    flex: 1,

    paddingTop: "3%",
    backgroundColor: "#FFFFFF",
  },
  centerLogo: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: "5%",
  },
  merchantTitle: {
    fontWeight: "bold",
    color: "#D0C21D",
    fontSize: 18,
    marginBottom: 20,
  },
  invoiceDate: {
    color: "#D0C21D",
    fontSize: 16,
    marginBottom: 20,
  },
  restOfDetails: {
    flexDirection: "row",
    borderBottomColor: "#D0C21D",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingLeft: 15,
    marginVertical: 6,
  },
  detailsTitle: {
    color: "#202945",
  },
  detailsData: {
    color: "#000",
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

    paddingTop: 4,
  },
});
