import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PersonCard from '@/components/PersonCard';
import '../../global.css';

// replace with database info later 
const users = [
  {
    profileImage: 'https://example.com/image1.jpg',
    name: 'Alice',
    gradYear: '2027',
    major: 'Science',
    classes: ['Math', 'English'],
    interests: ['Coding', 'Reading'],
    lookingFor: ['Study Partner'],
    bio: 'Open to joining a science club and study groups.',
  },
  {
    profileImage: 'https://example.com/image2.jpg',
    name: 'Bob',
    gradYear: '2028',
    major: 'History',
    classes: ['History', 'Art'],
    interests: ['Photography', 'Debate'],
    lookingFor: ['Discussion Partner'],
    bio: 'Looking to share ideas on historical topics.',
  },
];

export default function JumBuddyScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="bg-white flex-1 p-4">
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

