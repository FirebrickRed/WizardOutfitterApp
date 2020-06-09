import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./src/Home";
import SearchNavigationScreen from "./src/Search/index";
import WrappedWizardsScreen from "./src/Wizards";
import UserProvider from "./src/Providers/UserProvider";

const Tab = createBottomTabNavigator();

function App() {
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Wizards") {
                iconName = "user";
              } else if (route.name === "Search") {
                iconName = "search";
              }

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#6b2525",
            inactiveTintColor: "#9a4444",
            style: {
              backgroundColor: "#d6c591",
              borderTopColor: "#9a4444",
              borderTopWidth: 1,
              borderStyle: "solid",
            },
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchNavigationScreen} />
          <Tab.Screen name="Wizards" component={WrappedWizardsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
