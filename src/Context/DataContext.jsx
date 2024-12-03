import React, { createContext, useEffect, useState } from 'react'
import { getFrom, getOffers } from '../components/Services/api'

export const DATA=createContext([])
function DataContext({children}) {
  const [from, setFrom] = useState([])
  const [offers, setOffers] = useState([])

    useEffect(() => {
      getFrom().then(res => setFrom(res))
    },[])
    
    useEffect(() => {
      getOffers().then(res => {
        setOffers(res);
      });
    }, []);
  return (
      <DATA.Provider value={{from, offers}}>
          {children}
      </DATA.Provider>
  )
}

export default DataContext