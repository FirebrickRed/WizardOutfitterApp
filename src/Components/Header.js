import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from '@use-expo/font';

function Header(props) {
  let [fontsLoaded] = useFonts({
    'Shermlock': require('../../assets/shermlock/Shermlock.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
  return (
    <View style={styles.shadow}>
      <Text style={styles.headbar}>{props.text}</Text>
    </View>
  );
  }
}

export default Header;

const styles = StyleSheet.create({
  headbar: {
    fontSize: 35,
    textAlign: "center",
    padding: 25,
    paddingBottom: 15,
    backgroundColor: "#d6c591",
    borderBottomWidth: 1,
    borderBottomColor: "#9a4444",
    borderStyle: "solid",
    color: "#6b2525",
    shadowColor: "#6b2525",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
    fontFamily: 'Shermlock'
  },
});
