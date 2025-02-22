import React, {useState, useEffect} from "react";
import { Text, Image, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import '../../global.css';
import EventCard from "../../components/EventCard";
import Login from "../../components/Login";

export default function Index() {
  // const imagePlaceholder = require("../../assets/images/imagePlaceholder.png");
  const firstName = "Emily";

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("false");

  const retrieveLoggedInInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('logged_in')
      if(value !== null) {
        setLoggedIn(true);
      } else{
        setLoggedIn(false)
      }
    } catch(e) {
      return false;
    }
  }

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  retrieveLoggedInInfo();

  return (
    loggedIn ? (
      <SafeAreaView className="bg-white flex-1">
        <ScrollView className="bg-white flex-1 p-4">
        <View>
        {/* image & welcome */}
        <View className="w-full bg-blue-200 p-6 rounded-b-3xl items-center flex flex-row items-center space-x-3">
        {/* <Image 
          source = {imagePlaceholder}
          className = "w-24 h-24 rounded-full"
          ></Image> */}
        <View>
          <Text className="text-lg font-bold text-gray-900">Hi, {firstName}</Text>
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
      </ScrollView>
      </SafeAreaView> ) : (
      <SafeAreaView>
        <View>
          <Text className="text-white">Login</Text>
          <Login setLoggedIn={(setLoggedIn)} setUserId={(setUserId)}></Login>
        </View>
      </SafeAreaView>
      )
  );
}
