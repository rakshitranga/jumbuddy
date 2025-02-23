import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Modal, SafeAreaView, ScrollView} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AirtableService from '@/airtable';
import { Event } from './mapAirtable';
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PostEventProps {
    visible: boolean;
    onClose: () => void;
  }

export default function PostEvent({ visible, onClose }: PostEventProps) {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [eventTags, setEventTags] = useState<string[]>([]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const router = useRouter();

    const handleAddTag = () => {
    if (tagInput.trim() && !eventTags.includes(tagInput.toLowerCase())) {
        setEventTags([...eventTags, tagInput.toLowerCase()]);
        setTagInput("");
    }
    };

    const handleNext = async () => {
        const month = format(date, "MMMM");    // e.g., "March"
        const day = format(date, "dd");        // e.g., "09"
        const time = format(date, "hh:mm a");
        // making new eAn
        const userId = await AsyncStorage.getItem("user_id");        
        const fields = {
            'title': eventName, 
            'location': location,
            'desc': eventDescription,
            'day': day,
            'month': month,
            'time': time,
            'host': userId,
        }

        console.log(fields)
        // returns fields, ;including userId
        const result = await AirtableService.addActivity(fields);

        onClose();

    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const current = new Date(date);
            current.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDate(current);
        }
    };
    
    const onTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            const current = new Date(date);
            current.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDate(current);
        }
    };

    return (
        <Modal 
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}  
        >
        <SafeAreaView className="flex-1">
        <ScrollView>
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
        <Text className="text-lg font-semibold mb-2">Event Date & Time</Text>

        {/* Permanent Date Picker */}
        <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? "inline" : "default"}
            onChange={onDateChange}
            style={{ marginBottom: 20 }}
        />

        {/* Permanent Time Picker */}
        <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === 'ios' ? "spinner" : "default"}
            onChange={onTimeChange}
        />
        </View>

        <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Event location</Text>
            <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location here"
            placeholderTextColor="#4B5563"  // Darker placeholder text
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
        </ScrollView>
        </SafeAreaView>
        </Modal>
        
    );
}