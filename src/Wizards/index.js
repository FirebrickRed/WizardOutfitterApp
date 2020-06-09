import React from "react";
import { View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Header from "../Components/Header";
import Login from "./Login";
import SignUp from "./SignUp";
import Loading from "../Components/Loading";
import Main from "./Main";

const AccountNavigation = createSwitchNavigator(
  {
    SignUp,
    Login,
    Loading,
    Main,
  },
  {
    initialRouteName: "Loading",
  }
);

const AccountContainer = createAppContainer(AccountNavigation);

function WrappedWizardsScreen() {
  return (
    <View>
      <Header text="Wizards Screen" />
      <AccountContainer />
    </View>
  );
}

export default WrappedWizardsScreen;
