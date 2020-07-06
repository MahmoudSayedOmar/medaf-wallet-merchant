import * as React from "react";
import { StyleSheet, Text, Icon } from "react-native";

import { connect } from "react-redux";

import { Dispatch, bindActionCreators } from "redux";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "./home-screen";
// import { InvoiceScreen } from "./invoice-screen";
import { HistoryScreen } from "./history-screen";
import { SettingsScreen } from "./settings-screen";
import { ChangePinCodeScreen } from "./change-pin-code";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PaymentProcessScreen } from "./payment-process-screen";
var logo = require("../assets/download.jpg");

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    // headerMode="none"
    <HomeStack.Navigator initialRouteName="Scan">
      <HomeStack.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: { borderWidth: 1, borderBottomColor: "#D0C21D" },
          headerTintColor: "#D0C21D",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <HomeStack.Screen
        headerMode="none"
        name="Pay Screen"
        component={PaymentProcessScreen}
        options={{
          title: "Payment Process",
          headerStyle: { borderWidth: 1, borderBottomColor: "#D0C21D" },
          headerTintColor: "#202945",
          headerBackTitle: "back",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#D0C21D",
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    // headerMode="none"
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyle: { borderWidth: 1, borderBottomColor: "#D0C21D" },
          headerTintColor: "#D0C21D",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <SettingsStack.Screen
        headerMode="none"
        name="Change Pin"
        component={ChangePinCodeScreen}
        options={{
          title: "Change Pin",
          headerStyle: { borderWidth: 1, borderBottomColor: "#D0C21D" },
          headerTintColor: "#202945",
          headerBackTitle: "back",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#D0C21D",
          },
        }}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  static mapStatetToProps(state: State) {
    return {};
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({}, dispatch);
  }
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = null;
            switch (route.name) {
              case "Home":
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
                break;
              case "History":
                iconName = focused ? "md-clock" : "md-clock";
                break;
              case "Settings":
                iconName = focused ? "ios-list-box" : "ios-list";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#D0C21D",
          inactiveTintColor: "gray",
        }}
      >
        {/* <Tab.Screen name="Invoice" component={InvoiceScreen} /> */}
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    );
  }
}
export const ApplicationScreen = connect(
  ApplicationContainer.mapStatetToProps,
  ApplicationContainer.mapDispatchToProps
)(ApplicationContainer);

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
  buttonStyle: {
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    height: hp("5"),
    backgroundColor: "#D0C21D",
    shadowColor: "#000000",
    color: "#202945",

    borderColor: "#202945",
    borderWidth: 1,

    height: 31,
    marginTop: 10,
    padding: 10,
    alignSelf: "center",
  },
});
