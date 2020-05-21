import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Icon, Spinner } from "native-base";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  BarcodeScanner,
  PaymentAmount,
  PaymentConfirmation,
} from "../components";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { tryPay, rePay } from "../state";

class PaymentProcessContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberShipId: "",
      connectionId: "",
      refNumber: "",
      amount: "",
      pinCode: "",
      ScannedBarCode: false,
    };
  }

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  };

  onSubmitSteps = () => {
    this.props.tryPay(this.state);
  };
  static mapStatetToProps(state: State) {
    return {
      status: state.payment.status,
      loading: state.payment.loading,
      errorMessage: state.payment.errorMessage,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 1) {
      this.setState({
        memberShipId: "",
        connectionId: "",
        refNumber: "",
        amount: "",
        pinCode: "",
        ScannedBarCode: false,
      });
    }
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ tryPay, rePay }, dispatch);
  }

  render() {
    let progressStepsStyle = {
      activeStepIconBorderColor: "#D0C21D",
      activeLabelColor: "#202945",
      activeStepNumColor: "#ffffff",
      activeStepIconColor: "#202945",
      completedStepIconColor: "#D0C21D",
      completedProgressBarColor: "#D0C21D",
      completedCheckColor: "#ffffff",
    };

    if (this.props.status === 1) {
      return (
        <View
          style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Image
            source={require("../assets/payment-successful.png")}
            style={{
              height: 200,
              width: "100%",
              resizeMode: "stretch",
            }}
          />
          <Button
            style={styles.buttonStyle}
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
            label="QR-Code Scanner"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnDisabled={!this.state.ScannedBarCode}
            nextBtnTextStyle={styles.buttonTextStyle}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#202945",
              }}
            >
              {this.state.ScannedBarCode ? (
                <View>
                  <Text style={{ fontSize: 20, margin: 8, color: "#ffffff" }}>
                    Membership ID :{this.state.memberShipId}
                  </Text>
                  <Button
                    style={styles.buttonStyle}
                    onPress={() =>
                      this.setState({
                        memberShipId: "",
                        connectionId: "",
                        refNumber: "",
                        amount: "",
                        ScannedBarCode: false,
                      })
                    }
                  >
                    <Text style={{ color: "#202945" }}>Re-Scan</Text>
                  </Button>
                </View>
              ) : (
                <BarcodeScanner
                  setBarCode={(barCode) => {
                    debugger;
                    var res = barCode.split("@");

                    this.setState({
                      connectionId: res[0],
                      memberShipId: res.length == 1 ? res[0] : res[1],
                      ScannedBarCode: true,
                    });
                  }}
                />
              )}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Payment"
            onPrevious={() => {
              this.setState({
                memberShipId: "",
                connectionId: "",
                refNumber: "",
                amount: "",
                ScannedBarCode: false,
              });
              this.props.rePay();
            }}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={styles.buttonTextStyle}
            nextBtnDisabled={this.state.amount == ""}
            errors={
              /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(
                this.state.amount
              ) == false
            }
            onNext={() => {
              if (
                /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(
                  this.state.amount
                ) == false
              ) {
                alert("please enter valid amount");
              }
            }}
            previousBtnTextStyle={styles.buttonTextStyle}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <PaymentAmount
                refNumber={this.state.refNumber}
                amount={this.state.amount}
                onChangeRefNumber={(refNumber) => this.setState({ refNumber })}
                onChangeAmount={(amount) => {
                  this.setState({ amount });
                }}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Confirm Pin"
            onSubmit={this.onSubmitSteps}
            onPrevious={() => {
              this.setState({
                pinCode: "",
              });
              this.props.rePay();
            }}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={
              this.props.loading
                ? styles.hiddenButtonTextStyle
                : styles.buttonTextStyle
            }
            nextBtnDisabled={this.state.pinCode == ""}
            previousBtnTextStyle={
              this.props.loading
                ? styles.hiddenButtonTextStyle
                : styles.buttonTextStyle
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              {this.props.loading ? (
                <Spinner color="#D0C21D" />
              ) : (
                <PaymentConfirmation
                  pinCode={this.state.pinCode}
                  refNumber={this.state.refNumber}
                  amount={this.state.amount}
                  onChangePinCode={(pinCode) => this.setState({ pinCode })}
                  errorMessage={this.props.errorMessage}
                  onCancel={() => {
                    this.props.rePay();

                    this.setState({
                      memberShipId: "",
                      connectionId: "",
                      refNumber: "",
                      amount: "",
                      pinCode: "",
                      ScannedBarCode: false,
                    });
                    console.log(this.props.navigation);
                    debugger;
                    this.props.navigation.navigate("Scan");
                  }}
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

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: "#202945",
    fontWeight: "bold",
  },
  hiddenButtonTextStyle: {
    color: "#686868",
    fontWeight: "bold",
    display: "none",
  },
  buttonStyle: {
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
    alignSelf: "center",
  },
});
