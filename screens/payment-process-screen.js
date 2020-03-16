import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Icon, Spinner } from "native-base";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  BarcodeScanner,
  PaymentAmount,
  PaymentConfirmation
} from "../components";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { tryPay, rePay } from "../state";

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

  onSubmitSteps = () => {
    this.props.tryPay(this.state);
  };
  static mapStatetToProps(state: State) {
    return {
      status: state.payment.status,
      loading: state.payment.loading,
      errorMessage: state.payment.errorMessage
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status) {
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
    return bindActionCreators({ tryPay, rePay }, dispatch);
  }

  render() {
    const progressStepsStyle = {
      activeStepIconBorderColor: "#D0C21D",
      activeLabelColor: "#202945",
      activeStepNumColor: "#ffffff",
      activeStepIconColor: "#202945",
      completedStepIconColor: "#D0C21D",
      completedProgressBarColor: "#D0C21D",
      completedCheckColor: "#ffffff"
    };

    const buttonTextStyle = {
      color: "#202945",
      fontWeight: "bold"
    };

    const hiddenButtonTextStyle = {
      color: "#686868",
      fontWeight: "bold",
      display: "none"
    };
    debugger;
    if (this.props.status === 1) {
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
          <Button
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: wp("35%"),
              height: hp("5"),
              backgroundColor: "#D0C21D",
              shadowColor: "#000000",
              color: "#202945",
              borderColor: "#202945",
              borderWidth: 2,
              paddingTop: 8,
              paddingBottom: 5,
              height: 40,
              marginTop: 30,
              alignSelf: "center"
            }}
            onPress={() => {
              this.props.rePay();
              this.props.navigation.navigate("Home");
            }}
          >
            <Text>Back To Home</Text>
          </Button>
        </View>
      );
    }
    if (this.props.status === -1) {
      return (
        <View
          style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF"
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 20 }}>
            {this.props.errorMessage}
          </Text>
          <Button
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: wp("35%"),
              height: hp("5"),
              backgroundColor: "#D0C21D",
              shadowColor: "#000000",
              color: "#202945",
              borderColor: "#202945",
              borderWidth: 2,
              paddingTop: 8,
              paddingBottom: 5,
              height: 40,
              marginTop: 30,
              alignSelf: "center"
            }}
            onPress={() => {
              this.props.rePay();
              this.props.navigation.navigate("Home");
            }}
          >
            <Text>Back To Home</Text>
          </Button>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, marginTop: 50, backgroundColor: "#ffffff" }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Bar Code Scanner"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={
              this.state.ScannedBarCode
                ? buttonTextStyle
                : hiddenButtonTextStyle
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#202945"
              }}
            >
              {this.state.ScannedBarCode ? (
                <View>
                  <Text style={{ fontSize: 20, margin: 8, color: "#ffffff" }}>
                    {" "}
                    Membership ID :{this.state.memberShipId}
                  </Text>
                  <Button
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      width: wp("35%"),
                      height: hp("5"),
                      backgroundColor: "#D0C21D",
                      shadowColor: "#000000",
                      color: "#202945",
                      borderColor: "#202945",
                      borderWidth: 2,
                      paddingTop: 8,
                      paddingBottom: 5,
                      height: 40,
                      marginTop: 30,
                      alignSelf: "center"
                    }}
                    onPress={() =>
                      this.setState({
                        memberShipId: "",
                        billNumber: "",
                        amount: "",
                        ScannedBarCode: false
                      })
                    }
                  >
                    <Text style={{ color: "#202945" }}>Re-Scan</Text>
                  </Button>
                </View>
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
            onPrevious={() =>
              this.setState({
                memberShipId: "",
                billNumber: "",
                amount: "",
                ScannedBarCode: false
              })
            }
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
            onPrevious={() =>
              this.setState({
                pinCode: ""
              })
            }
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={
              this.props.loading ? hiddenButtonTextStyle : buttonTextStyle
            }
            previousBtnTextStyle={
              this.props.loading ? hiddenButtonTextStyle : buttonTextStyle
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              {this.props.loading ? (
                <Spinner color="#D0C21D" />
              ) : (
                <PaymentConfirmation
                  pinCode={this.state.pinCode}
                  billNumber={this.state.billNumber}
                  amount={this.state.amount}
                  onChangePinCode={pinCode => this.setState({ pinCode })}
                />
              )}
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
