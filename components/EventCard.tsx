import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Event } from "@/components/mapAirtable";

interface EventProps {
    event: Event,
}

export default function EventCard({ event }: EventProps) {
    //const eventPlaceholder = require("../../assets/images/eventPlaceholder.png")

    return (
        <View className="flex-row bg-white p-4 rounded-2xl shadow-md w-full max-w-md">
        {/* left side of event card */}
        <View className = "items-center w-20">
            {/* the date of event */}
            <View className = "flex-row items-center">
                <Text className = "text-3xl font-bold text-blue-800">{event.day}</Text>
                <Text className="text-sm text-gray-500 ml-1">{event.month}</Text>
            </View>
            <Text className="text-xs text-gray-600 mt-1">{event.time}</Text>
            {/* <Image
                source = {eventPlaceholder}
                className = "w-24 h-24 object-cover rounded-lg"
            ></Image> */}
        </View>
        {/* right side of event card */}
        <View className="flex-1 ml-6">
            <Text className="text-lg font-bold">{event.title}</Text>
            <View className="flex-row items-center mt-1">
                {/* TODO: icon of a map marker */}
                <Text className="text-gray-500 ml-1">{event.location}</Text>
            </View>
            {/* join button */}
            <TouchableOpacity className="mt-4 bg-blue-500 px-5 py-2 rounded-lg self-end">
                <Text className="text-white font-bold">join!</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}
