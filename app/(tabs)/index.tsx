import React, {useState, useEffect} from "react";
import { Text, Image, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import '../../global.css';
import EventCard from "../../components/EventCard";
import Login from "../../components/Login";
import AirtableService from "../../airtable";
import { User, mapAirtableUser } from "@/components/mapAirtableUser";

export default function Index() {
  // const imagePlaceholder = require("../../assets/images/imagePlaceholder.png");
  const firstName = "Emily";
  const [loggedIn, setLoggedIn] = useState("false");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null); 

  // checks global state and updates local state 
  const retrieveLoggedInInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('logged_in');
      setLoggedIn(value);
      return value; 

    } catch(e) {
      return false;
    }
  }

  useEffect(() => {
    retrieveLoggedInInfo(); 

    if (loggedIn == "true" && userId) {
      const fetchUser = async () => {
        try {
          const data = await AirtableService.getUserById(userId);
          if (data && data.length > 0) {
            const userData = mapAirtableUser(data[0]);
            console.log(userData);
            setUser(userData);
          } else {
            console.log("No user found");
          }
        } catch (e) {
          console.error("Error fetching user:", e);
        }
      }
      fetchUser(); 
    }
  }, [loggedIn, userId]);

  const logOut = () => {
    setLoggedIn("false");
    AsyncStorage.setItem('logged_in', 'false');
  }

  return (
    loggedIn == "true" && user ? (
      <SafeAreaView className="bg-white flex-1">
        <ScrollView className="p-4">
        <View>
        {/* image & welcome */}
        <View className="w-full bg-blue-200 p-6 rounded-b-3xl items-center flex flex-row items-center space-x-3">
        {/* <Image 
          source = {imagePlaceholder}
          className = "w-24 h-24 rounded-full"
          ></Image> */}
        <View>
          <Text className="text-xlg font-bold text-gray-900">Hi {user.name}</Text>
          <Text className="text-sm text-gray-600">Make a new jumbuddy today!</Text>
        </View>
      </View>
      {/* Upcoming Events Container */}
      <View className="bg-gray-100 p-4 rounded-lg shadow-md">
            <Text className="text-xl font-bold mb-2">Upcoming Events</Text>
            <EventCard
              date = "09"
              month = "March"
              time = "10:00am - 14:00pm"
              title="hot pot night!"
              location="happy lamb, chinatown"
            ></EventCard>
            {/* <Text className="text-gray-600">
              No upcoming events at the moment.
            </Text> */}
          </View>
      </View>
      <TouchableOpacity className="bg-[#3B79BA] text-white">
          <Text className="text-white" onPress={(logOut)}>Log Out</Text>
      </TouchableOpacity> 
      </ScrollView>
      </SafeAreaView> ) : (
      <SafeAreaView>
        <View>
          <Login setLoggedIn={setLoggedIn} setUserId={setUserId}></Login>
        </View>
      </SafeAreaView>
      )
  );
}
