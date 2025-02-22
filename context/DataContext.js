import React, { createContext, useState, useEffect } from 'react';
import { getItem } from '../services/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItem();
    setItems(data);
  };

  return (
    <DataContext.Provider value={{ items }}>
      {children}
    </DataContext.Provider>
  );
};
