import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Software Engineer | Tech Enthusiast | Traveler",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      {/* User Details */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("editProfile")}>
        <Text style={styles.buttonText }>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;