import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css';
import EventCard from "../../components/EventCard";
import Login from "../../components/Login";
import AirtableService from "../../airtable";
import { User, Event, mapAirtableEvent, mapAirtableUser } from "@/components/mapAirtable";
import { format, addDays } from "date-fns";
import { Feather } from "@expo/vector-icons"; 
//import logo from "../assets/images/theLogo.png";
import SignUp from "@/components/SignUp";
import PostEvent from "@/components/PostEvent";

const screenHeight = Dimensions.get("window").height;
// const logo = require("../../assets/images/theLogo.png");

export default function Index() {
  const [loggedIn, setLoggedIn] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[] | []>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [addEventVisible, setAddEventVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // auth screen
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const today = new Date();
    const nextDays = Array.from({ length: 5 }, (_, i) => format(addDays(today, i), "dd MMM"));
    setDates(nextDays);

    const retrieveLoggedInInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('logged_in');
        setLoggedIn(value);
        return value;
      } catch (e) {
        return false;
      }
    };

    retrieveLoggedInInfo();
  }, []);

  const handleAddEvent = () => {
    setAddEventVisible(true);
  }

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
    if (loggedIn === "true" && userId) {
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

      const fetchEvents = async () => {
        try {
          const data = await AirtableService.getActivitiesExceptMine(userId);
          if (data && data.length > 0) {
            const eventData = data;
            
            let allEventsArr: Event[] = []; 
            for (let i in eventData) {
                let event = mapAirtableEvent(data[i].fields);
                allEventsArr.push(event); 
            }
            setEvents(allEventsArr); 
          } else {
            console.log("No events found");
          }
        } catch (e) {
          console.error("Error fetching events:", e);
        }
      }
      fetchEvents();
    }
  }, [loggedIn, userId]);

  const logOut = () => {
    setLoggedIn("false");
    AsyncStorage.setItem('logged_in', 'false');
  };

  return (
    loggedIn == "true" && user ? (
    <View className="flex-1 bg-white">
      {/* Blue Background - Fixed at top */}
      <View className="absolute top-0 left-0 right-0 bg-blue-200 rounded-b-3xl" style={{ height: screenHeight * 0.3 }} />

      <SafeAreaView className="flex-1">
        {/* Header with Logout Icon */}
        <View className="flex-row items-center justify-between px-4 mt-4">
    {/* Avatar - Centered */}
  <View className="flex-1 items-center">
    {user && user.name ? (
      <Image
        source={{ uri: user.avatarlink }}
        className="w-20 h-20 mb-2 rounded-full border-2 border-white shadow-lg ml-4"
        resizeMode="cover"
      />
    ) : (
      <Text className="text-gray-600">Loading avatar...</Text>
    )}
  </View>

  {/* Logout Button - Aligned Right */}
  <TouchableOpacity onPress={logOut} className="ml-auto items-center">
    <Feather name="log-out" size={24} color="#4B5563" />
    <Text className="text-gray-500 text-xs mt-1">Log out</Text>
  </TouchableOpacity>
</View>


  {/* Welcome Text */}
  <View className="mt-4 mb-10 items-center">
    <Text className="text-xl font-bold text-gray-900">Hi, {user.name}</Text>
    <Text className="text-sm text-gray-600">Make a new jumbuddy today!</Text>
  </View>

  {/* Dates Row */}
  <View className="flex-row justify-around py-4 border-b border-gray-300">
  {dates.map((date, index) => {
  const day = format(addDays(new Date(), index), "EEE").toLowerCase(); // Get short weekday name
  const dayNumber = format(addDays(new Date(), index), "dd"); // Get day number
    return (
          <View key={index} className="items-center">
            <Text className={`text-sm font-semibold ${index === 0 ? "text-blue-500" : "text-gray-500"}`}>
              {day}
            </Text>
            <Text className={`text-2xl font-bold ${index === 0 ? "text-blue-600" : "text-black"}`}>
              {dayNumber}
            </Text>
          </View>
      )})};
    </View>


    <ScrollView className="px-4">
      {/* Upcoming Events */}
      <View className="pb-20">
      <View className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <Text className="text-xl font-bold mb-4">Upcoming Events</Text>
        {/* map of event cards */}
        <View>
        {events.map((event: Event, index) => (
          <View className="mt-2">
          <EventCard key={index} event={event} />
          </View>
        ))}
        </View>
      </View>
      
      <View className="flex-row items-center justify-center mt-6">
      <TouchableOpacity
        className="flex-row items-center justify-center mt-6"
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus-circle" size={20} color="#2563EB" />
        <Text className="text-blue-600 text-lg font-semibold ml-2">
          Add Event
        </Text>
      </TouchableOpacity>
      
      {/* Render the modal conditionally */}
      {modalVisible && (
        <PostEvent 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
      </View>
    </View>
      
    {/* </View> */}

    </ScrollView>
    </SafeAreaView>
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-white">
    {/* Fixed Header */}
    <View className="px-2">
      <View className="justify-center items-center">
        <View className="justify-center items-center mt-3">
        {/* <Image 
          source={logo} 
          className="w-40 h-40 rounded-full border border-gray-300 shadow-lg"
          resizeMode="cover" // Keeps the circle filled
          style={{ transform: [{ scale: 0.8 }] }} // Zooms out the image inside the circle
        /> */}
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
  ));

}