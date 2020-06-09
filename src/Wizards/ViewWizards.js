import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as myFireStore from "../Firebase";
import Wizard from "./Wizard";
import { useFocusEffect } from "@react-navigation/native";

function ViewWizards(props) {
  const currentUserId = myFireStore.getCurrentUserID();
  const [wizards, setWizards] = useState([]);

  const signOut = () => {
    myFireStore.signOut();
    props.navigation.navigate("Login");
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("in usecallback");
      getWizzes();
    }, [])
  );

  const getWizzes = () => {
    console.log("in get wizzes");
    myFireStore
      .getAllWizardsForUser(currentUserId)
      .get()
      .then((query) => {
        let wizs = [];
        query.docs.forEach((doc) => {
          let addId = doc.data();
          addId.id = doc.id;
          wizs.push(addId);
        });
        console.log("in query", wizs);
        setWizards(wizs);
      })
      .catch((error) => {
        console.log("error in wizards", error);
      });
  };

  return (
    <View style={{ height: "100%", backgroundColor: "#f0e2a6" }}>
      <View style={styles.buttons}>
        <Button title="Sign out" color="#9a4444" onPress={() => signOut()} />
        <Button
          title="Create Wizard"
          color="#6b2525"
          onPress={() => props.navigation.navigate("CreateWizard")}
        />
      </View>
      {wizards.length != 0 && <Wizard getWizards={wizards} />}
    </View>
  );
}

export default ViewWizards;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
