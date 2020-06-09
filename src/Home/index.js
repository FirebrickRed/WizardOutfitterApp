import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import Header from "../Components/Header";

function HomeScreen() {
  return (
    <View style={{ backgroundColor: "#f0e2a6", height: "100%" }}>
      <Header text="Home Screen" />
      <Text>
        Welcome! This is a fan made app to help improve searching for items and
        seeing how the stats will affect your wizard. Discord server link{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL("https://discord.gg/ySsfUdA")}
        >
          HERE
        </Text>
        . If you find bugs, have Ideas, wanna recieve updates, ect.
      </Text>
    </View>
  );
}

export default HomeScreen;
