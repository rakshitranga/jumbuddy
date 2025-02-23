import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import PersonCard from '@/components/PersonCard';
import { User, mapAirtableUser } from "@/components/mapAirtable";
import AirtableService from "../../airtable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css';

export default function JumBuddyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const fetchJumbuddies = async () => {
      const userId = await AsyncStorage.getItem("user_id");
      const data = await AirtableService.getUserById(userId);
      const formula = data[0].fields.friendids + "," + userId;
      const allUsers = await AirtableService.getUsersExceptFriendsIds(formula);

      // converting records to User objects 
      let allUsersArr: User[] = []; 
      for (let i in allUsers.records) {
          let user = mapAirtableUser(allUsers.records[i]);
          allUsersArr.push(user); 
      }

      setUsers(allUsersArr);
      console.log(users);
    }
    fetchJumbuddies(); 
  }, []);

  
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="bg-white flex-1 p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <Feather name="menu" size={24} color="black" />
            <Text className="text-lg font-bold text-blue-600">Find JumBuddies</Text>
          <Feather name="bell" size={24} color="black" />
        </View>

        {/* search bar */}
          <View className="flex-row items-center bg-white rounded-full border border-gray-300 px-3 py-2 shadow-sm">
            <Ionicons name="search" size={20} color="gray" className="mx-2" />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Search for a Buddy!"
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={24} color="#3B82F6" className="mx-2" />
            </TouchableOpacity>
          </View>

        {/* map of person cards */}
        <View>
        {users.map((user, index) => (
          <PersonCard key={index} user={user} />
        ))}
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}

