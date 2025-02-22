import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import AirtableService from "../../airtable";

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
    <View>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-white">{item.fields?.Name || "No Name"}</Text>
        )}
      />
    </View>
  );
};

export default RecordList;
