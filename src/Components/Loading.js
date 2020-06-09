import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as myFireStore from '../Firebase';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    myFireStore.FireAuth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f0e2a6'
  },
});
