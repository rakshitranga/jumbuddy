import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AirtableService from "../airtable";
import { useRouter } from "expo-router";

interface loginProps {
    setLoggedIn: (loggedin: string) => void;
    setUserId: (userId: string) => void;
}

export default function SignUp(props: loginProps) {
    const {setLoggedIn, setUserId} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter(); 

    const handleSignUp = async (email:string, username: string, password: string) => {
        try {
            // making new user 
            const fields = {
                'email': email, 
                'username': username,
                'password': password,
                'avatarlink': 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emily'
            }
            // returns fields, including userId
            const result = await AirtableService.addRecord(fields);
            const userId = result.records[0].fields.id.toString();
            console.log(userId);
            
            setUserId(userId); 
            setLoggedIn("true");
            await AsyncStorage.setItem("unique_id", result.records[0].id);
            await AsyncStorage.setItem("logged_in", "true");
            await AsyncStorage.setItem("user_id", userId);

            router.replace('/EditProfilePage');


        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <View>
            <View className="mb-6"> 
              <Text className="text-lg font-semibold mb-2">Tufts email: </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
            <View className="mb-6"> 
              <Text className="text-lg font-semibold mb-2">Username: </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Create your username"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>

            <View className="mb-6"> 
              <Text className="text-lg font-semibold mb-2">Password: </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Set your password"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
            <TouchableOpacity 
                onPress={() => {handleSignUp(email, username, password)}}
                className="py-4 rounded-lg items-center"
                style={{ backgroundColor: "#0057D2"}}
            >
                <Text className="text-white text-lg font-bold">Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}