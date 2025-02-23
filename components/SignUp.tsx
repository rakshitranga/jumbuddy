import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AirtableService from "../airtable";

interface loginProps {
    setLoggedIn: (loggedin: string) => void;
    setUserId: (userId: string) => void;
}

export default function SignUp(props: loginProps) {
    const {setLoggedIn, setUserId} = props;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSignUp = async (name: string, email:string, username: string, password: string) => {
        try {
            // making new user 
            const fields = {
                'name': name, 
                'email': email, 
                'username': username,
                'password': password
            }
            const result = await AirtableService.addRecord(fields);
            console.log(result);

        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <View>
            <Text className="text-white text-bold text-xl">Sign up</Text>
            <TextInput
                className="text-black p-3 bg-white"
                placeholder="Name (First Last)"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className="text-black p-3 bg-white"
                placeholder="Username"
                value={username}
                onChangeText={setEmail}
            />
            <TextInput
                className="text-black p-3 bg-white"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                className="text-black p-3 bg-white"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => {handleSignUp(name, email, username, password)}}>
                <Text className="text-white bg-blue-200 p-3">Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}