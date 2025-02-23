import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';

const FriendsScreen = () => {
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
