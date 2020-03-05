import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  BarcodeScanner,
  PaymentAmount,
  PaymentConfirmation
} from "../components";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

import { tryPay } from "../state";

class PaymentProcessContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberShipId: "",
      billNumber: "",
      amount: "",
      pinCode: "",
      ScannedBarCode: false
    };
  }

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center"
    }
  };

  onNextStep = () => {
    //console.log("called next step");
  };

  onPaymentStepComplete = () => {
    // alert("Payment step completed!");
  };

  onPrevStep = () => {
    // console.log("called previous step");
  };

  onSubmitSteps = () => {
    this.props.tryPay(this.state);
  };
  static mapStatetToProps(state: State) {
    return {
      status: state.payment.status
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === true) {
      this.setState({
        memberShipId: "",
        billNumber: "",
        amount: "",
        pinCode: "",
        ScannedBarCode: false
      });
      //  this.props.navigation.navigate("home");
    }
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ tryPay }, dispatch);
  }

  render() {
    const progressStepsStyle = {
      activeStepIconBorderColor: "#ffa500",
      activeLabelColor: "#686868",
      activeStepNumColor: "#ffa500",
      activeStepIconColor: "#686868",
      completedStepIconColor: "#ffa500",
      completedProgressBarColor: "#ffa500",
      completedCheckColor: "#60b4c2"
    };

    const buttonTextStyle = {
      color: "#686868",
      fontWeight: "bold"
    };

    const hiddenButtonTextStyle = {
      color: "#686868",
      fontWeight: "bold",
      display: "none"
    };
    if (this.props.status) {
      return (
        <View
          style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF"
          }}
        >
          <Image
            source={require("../assets/payment-successful.png")}
            style={{
              height: 200,
              width: "100%",
              resizeMode: "stretch"
            }}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, marginTop: 50, backgroundColor: "#60b4c2" }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Bar Code Scanner"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={
              this.state.ScannedBarCode
                ? buttonTextStyle
                : hiddenButtonTextStyle
            }
            previousBtnTextStyle={buttonTextStyle}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#f99c05"
              }}
            >
              {this.state.ScannedBarCode ? (
                <Text style={{ fontSize: 20, margin: 8 }}>
                  {" "}
                  Membership ID :{this.state.memberShipId}
                </Text>
              ) : (
                <BarcodeScanner
                  setBarCode={barCode =>
                    this.setState({
                      memberShipId: barCode,
                      ScannedBarCode: true
                    })
                  }
                />
              )}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Payment"
            onNext={this.onPaymentStepComplete}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              <PaymentAmount
                billNumber={this.state.billNumber}
                amount={this.state.amount}
                onChangeBillNumber={billNumber => this.setState({ billNumber })}
                onChangeAmount={amount => this.setState({ amount })}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Confirm Pin"
            onSubmit={this.onSubmitSteps}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              <PaymentConfirmation
                pinCode={this.state.pinCode}
                billNumber={this.state.billNumber}
                amount={this.state.amount}
                onChangePinCode={pinCode => this.setState({ pinCode })}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

export const PaymentProcessScreen = connect(
  PaymentProcessContainer.mapStatetToProps,
  PaymentProcessContainer.mapDispatchToProps
)(PaymentProcessContainer);
