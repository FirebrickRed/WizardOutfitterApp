import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Items from "../Search/Items";

function Wizard(props) {
  const wizards = props.getWizards;
  const [activeWizard, setActiveWizard] = useState(0);

  const nextPage = (pageNum) => {
    let newpagenum =
      activeWizard + pageNum > wizards.length - 1
        ? 0
        : activeWizard + pageNum < 0
        ? wizards.length - 1
        : activeWizard + pageNum;

    setActiveWizard(newpagenum);
  };

  const renderEquipment = () => {
    let items = [];
    Object.keys(wizards[activeWizard].Equipment).map((equip) => {
      items.push(wizards[activeWizard].Equipment[equip]);
    });
    return items.map((item, index) => <Items key={index} getItems={item} />);
  };

  const getSchoolImg = (school) => {
    switch (school) {
      case "Ice":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Ice.gif")}
            style={styles.img}
          />
        );
      case "Fire":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Fire.gif")}
            style={styles.img}
          />
        );
      case "Myth":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Myth.gif")}
            style={styles.img}
          />
        );
      case "Storm":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Storm.gif")}
            style={styles.img}
          />
        );
      case "Death":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Death.gif")}
            style={styles.img}
          />
        );
      case "Life":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Life.gif")}
            style={styles.img}
          />
        );
      case "Balance":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Balance.gif")}
            style={styles.img}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{  }}>
        <View style={styles.inlinesep}>
          {wizards.length > 1 && (
            <FontAwesome.Button
              name="chevron-left"
              backgroundColor="#6b2525"
              style={styles.btnStyle}
              onPress={() => nextPage(-1)}
            />
          )}
          <Text style={styles.head}>{wizards[activeWizard].Name}</Text>
          {wizards.length > 1 && (
            <FontAwesome.Button
              name="chevron-right"
              backgroundColor="#6b2525"
              style={styles.btnStyle}
              onPress={() => nextPage(1)}
            />
          )}
        </View>

        <View style={styles.inlinesep}>
          <Text style={styles.text}>Level: {wizards[activeWizard].Level}</Text>
          {wizards[activeWizard].School &&
            getSchoolImg(wizards[activeWizard].School)}
        </View>
        <Text style={styles.subHead}>Base Stats</Text>

        <View style={styles.center}>
          <View style={styles.inlineto}>
            <Text style={styles.text}>
              {wizards[activeWizard].Bonuses.Health}
            </Text>
            <Image
              source={require("../../assets/Assets/GearIcons/PlusHealth.gif")}
              style={styles.smallimg}
            />
          </View>

          <View style={styles.inlineto}>
            <Text style={styles.text}>
              {wizards[activeWizard].Bonuses.Mana}
            </Text>
            <Image
              source={require("../../assets/Assets/GearIcons/PlusMana.gif")}
              style={styles.smallimg}
            />
          </View>

          <View style={styles.inlineto}>
            <Text style={styles.text}>
              {wizards[activeWizard].Bonuses.PipChance}
            </Text>
            <Image
              source={require("../../assets/Assets/GearIcons/PowerPip.gif")}
              style={styles.smallimg}
            />
          </View>

          <Text style={styles.text}>
            Pip Conversion: {wizards[activeWizard].Bonuses.PipConversion}
          </Text>
          {wizards[activeWizard].equipment && <Text>Equipment</Text>}
        </View>
      </View>

        <ScrollView style={{ flex:1, marginBottom: 185 }}>
          {renderEquipment()}
        </ScrollView>
    </View>
  );
}

export default Wizard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex:1
  },
  img: {
    width: 30,
    height: 30,
  },
  smallimg: {
    width: 30,
    height: 30,
    resizeMode: 'center'
  },
  inlinesep: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inlineto: {
    display: "flex",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  btnStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    fontSize: 40,
    fontFamily: "Shermlock",
    color: "#6b2525",
    textAlign: "center",
  },
  subHead: {
    fontSize: 30,
    fontFamily: "Shermlock",
    color: "#6b2525",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
  },
});
