import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const FriendsScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="bg-white flex-1 p-4">
      <StyledView className="flex-1 bg-white px-4">
        {/* Header */}
        <StyledView className="flex-row justify-between items-center py-4">
          <Feather name="menu" size={24} color="black" />
          <StyledText className="text-lg font-bold text-blue-600">friends</StyledText>
          <Feather name="bell" size={24} color="black" />
        </StyledView>

        {/* Jumbuddies Section */}
        <StyledView className="mt-5">
          <StyledText className="text-base font-semibold mb-3">jumbuddies:</StyledText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(10)].map((_, index) => (
              <StyledView
                key={index}
                className="w-14 h-14 rounded-full bg-gray-200 mr-3"
              />
            ))}
          </ScrollView>
        </StyledView>

        {/* Activity Feed Header */}
        <StyledView className="mt-6">
          <StyledText className="text-base font-semibold">activity feed:</StyledText>
        </StyledView>
      </StyledView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsScreen; // ✅ Make sure this is here
