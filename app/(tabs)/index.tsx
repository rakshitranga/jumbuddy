import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css';
import EventCard from "../../components/EventCard";
import Login from "../../components/Login";
import SignUp from "@/components/SignUp";
import AirtableService from "../../airtable";
import jumbuddylogo from "@/assets/images/jumbuddylogo.png";
import { User, mapAirtableUser } from "@/components/mapAirtableUser";
import { format, addDays } from "date-fns";

const screenHeight = Dimensions.get("window").height;

export default function Index() {
  const [loggedIn, setLoggedIn] = useState("false");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [dates, setDates] = useState<string[]>([]);

  // auth screen
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const today = new Date();
    const nextDays = Array.from({ length: 5 }, (_, i) => format(addDays(today, i), "dd MMM"));
    setDates(nextDays);
  }, []);

  const retrieveLoggedInInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('logged_in');
      setLoggedIn(value ?? "");
      return value;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    retrieveLoggedInInfo();
    if (loggedIn == "true" && userId) {
      const fetchUser = async () => {
        try {
          const data = await AirtableService.getUserById(userId);
          if (data && data.length > 0) {
            const userData = mapAirtableUser(data[0]);
            setUser(userData);
          } else {
            console.log("No user found");
          }
        } catch (e) {
          console.error("Error fetching user:", e);
        }
      };
      fetchUser();
    }
  }, [loggedIn, userId]);

  const logOut = () => {
    setLoggedIn("false");
    AsyncStorage.setItem('logged_in', 'false');
  }; 

  return loggedIn == "true" && user ? (
    <View className="flex-1 bg-white">
      {/* Blue Background - Fixed at top, outside scrollable/safe area */}
      <View className="absolute top-0 left-0 right-0 bg-blue-200 rounded-b-3xl" style={{ height: screenHeight * 0.2 }} />

      {/* Scrollable content from Hi {user.name} onwards */}
      <SafeAreaView className="flex-1">
        <ScrollView className="px-4">
          {/* Welcome Text */}
          <View className="mt-8 mb-4 items-center">
            <Text className="text-xl font-bold text-gray-900">Hi {user.name}</Text>
            <Text className="text-sm text-gray-600">Make a new jumbuddy today!</Text>
            <TouchableOpacity onPress={logOut}>
              <Text className="text-gray-500 italic text-sm mt-2">Log out</Text>
            </TouchableOpacity>
          </View>

          {/* Dates Row */}
          <View className="flex-row justify-around py-4 border-b border-gray-300">
            {dates.map((date, index) => (
              <Text key={index} className="text-lg font-semibold text-gray-700">
                {date}
              </Text>
            ))}
          </View>

          {/* Upcoming Events */}
          <View className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
            <Text className="text-xl font-bold mb-4">Upcoming Events</Text>
            <EventCard
              date="09"
              month="March"
              time="10:00am - 14:00pm"
              title="hot pot night!"
              location="happy lamb, chinatown"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-white">
    {/* Fixed Header */}
    <View className="px-2">
      <View className="justify-center items-center">
        <View className="justify-center items-center mt-3">
          <Image 
            source={jumbuddylogo} 
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>
        <View className="m-2"> 
          <Text className="text-3xl font-bold">
            Welcome to <Text className="text-blue-600">JumBuddy</Text>
          </Text>
        </View>
        <View className="flex-row space-x-8 mb-4">
          <TouchableOpacity onPress={() => setActiveTab("login")}>
            <Text className={`text-xl ${activeTab === "login" ? "text-blue-600" : "text-black"}`}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("signup")}>
            <Text className={`text-xl ${activeTab === "signup" ? "text-blue-600" : "text-black"}`}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    {/* Scrollable Form Content */}
    <ScrollView className="flex-1 px-4">
      <View className="pb-40">
      {activeTab == "login" ? (
        <Login setLoggedIn={setLoggedIn} setUserId={setUserId} />
      ) : (
        <SignUp setLoggedIn={setLoggedIn} setUserId={setUserId} />
      )}
      </View>
    </ScrollView>
  </SafeAreaView>

  );
}
