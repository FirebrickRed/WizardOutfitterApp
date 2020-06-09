import React, { useState } from "react";
import { Text, View, Button, Picker, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as myFireStore from "../Firebase";

function CreateWizard(props) {
  const currentUserId = myFireStore.getCurrentUserID();
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [school, setSchool] = useState("Ice");
  const [showLevelError, setShowLevelError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const createWizard = () => {
    if (level === 0) {
      setShowLevelError(true);
    } else {
      if (name.trim() !== "") {
        console.log(`${currentUserId} ${name} ${level} ${school}`);
        myFireStore
          .getBaseStats(school)
          .get()
          .then((query) => {
            const WizardData = query.data()["Level"][level];
            console.log("wizard data", WizardData);

            let wizard = {
              Name: name,
              Level: Number(level),
              School: school,
              IsActive: true,
              Bonuses: {
                Health: WizardData.Health,
                Mana: WizardData.Mana,
                PipChance: WizardData["Pip Chance"],
                PipConversion: WizardData["Pip Conversion"],
                Energy: WizardData.Energy,
              },
              LevelStats: {
                TotalExperience: WizardData["Total Experience"],
                ExperienceToGo: WizardData["Experience To Go"],
                TotalTrainingPoints: WizardData["Total Training Points"],
                WillObtainTrainingPoint:
                  WizardData["Will Obtain Training Point"],
              },
              Equipment: {}
            };

            console.log("wizard to be added", wizard);
            myFireStore.addSingleWizard(currentUserId, wizard);

            props.navigation.navigate("ViewWizards");
          });
      } else {
        setShowNameError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Wizard!</Text>
      <TextInput
        placeholder="Wizard Name"
        placeholderTextColor="#333"
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.inputs}
      />
      {showNameError && <Text>You need to name your wizard.</Text>}
      <TextInput
        value={level}
        placeholder="Wizard Level"
        placeholderTextColor="#333"
        keyboardType="numeric"
        style={styles.inputs}
        onChangeText={(value) => {
          if (value > 0 && value <= 130) {
            setLevel(value);
            setShowLevelError(false);
          } else {
            setLevel(1);
            setShowLevelError(true);
          }
        }}
      />
      {showLevelError && <Text>Levels are between 1 and 130.</Text>}
      <Picker
        selectedValue={school}
        style={{ height: 50, width: 150 }}
        onValueChange={(value) => {
          setSchool(value);
        }}
      >
        <Picker.Item label="Ice" value="Ice" />
        <Picker.Item label="Fire" value="Fire" />
        <Picker.Item label="Life" value="Life" />
        <Picker.Item label="Myth" value="Myth" />
        <Picker.Item label="Death" value="Death" />
        <Picker.Item label="Storm" value="Storm" />
        <Picker.Item label="Balance" value="Balance" />
      </Picker>
      <View style={styles.buttons}>
        <Button
          title="cancel"
          color="#9a4444"
          style={styles.button}
          onPress={() => props.navigation.navigate("ViewWizards")}
        />
        <Button
          title="Create Wizard"
          color="#6b2525"
          style={styles.button}
          onPress={() => createWizard()}
        />
      </View>
    </View>
  );
}

export default CreateWizard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f0e2a6",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Shermlock",
    color: "#6b2525",
  },
  inputs: {
    borderBottomColor: "#333",
    borderStyle: "solid",
    borderBottomWidth: 1,
    margin: 5,
  },
});
