import React from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from "react-native";

const friends = [
  { id: "1", name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "2", name: "Michael Smith", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Emma Brown", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
];

const FriendsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", { friend: item })} style={styles.friendItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FriendsScreen;
