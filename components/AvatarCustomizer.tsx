import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface AvatarOptions {
  seed: string;
  eyes?: string;
  hair?: string;
  mouth?: string;
  skinColor?: string;
}

interface AvatarCustomizerProps {
  avatarOptions: AvatarOptions;
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ avatarOptions, setAvatarOptions }: AvatarCustomizerProps) => {
  const features = {
    eyes: ["variant01", "variant02", "variant03", "variant04", "variant05"],
    hair: ["short", "long", "curly", "bald", "buzz"],
    mouth: ["smile", "open", "serious", "sad", "grin"],
    skinColor: ["light", "tanned", "brown", "dark", "pale"],
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
