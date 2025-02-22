import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import AirtableService from "../../airtable";
import EventCard from "../../components/EventCard";

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await AirtableService.getRecords();
      setRecords(data);
      setLoading(false);
    };

    fetchRecords();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView>
      <View>
      <EventCard
              date = "09"
              month = "March"
              time = "10:00am - 14:00pm"
              title="hot pot night!"
              location="happy lamb, chinatown"
      ></EventCard>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-white">{item.fields?.Name || "No Name"}</Text>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default RecordList;
