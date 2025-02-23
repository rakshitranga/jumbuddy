import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PostEvent({ closeModal }) {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [eventTags, setEventTags] = useState<string[]>([]);

    const router = useRouter();

    const handleAddTag = () => {
    if (tagInput.trim() && !eventTags.includes(tagInput.toLowerCase())) {
        setEventTags([...eventTags, tagInput.toLowerCase()]);
        setTagInput("");
    }
    };

    const handleNext = () => {
        closeModal();
    };

    return (
        <View className = "p-6">
        <Text className="text-3xl font-bold mb-8">
            post your <Text className="text-blue-600">event</Text>
        </Text>

        <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Event title</Text>
            <TextInput
            value={eventName}
            onChangeText={setEventName}
            placeholder="Enter title here"
            placeholderTextColor="#4B5563"  // Darker placeholder text
            className="border border-gray-300 rounded-lg p-4 text-base"
            />
        </View>

        <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Event location</Text>
            <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location here"
            placeholderTextColor="#4B5563"  // Darker placeholder text
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg p-4 text-base"
            />
        </View>

        <View className="mb-8">
        <Text className="text-lg font-semibold mb-2">Description</Text>
        <TextInput
        value={eventDescription}
        onChangeText={setEventDescription}
        placeholder="Enter description here"
        placeholderTextColor="#4B5563"  // Darker placeholder text
        className="border border-gray-300 rounded-lg p-4 text-base"
        />
    </View>

    <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mb-6">
        {/* TODO: search bar icon needed in search bar */}
        <TextInput
            value={tagInput}
            onChangeText={setTagInput}
            className="flex-1 text-base text-gray-700 pl-2"  // Added pl-2 for left padding
            placeholder="Add any tags for your event!"
            placeholderTextColor="#4B5563"  // Darker placeholder text
            textAlignVertical="center"  // Centers text vertically
            onSubmitEditing={handleAddTag}
            returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAddTag}>
            <Feather name="plus" size={20} color="#2563EB" />
        </TouchableOpacity>
        </View>

        
        <View className="mb-8">
        <Text className="text-lg font-semibold mb-3">Added:</Text>
        <View className="flex-row flex-wrap">
            {eventTags.map((course, index) => (
            <View
                key={index}
                className="bg-purple-500 rounded-full p-3 m-1 shadow-md"
            >
                <Text className="text-white text-sm">{course}</Text>
            </View>
            ))}
        </View>
        </View>

        <TouchableOpacity
            onPress={handleNext}
            className="py-4 rounded-lg items-center"
            style={{ backgroundColor: "#0057D2"}}
            >
            <Text className="text-white text-lg font-bold">
                Post!
            </Text>
        </TouchableOpacity>

        </View>
    );
}