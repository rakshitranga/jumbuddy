import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

interface loginProps {
    setLoggedIn: (loggedin: boolean) => void;
    setUserId: (userId: string) => void;
}

export default function Login(props: loginProps) {
    const {setLoggedIn, setUserId} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        console.log(`Username
        : ${username}   Password: ${password}`); 
        setLoggedIn(true);
        AsyncStorage.setItem("logged_in", "true")
        setUserId("1234");
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}