import React from "react";
import { View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SearchScreen from "./Search";
import FilterModal from "./Filter";

const SearchNavigation = createSwitchNavigator(
  {
    SearchScreen,
    FilterModal,
  },
  {
    initialRouteName: "SearchScreen",
  }
);

const SearchContainer = createAppContainer(SearchNavigation);

function SearchNavigationScreen() {
  return (
    <View>
      <SearchContainer />
    </View>
  );
}

export default SearchNavigationScreen;

// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, StyleSheet, Picker, Button } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useScrollToTop } from '@react-navigation/native';
// import { MaterialIcons } from "@expo/vector-icons";
// import * as myFireStore from "../Firebase";
// import Header from "../Components/Header";
// import Items from "./Items";

// function SearchScreen({ navigation }) {
//   const currentUserId = myFireStore.FireAuth.currentUser
//     ? myFireStore.getCurrentUserID()
//     : null;
//   const [wizards, setWizards] = useState([]);
//   const [selectedWizard, setSelectedWizard] = useState({});
//   const [isLoading, setLoading] = useState(true);
//   const [items, setItems] = useState([]);
//   const [startAtDoc, setStartAtDoc] = useState(undefined);
//   const [filter, setFilter] = useState(undefined);
//   const ref = useRef(null);
//   let scroll;

//   const goToTop = () => {
//     scroll.scrollTo({x: 0, y: 0, animated: true});
//  }

//   useEffect(() => {
//     let isSubscribed = true;
//     if (currentUserId !== null) {
//       myFireStore
//         .getAllWizardsForUser(currentUserId)
//         .get()
//         .then((query) => {
//           if (isSubscribed) {
//             let wizs = [];
//             query.docs.forEach((doc) => {
//               let addId = doc.data();
//               addId.id = doc.id;
//               wizs.push(addId);
//             });
//             setWizards(wizs);
//             setSelectedWizard(wizs[0]);
//           }
//         })
//         .catch((error) => {
//           console.log("error in items get wizards", error);
//         });
//     }
//     return () => (isSubscribed = false);
//   }, []);

//   let getWizardSelector = () => {
//     if (wizards.length === 1) {
//       return <Text>{selectedWizard.Name}</Text>;
//     }

//     let pickerItems = wizards.map((w, index) => {
//       return <Picker.Item key={index} value={w} label={w.Name} />;
//     });

//     return (
//       <Picker
//         selectedValue={selectedWizard}
//         style={{ height: 50, width: 300 }}
//         onValueChange={(val) => {
//           setSelectedWizard(val);
//         }}
//       >
//         {pickerItems}
//       </Picker>
//     );
//   };

//   function filtersToApply(e) {
//     setLoading(true);
//     // let { type, where, orderBy};
//     if (e === undefined) {
//       var { type, where, orderBy } = filter;
//     } else {
//       var { type, where, orderBy } = e;
//       setFilter(e);
//     }
//     let store = myFireStore.getItems(type);

//     if (where) {
//       if (where[0] instanceof Array) {
//         for (let w of where) {
//           store = store.where(...w);
//         }
//       } else {
//         store = store.where(...where);
//       }
//     }

//     if (orderBy) {
//       store = store.orderBy(...orderBy);
//     } else {
//       store = store.orderBy("LevelRequirement", "desc");
//     }

//     if (startAtDoc) {
//       store = store.startAfter(startAtDoc);
//     }

//     store
//       .limit(5)
//       .get()
//       .then((query) => {
//         let i = [];
//         query.docs.forEach((doc, index) => {
//           let temp = doc.data();
//           temp.id = doc.id;
//           i.push(temp);
//           if (index === query.docs.length - 1) {
//             setStartAtDoc(doc);
//           }
//         });
//         setItems(i);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("error in search: ", error);
//       });
//   }

//   function addItemToWizard(item) {
//     myFireStore.addEquipmentToWizard(currentUserId, selectedWizard.id, item);
//   }

//   function displayItems() {
//     let itemshtml = [];
//     if (wizards.length > 0) {
//       itemshtml = items.map((item, index) => (
//         <Items key={index} getItems={item} addToWizard={addItemToWizard} />
//       ));
//     } else {
//       itemshtml = items.map((item, index) => (
//         <Items key={index} getItems={item} />
//       ));
//     }
//     return (
//       <>
//         {itemshtml}
//         <Button
//           title="load more"
//           color="#6b2525"
//           onPress={() => {
//             goToTop()
//             filtersToApply();
//           }}
//         />
//       </>
//     );
//   }

//   return (
//     <View style={{ backgroundColor: "#f0e2a6", height: "100%" }}>
//       <Header text="Search Screen" />
//       <MaterialIcons.Button
//         onPress={() =>
//           navigation.navigate("filter", (getFilters = { filtersToApply }))
//         }
//         name="filter-list"
//         backgroundColor="#6b2525"
//       >
//         Filter
//       </MaterialIcons.Button>

//       {wizards.length !== 0 && getWizardSelector()}

//       <ScrollView ref={(c) => {scroll = c}}>
//         {isLoading && <Text>Loading...</Text>}
//         {displayItems()}
//       </ScrollView>
//     </View>
//   );
// }

// export default SearchScreen;
