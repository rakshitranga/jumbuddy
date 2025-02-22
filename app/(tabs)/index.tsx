import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import '../../global.css';

export default function Index() {
  return (
    <View className='flex-row items-center space-x-3 p-3'>
      <Image ></Image>
      <View>
        <Text>Hi, Emily</Text>
        <Text>Make a new jumbuddy today!</Text>
      </View>
      <Text className='text-lg font-medium text-black'>Welcome to Tailwind</Text>
    </View>
  );
}
