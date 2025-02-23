import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp"

interface AuthScreenProps {
  setLoggedIn: (value: string) => void;
  setUserId: (id: string) => void;
}

export default function AuthScreen(props: AuthScreenProps) {
  const {setLoggedIn, setUserId} = props;
  const [activeTab, setActiveTab] = useState("login");

  console.log("Hello from AuthScreen");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center">
          {/* Logo and Welcome Text
          <View className="flex-1 justify-center items-center">
            <Image 
              source={require("../assets/images/jumbuddylogo.png")} 
              className="w-32 h-32" 
              resizeMode="contain"
            />
          </View> */}
          <View className="mb-8">
            <Text className="text-2xl font-bold">
              Welcome to <Text className="text-blue-600">JumBuddy</Text>
            </Text>
          </View>
          {/* Tabs for Login and Sign Up */}
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
          {/* Form Content */}
          <View className="w-full px-4">
            {activeTab == "login" ? (
              <Login setLoggedIn={setLoggedIn} setUserId={setUserId} />
            ) : (
              <SignUp setLoggedIn={setLoggedIn} setUserId={setUserId} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
