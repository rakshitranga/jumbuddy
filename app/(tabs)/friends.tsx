import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import AirtableService from "../../airtable";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { User } from '@/components/mapAirtableUser';

const FriendsScreen = () => {
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      const userId = await AsyncStorage.getItem("user_id");
      const data = await AirtableService.getUserById(userId);
      console.log(userId);
      console.log(data[0].fields.friendids);
      const friends = await AirtableService.getUsersByFriendsIds(data[0].fields.friendids);
      console.log(friends.records);
      setUserFriends(friends.records);
    }
    fetchUserFriends(); 

  }, []);


  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <Feather name="menu" size={24} color="black" />
          <Text className="text-lg font-bold text-blue-600">Friends</Text>
          <Feather name="bell" size={24} color="black" />
        </View>

        {/* Jumbuddies Section */}
        <View className="mt-5">
          <Text className="text-base font-semibold mb-3">Jumbuddies:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(10)].map((_, index) => (
              <View
                key={index}
                className="w-14 h-14 rounded-full bg-gray-200 mr-3"
              />
            ))}
          </ScrollView>
        </View>

        {/* Activity Feed Header */}
        <View className="mt-6">
          <Text className="text-base font-semibold">Activity feed:</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsScreen; 
