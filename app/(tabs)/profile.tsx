import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

// ✅ Styled components for Tailwind compatibility
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ProfileScreen = () => {
  const firstName = 'Emily';
  const buddies = 21;
  const activitiesJoined = 6;
  const classes = ['EN1', 'PHY11', 'MATH34', 'CS11'];
  const interests = ['Gym', 'Photography', 'Economics', 'Food'];
  const gradYear = 2028;

  const avatarUrl = 'https://api.dicebear.com/9.x/adventurer/png?seed=Emily';

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="p-4">
        {/* Profile Avatar and Info */}
        <StyledView className="items-center mb-6">
          <StyledImage
            source={{ uri: avatarUrl }}
            className="w-32 h-32 rounded-full mb-4"
            resizeMode="cover"
          />
          <StyledText className="text-3xl font-bold">Hi {firstName}</StyledText>
          <StyledText className="text-xl text-gray-600">Class of {gradYear}</StyledText>
          <StyledView className="flex-row space-x-4 mt-2">
            <StyledText className="text-gray-600">Buddies: {buddies}</StyledText>
            <StyledText className="text-gray-600">Activities Joined: {activitiesJoined}</StyledText>
          </StyledView>
        </StyledView>

        {/* Classes */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-semibold mb-2">Classes</StyledText>
          <StyledView className="flex-row flex-wrap">
            {classes.map((course, index) => (
              <StyledView
                key={index}
                className="bg-gray-500 rounded-full p-3 m-1 shadow-md"
              >
                <StyledText className="text-white text-sm">{course}</StyledText>
              </StyledView>
            ))}
          </StyledView>

          <StyledText className="text-lg font-semibold mt-4 mb-2">Interests</StyledText>
          <StyledView className="flex-row flex-wrap">
            {interests.map((interest, index) => (
              <StyledView
                key={index}
                className="bg-[#3B79BA] rounded-full p-3 m-1 shadow-md"
              >
                <StyledText className="text-white text-sm">{interest}</StyledText>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Upcoming Events */}
        <StyledView className="bg-gray-100 p-4 rounded-lg shadow-md">
          <StyledText className="text-xl font-bold mb-2">Upcoming Events</StyledText>
          <StyledText className="text-gray-600">
            No upcoming events at the moment.
          </StyledText>
        </StyledView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
