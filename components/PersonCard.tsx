import React from 'react';
import { View, Text, Image } from 'react-native';

// update according to database
interface User {
  profileImage: string;
  name: string;
  gradYear: string;
  major: string;
  classes: string[];
  interests: string[];
  lookingFor: string[];
  bio: string;
}

interface PersonCardProps {
  user: User;
}

export default function PersonCard({ user }: PersonCardProps) {
  return (
    <View className="bg-white rounded-lg shadow p-4 my-4">
      {/* profile photo and name */}
      <View className="flex-row items-center">
        <Image
          src={user.profileImage}
          className="w-20 h-20 rounded-full"
          resizeMode="cover"
        />
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold">{user.name}</Text>
          <Text className="text-gray-600"> {user.major}</Text>
          <Text className="text-gray-600"> Class of {user.gradYear}</Text>
        </View>
      </View>

      {/* classes, interests, looking for */}
      <View className="mt-4">
        {/* Classes */}
        <Text className="text-lg font-semibold mb-1">Classes</Text>
        <View className="flex-row flex-wrap">
          {user.classes.map((course, idx) => (
            <View
              key={`class-${idx}`}
              className="bg-[#3B79BA] rounded-full px-3 py-1 m-1 shadow"
            >
              <Text className="text-white text-sm">{course}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <Text className="text-lg font-semibold mt-4 mb-1">Interests</Text>
        <View className="flex-row flex-wrap">
          {user.interests.map((interest, idx) => (
            <View
              key={`interest-${idx}`}
              className="bg-gray-500 rounded-full px-3 py-1 m-1 shadow"
            >
              <Text className="text-white text-sm">{interest}</Text>
            </View>
          ))}
        </View>

        {/* Looking For */}
        <Text className="text-lg font-semibold mt-4 mb-1">Looking For</Text>
        <View className="flex-row flex-wrap">
          {user.lookingFor.map((item, idx) => (
            <View
              key={`looking-${idx}`}
              className="bg-gray-500 rounded-full px-3 py-1 m-1 shadow"
            >
              <Text className="text-white text-sm">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Description Section */}
      <View className="mt-4">
        <Text className="text-lg font-semibold">Bio:</Text>
        <Text className="text-gray-700 mt-1">{user.bio}</Text>
      </View>
    </View>
  );
}
