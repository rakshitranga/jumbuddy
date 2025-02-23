import axios from "axios";

const BASE_ID = "appA57UXA6w66Rkkt";
const TABLE_ID = "Profiles";
const API_TOKEN = "patAzfWJz4mHtHZtY.d9626e8dc28aaefc6761ed056781dd7c777b6d0ecf786e5af0712dd727d4ef90";

const ACTIVITIES_TABLE_ID = "Activities";

// Base URL for Airtable API
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
const AIRTABLE_TABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${ACTIVITIES_TABLE_ID}`;

const AirtableService = {
  /**
   * Fetch all records from Airtable
   */
  getRecords: async () => {
    try {
      const response = await axios.get(AIRTABLE_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.records;
    } catch (error) {
      console.error("Error fetching Airtable records:", error);
      return [];
    }
  },

  // getRecords: async () => {
  //   try {
  //     const response = await axios.get(AIRTABLE_TABLE_URL, {
  //       headers: {
  //         Authorization: `Bearer ${API_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return response.data.records;
  //   } catch (error) {
  //     console.error("Error fetching Airtable records:", error);
  //     return [];
  //   }
  // },

  getActivitiesExceptMine: async (id) => {
    try {
      const response = await axios.get(`${AIRTABLE_TABLE_URL}?filterByFormula=NOT({host}='${id}')`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.records;
    } catch (error) {
      console.error("Error fetching Airtable records:", error);
      return [];
    }
  },

  getMyActivities: async (id) => {
    try {
      const response = await axios.get(`${AIRTABLE_TABLE_URL}?filterByFormula=({host}='${id}')`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.records;
    } catch (error) {
      console.error("Error fetching Airtable records:", error);
      return [];
    }
  },

  getMyActivitiesByFriendIds: async (friendids) => {
    console.log(friendids);
    idArray = friendids.split(",");
    formula = "OR(";
    for (let i = 0; i < idArray.length; i++) {
        formula += "{host}=\'" + idArray[i] + "\'" + (i == idArray.length - 1 ? "" : ",");
    }
    formula += ")";
    let url = `${AIRTABLE_TABLE_URL}?filterByFormula=${formula}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.records;
    } catch (error) {
      console.error("Error fetching Airtable records:", error);
      return [];
    }
  },

  getUserById: async(id) => {
    try {
      const response = await axios.get(`${AIRTABLE_URL}?filterByFormula=({id}='${id}')`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.records[0].id)
      return response.data.records;
    } catch (error) {
      console.error("Error fetching Airtable records:", error);
      return [];
    }
  },

  getUserByNameAndPassword: async(name, password) => {
    try {
        const response = await axios.get(`${AIRTABLE_URL}?filterByFormula=AND({username}='${name}',{password}='${password}')`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        return response.data.records;
    } catch (error) {
        console.error("Error fetching Airtable records:", error);
        return [];
    }
  },

  getUsersByFriendsIds: async(friendids) => {
    idArray = friendids.split(",");
    formula = "OR(";
    for (let i = 0; i < idArray.length; i++) {
        formula += "{id}=\'" + idArray[i] + "\'" + (i == idArray.length - 1 ? "" : ",");
    }
    formula += ")";
    console.log(formula);
    let url = `${AIRTABLE_URL}?filterByFormula=${formula}`;
    try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Airtable records:", error);
        return [];
    }
  },

  getUsersExceptFriendsIds: async(friendids) => {
    idArray = friendids.split(",");
    formula = "NOT(";
    for (let i = 0; i < idArray.length; i++) {
        formula += "{id}=\'" + idArray[i] + "\'" + (i == idArray.length - 1 ? "" : ",");
    }
    formula += ")";
    let url = `${AIRTABLE_URL}?filterByFormula=${formula}`;
    try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Airtable records:", error);
        return [];
    }
  },

  /**
   * Add a new record to Airtable
   * @param {Object} fields - Fields for the new record
   */
  addRecord: async (fields) => {
    try {
      const response = await axios.post(
        AIRTABLE_URL,
        {
          records: [{ fields }],
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding record:", error);
      return null;
    }
  },

  addActivity: async (fields) => {
    try {
      const response = await axios.post(
        AIRTABLE_TABLE_URL,
        {
          records: [{ fields }],
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding record:", error);
      return null;
    }
  },

  /**
   * Update an existing record
   * @param {string} recordId - The ID of the record to update
   * @param {Object} fields - Updated fields
   */
  updateRecord: async (recordId, fields) => {
    try {
      const url = `${AIRTABLE_URL}/${recordId}`;
      const response = await axios.patch(
        url,
        { fields: fields },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  },

  /**
   * Delete a record from Airtable
   * @param {string} recordId - The ID of the record to delete
   */
  deleteRecord: async (recordId) => {
    try {
      const url = `${AIRTABLE_URL}/${recordId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error deleting record:", error);
      return false;
    }
  },
};

export default AirtableService;