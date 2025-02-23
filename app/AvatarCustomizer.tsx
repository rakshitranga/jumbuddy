import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface AvatarOptions {
  seed: string;
  eyes?: string;
  hair?: string;
  mouth?: string;
  skinColor?: string;
  hairColor?: string; 
}

interface AvatarCustomizerProps {
  avatarOptions: AvatarOptions;
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ avatarOptions, setAvatarOptions }: AvatarCustomizerProps) => {
  const features = {
    eyes: ["variant01", "variant02", "variant03", "variant04", "variant05"],
    hair: ["long01", "short01", "long16", "long09", "short11", "short17"],
    mouth: ["variant01", "variant02", "variant03", "variant04", "variant05"],
    skinColor: ["9e5622", "763900", "ecad80", "f2d3b1"],
    hairColor: ["0e0e0e", "6a4e35", "562306", "e5d7a3"]
  };

  const updateAvatar = (key: keyof AvatarOptions, value: string) => {
    setAvatarOptions((prev) => ({ ...prev, [key]: value || "defaultValue" }));
  };  

  return (
    <View className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-2">Customize Your Avatar</Text>

      {/* Dropdown selection for each feature */}
      {Object.entries(features).map(([key, options]) => (
        <View key={key} className="mb-4">
          <Text className="text-md font-semibold mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Picker
            selectedValue={avatarOptions[key as keyof AvatarOptions]}
            onValueChange={(value) => updateAvatar(key as keyof AvatarOptions, value)}
          >
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ))}
    </View>
  );
};

export default AvatarCustomizer;
