import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as myFireStore from '../Firebase';
import ViewWizards from './ViewWizards';
import CreateWizard from './CreateWizard';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createSwitchNavigator(
  {
    ViewWizards,
    CreateWizard,
  },
  {
    initialRouteName: 'ViewWizards',
  }
);

const Main = createAppContainer(MainNavigator);

export default Main;

// function Main(props) {
//   const currentUserId = myFireStore.getCurrentUserID();
//   const [wizards, setWizards] = useState([]);

//   const signOut = () => {
//     myFireStore.signOut();
//     props.navigation.navigate('Login');
//   }

//   const createWizard = () => {
//     console.log('need to add this');
//   }

//   useEffect(() => {
//     console.log('in wizards', currentUserId);
//     myFireStore.getAllWizardsForUser(currentUserId)
//       .get()
//       .then(query => {
//         let wizards = [];
//         query.docs.forEach(doc => {
//           let addId = doc.data();
//           addId.id = doc.id;
//           wizards.push(addId);
//         });
//         console.log('wizards in wizards', wizards);
//         setWizards(wizards);
//       })
//       .catch(error => {
//         console.log('error in wizards', error);
//       })
//   }, []); 

//   return (
//     <View style={{ height: '100%', backgroundColor: '#f0e2a6' }}>
//       <Button title='sign out' onPress={() => signOut()} />
//       <Button title='Create New Wizard' onPress={() => createWizard()} />
//       {wizards.map((wizard, index) => (
//         <WizardView key={index} getWizards={wizard} />
//       ))}
//     </View>
//   )
// }

// export default Main;