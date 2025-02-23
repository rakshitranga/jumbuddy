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
    const [selectedTab, setSelectedTab] = useState("login");

    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await AirtableService.getUserByNameAndPassword(username, password);
            
            // Check if data and data.fields exist
            if (data && data[0].fields && data[0].fields.id) {
              setLoggedIn("true");
              await AsyncStorage.setItem("logged_in", "true");
              await AsyncStorage.setItem("user_id", data[0].fields.id.toString());
              setUserId(data[0].fields.id.toString());
            } else {
              console.log("Unexpected data structure:", data);
            }
        } catch (error) {
        console.error("Login error:", error);
        }
    };

    return (
        <View>
            <View className="mb-6"> 
              <Text className="text-lg font-semibold mb-2">Username: </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
            <View className="mb-6"> 
              <Text className="text-lg font-semibold mb-2">Password: </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
            <TouchableOpacity 
                onPress={() => {handleLogin(username, password)}}
                className="py-4 rounded-lg items-center"
                style={{ backgroundColor: "#0057D2"}}
            >
                <Text className="text-white text-lg font-bold">Login</Text>
            </TouchableOpacity>
        </View>
    )
}