import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PaymentProcessScreen, LoginScreen } from "./screens";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./state";
import { AppLoading } from "expo";
import thunk from "redux-thunk";

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    const store = compose(applyMiddleware(thunk))(createStore)(reducer);

    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginIn" headerMode="none">
            <Stack.Screen name="LoginIn" component={LoginScreen} />

            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Pay" component={PaymentProcessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
