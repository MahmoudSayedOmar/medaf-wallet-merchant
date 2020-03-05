import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

export class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false
    };
  }

  handleBarCodeScanned({ type, data }) {
    this.setState({ scanned: true });
    this.props.setBarCode(data);
  }
  componentDidMount() {
    (async () => {
      const result = await BarCodeScanner.requestPermissionsAsync();
      debugger;

      const { status } = result;
      this.setState({ hasPermission: status === "granted" });
    })();
  }
  render() {
    debugger;
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned
              ? undefined
              : this.handleBarCodeScanned.bind(this)
          }
          style={StyleSheet.absoluteFillObject}
        />

        {this.state.scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}
