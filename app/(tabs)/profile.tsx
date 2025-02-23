import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, mapAirtableUser } from "@/components/mapAirtableUser";
import AirtableService from "../../airtable";

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null); 

  //avatar customise scene
  const[avatarOptions, setAvatarOptions]= useState({
      seed: "Emily",
      backgroundColor: "ffffff", 
      eyes: "variant01", 
      mouth: "variant01", 
      accessories: "variant02"

  });

  const firstName = 'Emily';
  const lastName = "Teh";
  const buddies = 21;
  const activitiesJoined = 6;
  const classes = ['EN1', 'PHY11', 'MATH34', 'CS11'];
  const interests = ['Gym', 'Photography', 'Economics', 'Food'];
  const gradYear = 2028;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id"); 
        const data = await AirtableService.getUserById(userId);

        if (data && data.length > 0) {
          const userData = mapAirtableUser(data[0]);
          console.log(userData);
          setUser(userData);
        } else {
          console.log("No user found");
        }
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    }
    fetchUser(); 
  }, []);

  //function to update avatar options 
  
  const updateAvatarOption = (option: string, value: any) => {
    setAvatarOptions((prevOptions) => ({
      ...prevOptions, 
      [option]: value, 

    })); 
  };

  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=${avatarOptions.seed}&eyes=${avatarOptions.eyes}&mouth=${avatarOptions.mouth}&accessories=${avatarOptions.accessories}`;

  return (
    user ? (<SafeAreaView className="bg-white flex-1">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <Feather name="menu" size={24} color="black" />
            <Text className="text-lg font-bold text-blue-600"> Profile </Text>
          <Feather name="bell" size={24} color="black" />
        </View>

        {/* Profile Avatar and Info */}
        <View className="items-center mb-6 relative">
          {/*Avatar Image*/}
          <Image
            source = {{uri: avatarUrl}}
            className="w-32 h-32 mb-4 rounded-full"
            resizeMode="cover"
          />
          {/*Edit Avatar Button */}
          <TouchableOpacity className = "absolute right-0 bottom-4 bg-blue-500 p-2 rounded-full shadow-md">
            <Feather name = "edit-3" size ={18} color = "white" />
          </TouchableOpacity>
          
          <View>
            <Text className="text-3xl font-bold">{user.name}</Text>
            {/* TODO: put an edit symbol & link to edit profile page */}
          </View>
          <Text className="text-xl text-gray-600">Class of {user.gradyear}</Text>
          <View className="flex-row space-x-4 mt-2">
            <Text className="text-gray-600">Buddies: {buddies}</Text>
            <Text className="text-gray-600">Activities Joined: {activitiesJoined}</Text>
          </View>
        </View>

        {/* Avatar Customization */}
        <View className = "p-4 bg-gray-100 rounded-lg shadow-md">
          <Text className="text-lg font-bold mb-2">Customize Your Avatar</Text>
          {/* Eyes Customization */}
          <Text className = "text-md font semi-bold mt-2">Eyes</Text>
          <Picker
            selectedValue={avatarOptions.eyes}
            onValueChange={(value: any) => updateAvatarOption("eyes", value)}
            className="bg-white rounded-md"
          >
            <Picker.Item label="Variant 01" value="variant01" />
            <Picker.Item label="Variant 02" value="variant02" />
            <Picker.Item label="Variant 03" value="variant03" />
          </Picker>

          {/* Mouth Customization */}
          <Text className="text-md font-semibold mt-2">Mouth</Text>
          <Picker selectedValue={avatarOptions.mouth} onValueChange={(value) => updateAvatarOption("mouth", value)} className="bg-white rounded-md">
            <Picker.Item label="Variant 01" value="variant01" />
            <Picker.Item label="Variant 02" value="variant02" />
            <Picker.Item label="Variant 03" value="variant03" />
          </Picker>

          {/* Accessories Customization */}
          <Text className="text-md font-semibold mt-2">Accessories</Text>
          <Picker selectedValue={avatarOptions.accessories} onValueChange={(value) => updateAvatarOption("accessories", value)} className="bg-white rounded-md">
            <Picker.Item label="Variant 01" value="variant01" />
            <Picker.Item label="Variant 02" value="variant02" />
            <Picker.Item label="Variant 03" value="variant03" />
          </Picker>
        </View>

        {/* Classes */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Classes</Text>
          <View className="flex-row flex-wrap">
            {classes.map((course, index) => (
              <View
                key={index}
                className="bg-gray-500 rounded-full p-3 m-1 shadow-md"
              >
                <Text className="text-white text-sm">{course}</Text>
              </View>
            ))}
          </View>

          <Text className="text-lg font-semibold mt-4 mb-2">Interests</Text>
          <View className="flex-row flex-wrap">
            {interests.map((interest, index) => (
              <View
                key={index}
                className="bg-[#3B79BA] rounded-full p-3 m-1 shadow-md"
              >
                <Text className="text-white text-sm">{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Text className="text-xl font-bold mb-2">Upcoming Events</Text>
          <Text className="text-gray-600">
            No upcoming events at the moment.
          </Text>
        </View>
      </ScrollView>


    </SafeAreaView>) : (null)
    
  );
};

export default ProfileScreen;
