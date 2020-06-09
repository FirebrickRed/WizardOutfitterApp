import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as myFireStore from '../Firebase';

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const signUp = () => {
    if(passwordOne !== passwordTwo) {
      setError('Passwords need to match');
    } else if(username.trim() !== ''){
      myFireStore.createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log('authUser', authUser);
          return myFireStore.addSingleUser(authUser.user.uid, {username, email});
        })
        .then(() => {
          props.navigation.navigate('Main');
        })
        .catch(error => setError(error.message));
    } else {
      setError('Please add a Username');
    }
  }

  return (
    <View style={{ height: '100%', backgroundColor: '#f0e2a6' }}>
      <Text>Sign Up!</Text>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        value={email}
        autoCapitalize="none"
        autoCompleteType="email"
      ></TextInput>
      <TextInput
        placeholder={"Username"}
        onChangeText={(username) => setUsername(username)}
        value={username}
      ></TextInput>
      <TextInput
        placeholder={"Password"}
        onChangeText={(password) => setPasswordOne(password)}
        value={passwordOne}
        secureTextEntry
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        placeholder={"Confirm Password"}
        onChangeText={(password) => setPasswordTwo(password)}
        value={passwordTwo}
        secureTextEntry
        autoCapitalize="none"
      ></TextInput>
      <Button onPress={() => signUp()} title="Sign Up" />
      <Button
        title="Already have an account? Log in."
        onPress={() => props.navigation.navigate("Login")}
      />
    </View>
  );
}

export default SignUp;
