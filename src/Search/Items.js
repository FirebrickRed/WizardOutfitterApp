import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Items(props) {
  const item = props.getItems;
  const wheel = ["bonuses", "obtained_by", "extra_info", "equipment_set"];
  const [wheelLocation, setWheelLocation] = useState(0);

  function nextPage(pageNum) {
    let newpagenum =
      wheelLocation + pageNum > wheel.length - 1
        ? 0
        : wheelLocation + pageNum < 0
        ? wheel.length - 1
        : wheelLocation + pageNum;
    setWheelLocation(newpagenum);
  }

  function renderStats(item) {
    let place = wheel[wheelLocation];
    switch (place) {
      case "bonuses":
        return renderBonuses(item.Bonuses);
      case "obtained_by":
        return renderObtainedBy(item.ObtainedBy);
      case "extra_info":
        return renderExtraInfo(item);
      case "equipment_set":
        return renderEquipmentSet(item.EquipmentSet);
    }
  }

  function renderBonuses(bonuses) {
    let htmlbonuses = [];

    Object.keys(bonuses).map((object) => {
      htmlbonuses.push(
        <View style={styles.inlineto}>
          <Text style={styles.content} key={object + bonuses[object]}>
            {bonuses[object]}
          </Text>
          {getBonusesIcon(object)}
        </View>
      );
    });

    return (
      <View>
        <Text style={styles.subheader}>Bonuses</Text>
        {htmlbonuses}
      </View>
    );
  }

  const getBonusesIcon = (bonus) => {
    if (bonus.includes("Card")) {
      return <Text> {bonus}</Text>;
    } else {
      if (bonus.includes(" ")) {
        if (bonus.includes("Stun")) {
          return (
            <Image
              source={{
                uri:
                  "http://www.wizard101central.com/wiki/images/d/df/%28Icon%29_Stun_Resistance.png",
              }}
              style={styles.smallimg}
            />
          );
        } else {
          let split = bonus.split(" ");
          return (
            <View style={styles.inlineto2}>
              {getSchoolAttribute(split[0])}
              {getSecondaryAttribute(split[split.length - 1])}
            </View>
          );
        }
      } else {
        switch (bonus) {
          case "Health":
            return (
              <Image
                source={require("../../assets/Assets/GearIcons/PlusHealth.gif")}
                style={styles.smallimg}
              />
            );
          case "Mana":
            return (
              <Image
                source={require("../../assets/Assets/GearIcons/PlusMana.gif")}
                styles={styles.smallimg}
              />
            );
          case "Energy":
            return (
              <Image
                source={require("../../assets/Assets/GearIcons/amuleticon.gif")}
                styles={styles.smallimg}
              />
            );
        }
      }
    }

    return <Text>Bonus Text</Text>;
  };

  const getSchoolAttribute = (attribute) => {
    switch (attribute) {
      case "Life":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/LifeAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Death":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/DeathAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Ice":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/IceAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Fire":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/FireAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Storm":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/StormAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Myth":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/MythAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Balance":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/BalanceAttribute.gif")}
            style={styles.smallimg}
          />
        );
      case "Global":
        return (
          <Image
            source={require("../../assets/Assets/SpellIcons/GlobalIcon.gif")}
            style={styles.smallimg}
          />
        );
      case "Power":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/PowerPip.gif")}
            style={styles.smallimg}
          />
        );
      case "Shadow":
        return (
          <Image
            source={require("../../assets/Assets/SchoolIcons/Shadow.gif")}
            style={styles.smallimg}
          />
        );
      case "Incoming":
        return <Text> Incoming </Text>;
      case "Outgoing":
        return <Text> Outgoing </Text>;
      default:
        return <Text style={{ color: "red" }}>{attribute}</Text>;
    }
  };

  const getSecondaryAttribute = (attribute) => {
    switch (attribute) {
      case "Accuracy":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/PlusAccuracy.gif")}
            style={styles.smallimg}
          />
        );
      case "Critical":
        return (
          <Image
            source={{
              uri:
                "http://www.wizard101central.com/wiki/images/1/1b/%28Icon%29_Critical.png",
            }}
            style={styles.smallimg}
          />
        );
      case "Resistance":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/Resistance.gif")}
            style={styles.smallimg}
          />
        );
      case "Damage":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/PlusDamage.gif")}
            style={styles.smallimg}
          />
        );
      case "Pip":
        return <Text> Chance</Text>;
      case "Healing":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/PlusHealing.gif")}
            style={styles.smallimg}
          />
        );
      case "Block":
        return (
          <Image
            source={{
              uri:
                "http://www.wizard101central.com/wiki/images/3/3a/%28Icon%29_Critical_Block.png",
            }}
            style={styles.smallimg}
          />
        );
      case "Piercing":
        return (
          <Image
            source={{
              uri:
                "http://www.wizard101central.com/wiki/images/4/42/%28Icon%29_Armor_Piercing.png",
            }}
            style={styles.smallimg}
          />
        );
      default:
        return <Text style={{ color: "red" }}>{attribute}</Text>;
      // console.log('render this bonus', attribute);
    }
  };

  function renderObtainedBy(obtained_by) {
    let obtained_by_html = [];
    obtained_by_html.push(
      <Text style={styles.subheader} key={-1}>
        Obtained By
      </Text>
    );

    Object.keys(obtained_by).map((object, index) => {
      if (obtained_by[object] instanceof Array) {
        obtained_by_html.push(
          <Text style={styles.content} key={object + index}>
            {object}:
          </Text>
        );
        obtained_by[object].forEach((item, j) => {
          obtained_by_html.push(
            <Text style={styles.content} key={j}>
              {item}
            </Text>
          );
        });
      } else {
        obtained_by_html.push(
          <Text style={styles.content} key={index}>
            {object}: {obtained_by[object]}
          </Text>
        );
      }
    });
    return obtained_by_html;
  }

  function renderExtraInfo(item) {
    return (
      <View>
        <Text style={styles.subheader}>Extra Info</Text>
        <Text style={styles.content}>Pvp Rank: {item.PvpRank}</Text>
        <Text style={styles.content}>
          is Tradeable: {item.IsTradeable.toString()}
        </Text>
        <Text style={styles.content}>
          is Auctionable: {item.IsAuctionable.toString()}
        </Text>
        <Text style={styles.content}>
          is Retired: {item.IsRetired.toString()}
        </Text>
      </View>
    );
  }

  function renderEquipmentSet(equipment_set) {
    if (!equipment_set) {
      return (
        <View>
          <Text style={styles.subheader}>Equipment Set</Text>
          <Text style={styles.content}>No items in set!</Text>
        </View>
      );
    }

    let additional_equipment_html = [];

    Object.keys(equipment_set).map((object) => {
      additional_equipment_html.push(
        <Text style={styles.content} key={object}>
          {object}
        </Text>
      );
      equipment_set[object].forEach((item, index) => {
        additional_equipment_html.push(
          <Text style={styles.content} key={index}>
            {item}
          </Text>
        );
      });
    });

    return additional_equipment_html;
  }

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
      case "Any":
        return (
          <Image
            source={require("../../assets/Assets/SpellIcons/GlobalIcon.gif")}
            style={styles.img}
          />
        );
    }
  };

  const getTypeImg = (type) => {
    switch (type) {
      case "Hat":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/haticon.gif")}
            style={styles.img}
          />
        );
      case "Robe":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/robeicon.gif")}
            style={styles.img}
          />
        );
      case "Boots":
        return (
          <Image
            source={require("../../assets/Assets/GearIcons/bootsicon.gif")}
            style={styles.img}
          />
        );
    }
  };

  return (
    <View style={styles.item}>
      <FontAwesome.Button
        style={styles.btnStyle}
        name="chevron-left"
        onPress={() => nextPage(-1)}
        backgroundColor="#6b2525"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{item.Name}</Text>

        <View style={styles.inlinesep}>
          {getTypeImg(item.Type)}
          <Text style={styles.subheader}>Level: {item.LevelRequirement}</Text>
          {getSchoolImg(item.School)}
        </View>

        {item.PvpRank !== "None" && <Text>Pvp Rank: {item.PvpRank}</Text>}
        {renderStats(item)}

        {props.addToWizard && (
          <Button
            title="add to wizard"
            color="#6b2525"
            onPress={() => props.addToWizard(item)}
          />
        )}
      </View>
      <FontAwesome.Button
        style={styles.btnStyle}
        name="chevron-right"
        onPress={() => nextPage(1)}
        backgroundColor="#6b2525"
      />
    </View>
  );
}

export default Items;

const styles = StyleSheet.create({
  header: {
    fontSize: 23,
    textAlign: "center",
    margin: 5,
  },
  subheader: {
    fontSize: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "#d6c591",
    elevation: 1,
  },
  btnStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    textAlign: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  inlinesep: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inlineto: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  inlineto2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  smallimg: {
    // flex: 1,
    width: 20,
    height: 20,
    resizeMode: "center",
  },
  smallerimg: {
    // flex: 1,
    width: 10,
    height: 10,
    resizeMode: "center",
  },
});
