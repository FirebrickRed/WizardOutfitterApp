import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as myFireStore from '../Firebase';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = () => {
    console.log("log in!!!");
    myFireStore.signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate('Main'))
      .catch(error => setError(error.message));
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#f0e2a6' }}>
      <Text>Login</Text>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TextInput
        placeholder={"Email"}
        onChangeText={(email) => setEmail(email)}
        value={email}
        autoCapitalize='none'
        autoCompleteType='email'
      ></TextInput>
      <TextInput
        placeholder={"Password"}
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry
      ></TextInput>
      <Button onPress={() => login()} title="login" />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => props.navigation.navigate("SignUp")}
      />
    </View>
  );
}

export default Login;
