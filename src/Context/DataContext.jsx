import React, { createContext, useEffect, useState } from "react";
import { getFrom, getOffers, getFlights } from "../components/Services/api";

export const DATA = createContext([]);
function DataContext({ children }) {
  const [from, setFrom] = useState([]);
  const [offers, setOffers] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFrom().then((res) => setFrom(res));
  }, []);

  useEffect(() => {
    getOffers().then((res) => {
      setOffers(res);
    });
  }, []);

  useEffect(() => {
    getFlights().then((res) => setFlights(res));
  }, []);

  return (
    <DATA.Provider value={{ from, offers, flights }}>{children}</DATA.Provider>
  );
}

export default DataContext;
