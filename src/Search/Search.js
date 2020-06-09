import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Picker, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as myFireStore from "../Firebase";
import Header from "../Components/Header";
import Items from "./Items";

function SearchScreen(props) {
  const currentUserId = myFireStore.FireAuth.currentUser
    ? myFireStore.getCurrentUserID()
    : null;
  const [wizards, setWizards] = useState([]);
  const [selectedWizard, setSelectedWizard] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [startAtDoc, setStartAtDoc] = useState(undefined);
  const [filter, setFilter] = useState();
  const [count, setCount] = useState(0);
  let scroll;

  const goToTop = () => {
    scroll.scrollTo({ x: 0, y: 0, animated: true });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (currentUserId !== null) {
      myFireStore
        .getAllWizardsForUser(currentUserId)
        .get()
        .then((query) => {
          if (isSubscribed) {
            let wizs = [];
            query.docs.forEach((doc) => {
              let addId = doc.data();
              addId.id = doc.id;
              wizs.push(addId);
            });
            setWizards(wizs);
            setSelectedWizard(wizs[0]);
          }
        })
        .catch((error) => {
          console.log("error in items get wizards", error);
        });
    }
    return () => (isSubscribed = false);
  }, []);

  let getWizardSelector = () => {
    if (wizards.length === 1) {
      return <Text>{selectedWizard.Name}</Text>;
    }

    let pickerItems = wizards.map((w, index) => {
      return <Picker.Item key={index} value={w} label={w.Name} />;
    });

    return (
      <Picker
        selectedValue={selectedWizard}
        style={{ height: 50, width: 300 }}
        onValueChange={(val) => {
          setSelectedWizard(val);
        }}
      >
        {pickerItems}
      </Picker>
    );
  };

  useEffect(() => {
    if (props.navigation.state.params !== undefined || filter !== undefined) {
      if(props.navigation.state.params !== undefined) {
        var data = props.navigation.state.params.filters;
        setFilter(props.navigation.state.params.filters);
      } else {
        var data = filter;
      }
      
      // console.log(data);
      let { type, where, orderBy } = data;
      let store = myFireStore.getItems(type);

      if (where) {
        if (where[0] instanceof Array) {
          for (let w of where) {
            store = store.where(...w);
          }
        } else {
          store = store.where(...where);
        }
      }

      if (orderBy) {
        store = store.orderBy(...orderBy);
      } else {
        store = store.orderBy("LevelRequirement", "desc");
      }

      if (startAtDoc) {
        store = store.startAfter(startAtDoc);
      }

      store
        .limit(5)
        .get()
        .then((query) => {
          let i = [];
          query.docs.forEach((doc, index) => {
            let temp = doc.data();
            temp.id = doc.id;
            i.push(temp);
            if (index === query.docs.length - 1) {
              setStartAtDoc(doc);
            }
          });
          setItems(i);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error in search: ", error);
        });
    }
  }, [count]);

  function addItemToWizard(item) {
    myFireStore.addEquipmentToWizard(currentUserId, selectedWizard.id, item);
  }

  function displayItems() {
    let itemshtml = [];
    if (wizards.length > 0) {
      itemshtml = items.map((item) => (
        <Items key={item.id} getItems={item} addToWizard={addItemToWizard} />
      ));
    } else {
      itemshtml = items.map((item) => (
        <Items key={item.id} getItems={item} />
      ));
    }
    return (
      <>
        {itemshtml}
        <Button
          title={`load page ${count}`}
          color="#6b2525"
          onPress={() => {

            goToTop();
            setCount(count + 1);
          }}
        />
      </>
    );
  }

  return (
    <View style={{ backgroundColor: "#f0e2a6", height: "100%" }}>
      <Header text="Search Screen" />

      <MaterialIcons.Button
        onPress={() => props.navigation.navigate("FilterModal")}
        name="filter-list"
        backgroundColor="#6b2525"
      >
        Filter
      </MaterialIcons.Button>

      {wizards.length !== 0 && getWizardSelector()}

      <ScrollView
        ref={(c) => {
          scroll = c;
        }}
      >
        {isLoading && <Text>Loading...</Text>}
        {displayItems()}
      </ScrollView>
    </View>
  );
}

export default SearchScreen;
