import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AirtableService from "../airtable";

interface loginProps {
    setLoggedIn: (loggedin: string) => void;
    setUserId: (userId: string) => void;
}

export default function Login(props: loginProps) {
    const {setLoggedIn, setUserId} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [loggedIn, setLoggedIn] = useState(false);
    const [selectedTab, setSelectedTab] = useState("login");

    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await AirtableService.getUserByNameAndPassword(username, password);
            
            // Check if data and data.fields exist
            if (data && data[0].fields && data[0].fields.id) {
              setLoggedIn("true");
              await AsyncStorage.setItem("logged_in", "true");
              await AsyncStorage.setItem("user_id", data[0].fields.id);
              setUserId(data[0].fields.id);
            } else {
              console.log("Unexpected data structure:", data);
            }
        } catch (error) {
        console.error("Login error:", error);
        }
    };

    return (
        <View>
            <Text className="text-white text-bold text-xl">Login</Text>
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
            <TouchableOpacity onPress={() => {handleLogin(username, password)}}>
                <Text className="text-white bg-blue-200 p-3">Login</Text>
            </TouchableOpacity>
        </View>
    )
}