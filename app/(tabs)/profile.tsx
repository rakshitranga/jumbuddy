import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, mapAirtableUser } from "@/components/mapAirtable";
import AirtableService from "../../airtable";
import AvatarCustomizer from "../AvatarCustomizer"; 
import { useRouter } from "expo-router";


interface AvatarOptions {
  seed: string;
  eyes?: string;
  hair?: string;
  mouth?: string;
  skinColor?: string;
  hairColor?: string;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const router = useRouter();

  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    seed: "Emily",
    eyes: "variant01",      // Default value
    hair: "long01",          // Default value
    mouth: "variant01",         // Default value
    skinColor: "f2d3b1",     // Default value
    hairColor: "0e0e0e" 
  });

  useEffect(() => {
    const populateDefaultAvatarOptions = async () => {
      const defaultOptions = await AsyncStorage.getItem("avatar_options");
      if (defaultOptions) {
        setAvatarOptions(JSON.parse(defaultOptions));
      }
    };
  
    populateDefaultAvatarOptions();
  }, []);
  
  
  
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
        setUniqueId(data[0].id)
        setAvatarUrl(data[0].fields.avatarlink);

        const params = new URLSearchParams(data[0].fields.avatarlink);
        const seed = params.get("seed");
        const eyes = params.get("eyes");
        const hair = params.get("hair");
        const mouth = params.get("mouth");
        const skinColor = params.get("skinColor");
        const hairColor = params.get("hairColor");
        console.log(seed, eyes, hair, mouth, skinColor, hairColor);
        if (seed && eyes && hair && mouth && skinColor && hairColor) {
          let payload = {
            seed: data[0].fields.avatarlink,
            eyes: eyes,
            hair: hair,
            mouth: mouth,
            skinColor: skinColor,
            hairColor: hairColor
          }

          AsyncStorage.setItem("avatar_options", JSON.stringify(payload));
          setAvatarOptions(payload);
        }

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
  

  //const avatarUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(avatarOptions.seed)}&eyes=${avatarOptions.eyes}&hair=${avatarOptions.hair}&mouth=${avatarOptions.mouth}&skinColor=${avatarOptions.skinColor}`;


  useEffect(() => {
    const fetchAvatar = () => {
      let url = `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(avatarOptions.seed)}&glassesProbability=0`;

      if (avatarOptions.eyes) url += `&eyes=${avatarOptions.eyes}`;
      if (avatarOptions.hair) url += `&hair=${avatarOptions.hair}`;
      if (avatarOptions.mouth) url += `&mouth=${avatarOptions.mouth}`;
      if (avatarOptions.skinColor) url += `&skinColor=${avatarOptions.skinColor}`;
      if (avatarOptions.hairColor) url += `&hairColor=${avatarOptions.hairColor}`;

      AsyncStorage.setItem("avatar_options", JSON.stringify(avatarOptions));

      console.log("Fetching avatar from:", url);
      setAvatarUrl(url); 

    };

    const updateProfileWithAvatar = async () => {
      try {
        if (user) {
          console.log(user.id)
          const updated = await AirtableService.updateRecord(uniqueId, { avatarlink: avatarUrl });
          console.log(updated)
        }
      } catch (e) {
        console.error("Could not update profile")
      }
    }

    fetchAvatar();
    updateProfileWithAvatar();
  }, [avatarOptions]);

  return (
    <SafeAreaView className="bg-white flex-1">
      {user ? (
        <ScrollView className="p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center py-4">
            <Feather name="menu" size={24} color="black" />
            <Text className="text-lg font-bold text-blue-600"> Profile </Text>
            <Feather name="bell" size={24} color="black" />
          </View>

          {/* Profile Avatar and Info */}
          <View className="items-center mb-6">
              {/* Avatar Image */}
              {avatarUrl ? (
                <Image
                  source={{ uri: avatarUrl }}
                  className="w-40 h-40 mb-4 rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-gray-600">Loading avatar...</Text>
              )}

              {/* Edit Profile Button */}
              <TouchableOpacity onPress={() => router.push({ pathname: "/EditProfilePage", params: { initialPage: "5" } })}>
                <Text className="text-blue-600">Edit Profile</Text>
              </TouchableOpacity>


              <Text className="text-3xl font-bold">{user.name}</Text>
              <Text className="text-xl text-gray-600">Class of {user.gradyear}</Text>
            </View>
            <View className="flex-row space-x-4 mt-2">
              <Text className="text-gray-600">Buddies: {buddies}</Text>
              <Text className="text-gray-600">Activities: {activitiesJoined}</Text>
            </View>


          {/* Classes */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Classes</Text>
            <View className="flex-row flex-wrap">
              {user.classes.split(',').map((course, index) => (
                <View key={index} className="bg-gray-500 rounded-full p-3 m-1 shadow-md">
                  <Text className="text-white text-sm">{course}</Text>
                </View>
              ))}
            </View>

            <Text className="text-lg font-semibold mt-4 mb-2">Interests</Text>
            <View className="flex-row flex-wrap">
              {user.interests.split(',').map((interest, index) => (
                <View key={index} className="bg-[#3B79BA] rounded-full p-3 m-1 shadow-md">
                  <Text className="text-white text-sm">{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Upcoming Events */}
          <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <Text className="text-xl font-bold mb-2">Upcoming Events</Text>
            <Text className="text-gray-600">No upcoming events at the moment.</Text>
          </View>
        </ScrollView>
       ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-red-600">User not found!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
