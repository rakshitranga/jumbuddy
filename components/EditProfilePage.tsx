import React, {useState} from 'react';
import { Text, Image, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function SetProfilePage() {
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [major, setMajor] = useState('');
    const [classInput, setClassInput] = useState('');
    const [userClasses, setUserClasses] = useState<string[]>([]);
    const [interestInput, setInterestInput] = useState('');
    const [userInterests, setUserInterests] = useState<string[]>([]);
    const popularInterests = ['gym', 'art', 'food', 'going out'];
    
    const handleAddClass = () => {
      if (classInput.trim() && !userClasses.includes(classInput.toUpperCase())) {
        setUserClasses([...userClasses, classInput.toUpperCase()]);
        setClassInput('');
      }
    };

    const handleAddInterest = () => {
      if (interestInput.trim() && !userInterests.includes(interestInput.toLowerCase())) {
        setUserInterests([...userInterests, interestInput.toLowerCase()]);
        setInterestInput('');
      }
    };

    const handleNext = () => {
      if (page === 1) {
        if (!name.trim() || !graduationYear.trim() || !major.trim()) {
          Alert.alert('Incomplete Information', 'Please complete all fields before continuing.');
          return;
        }
      }
      if(page < 3) {
        setPage(page + 1);
      } else {
        //TODO: redirect to the home page
      }
    };

    let content;
    if(page == 1) {
        content = (
            <View>
            <Text className="text-3xl font-bold mb-8">
              make your <Text className="text-blue-600">profile</Text>
            </Text>

            <View className="mb-6">
              <Text className="text-lg font-semibold mb-2">What's your preferred name?</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="enter name here:"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>

            <View className="mb-6">
              <Text className="text-lg font-semibold mb-2">Which year are you graduating?</Text>
              <TextInput
                value={graduationYear}
                onChangeText={setGraduationYear}
                placeholder="enter year here:"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>

            <View className="mb-8">
              <Text className="text-lg font-semibold mb-2">What is your major?</Text>
              <TextInput
                value={major}
                onChangeText={setMajor}
                placeholder="enter major here:"
                placeholderTextColor="#4B5563"  // Darker placeholder text
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
          </View>
        );
    } else if (page == 2) {
        content = (
            <View>
                <ScrollView className="p-4">
                  <Text className="text-3xl font-bold mb-2">
                    add <Text className="text-blue-600">classes</Text>
                  </Text>
                  <Text className="text-sm text-gray-500 mb-6 italic">examples: CS11, MATH34, EN1, PSY32</Text>

                  <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mb-6">
                    {/* TODO: search bar icon needed in search bar */}
                    <TextInput
                      value={classInput}
                      onChangeText={setClassInput}
                      className="flex-1 text-base text-gray-700 pl-2"  // Added pl-2 for left padding
                      placeholder="Search for your classes!"
                      placeholderTextColor="#4B5563"  // Darker placeholder text
                      textAlignVertical="center"  // Centers text vertically
                      onSubmitEditing={handleAddClass}
                      returnKeyType="done"
                    />
                    <TouchableOpacity onPress={handleAddClass}>
                      <Feather name="plus" size={20} color="#2563EB" />
                    </TouchableOpacity>
                  </View>

                  
                  <View className="mb-8">
                    <Text className="text-lg font-semibold mb-3">added:</Text>
                    <View className="flex-row flex-wrap">
                      {userClasses.map((course, index) => (
                        <View
                          key={index}
                          className="bg-gray-500 rounded-full p-3 m-1 shadow-md"
                        >
                          <Text className="text-white text-sm">{course}</Text>
                        </View>
                      ))}
                  </View>
                  </View>
                </ScrollView>
            </View>
        );
    } else if (page == 3) {
        content = (
            <View>
              <ScrollView className="p-4">
                <Text className="text-3xl font-bold mb-2">
                  add <Text className="text-blue-600">interests</Text>
                </Text>

                <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mb-6">
                  <Feather name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    value={interestInput}
                    onChangeText={setInterestInput}
                    className="flex-1 ml-2 text-base text-gray-700 pl-2"
                    placeholder="Search for your interests"
                    placeholderTextColor="#4B5563"
                    textAlignVertical="center"
                    onSubmitEditing={handleAddInterest}
                    returnKeyType="done"
                  />
                  <TouchableOpacity onPress={handleAddInterest}>
                    <Feather name="plus" size={20} color="#2563EB" />
                  </TouchableOpacity>
                </View>

                <View className="mb-6">
                  <Text className="text-lg font-semibold mb-3">popular:</Text>
                  <View className="flex-row flex-wrap">
                    {popularInterests.map((interest, index) => (
                      <View
                        key={index}
                        className="bg-gray-200 rounded-full px-4 py-2 m-1 shadow-sm"
                      >
                        <Text className="text-gray-500 text-sm">{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="mb-8">
                  <Text className="text-lg font-semibold mb-3">interests:</Text>
                  <View className="flex-row flex-wrap">
                    {userInterests.map((interest, index) => (
                      <View
                        key={index}
                        className="bg-blue-600 rounded-full px-4 py-2 m-1 shadow-md"
                      >
                        <Text className="text-white text-sm">{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
        );
    } else {
      content = <View></View>
    }

    return (
      <View className = "p-6">
        {content}

       <TouchableOpacity
          onPress={handleNext}
          className="py-4 rounded-lg items-center"
          style={{ backgroundColor: "#0057D2"}}
          >
          <Text className="text-white text-lg font-bold">
            {page === 3 ? "let's go!" : "next"}
          </Text>
      </TouchableOpacity>
      </View>
    )
}