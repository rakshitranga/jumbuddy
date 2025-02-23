import React, {useState} from 'react';
import { Text, Image, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from "react-native";

export default function setProfilePage () {
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [major, setMajor] = useState('');

    const handleNext = () => {
        //console.log({ name, graduationYear, major });
        setPage(page + 1);
        console.log("page is now: ", page);
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
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>

            <View className="mb-6">
              <Text className="text-lg font-semibold mb-2">Which year are you graduating?</Text>
              <TextInput
                value={graduationYear}
                onChangeText={setGraduationYear}
                placeholder="enter year here:"
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
                className="border border-gray-300 rounded-lg p-4 text-base"
              />
            </View>
          </View>
        );
    } else if (page == 2) {
        content = (
            <View>
                
            </View>
        );
    } else if (page == 3) {
        content = (
            <View></View>
        );
    } else {
        content = <View></View>
    }

    return content;
    //         if (page == 1) {
    //             <View>
    //                 
    //             </View>
    //         } else if (page == 2) {
    //             <View>
    //             </View>
    //         } (
    //             page == 2 ? (
    //                 <View>
    //                 </View>
    //             ) : (
    //                 page == 3 ? (
    //                     <View>
    //                     </View>
    //                 ) : (
    //                     page == 4 ? (
                            
    //                     ) : null
    //                 )
    //             )
    //         )

    //         <TouchableOpacity
    //             onPress={handleNext}
    //             className="bg-blue-600 py-4 rounded-lg items-center"
    //             >
    //             <Text className="text-white text-lg font-bold">next</Text>
    //         </TouchableOpacity>
    // );
}