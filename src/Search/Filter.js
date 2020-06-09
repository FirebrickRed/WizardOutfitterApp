import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  CheckBox,
  TextInput,
} from "react-native";
import Header from "../Components/Header";
import { useNavigation } from "@react-navigation/native";

function FilterModal(props) {
  const [type, setType] = useState("Hats");
  const [school, setSchool] = useState("Ice");
  const [level, setLevel] = useState(1);
  const [useLevel, setUseLevel] = useState(false);
  const [useSchool, setUseSchool] = useState(false);
  const [showLevelError, setShowLevelError] = useState(false);
  const nav = useNavigation();

  function applyFilters() {
    let searchingFor = { type: type, where: [], orderBy: [] };
    if (useLevel) {
      searchingFor.where.push(["LevelRequirement", "<=", parseInt(level)]);
      // searchingFor.orderBy.push(['LevelRequirement', 'desc'])
    }
    if (useSchool) {
      searchingFor.where.push(["School", "==", school]);
    }
    searchingFor.orderBy.push("LevelRequirement", "desc");
    props.navigation.navigate("SearchScreen", { filters: searchingFor });
  }

  return (
    <View>
      <Header text="Filter" />
      <View style={styles.container}>
        <Picker
          selectedValue={type}
          style={{ height: 50, width: 150 }}
          onValueChange={(value) => {
            setType(value);
          }}
        >
          <Picker.Item label="Hats" value="Hats" />
          <Picker.Item label="Robes" value="Robes" />
          <Picker.Item label="Boots" value="Boots" />
        </Picker>

        <CheckBox
          value={useLevel}
          onValueChange={() => {
            setUseLevel(!useLevel);
          }}
        />
        <Text>Filter with levels?</Text>

        {useLevel && (
          <>
            <TextInput
              value={level}
              placeholder="Enter Level"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholderTextColor="#555"
              onChangeText={(value) => {
                if (value > 0 && value <= 130) {
                  setShowLevelError(false);
                } else {
                  setShowLevelError(true);
                }
                setLevel(value);
              }}
            />
            {showLevelError && <Text>Levels are between 1 and 130.</Text>}
          </>
        )}

        <CheckBox
          value={useSchool}
          onValueChange={() => {
            setUseSchool(!useSchool);
          }}
        />
        <Text>Filter with Schools?</Text>

        {useSchool && (
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
        )}

        <View style={styles.buttons}>
          <Button
            onPress={() => props.navigation.navigate("SearchScreen")}
            title="Cancel"
            color="#9a4444"
          />
          <Button
            onPress={() => {
              applyFilters();
            }}
            title="Apply"
            color="#6b2525"
          />
        </View>
      </View>
    </View>
  );
}

export default FilterModal;

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
});
