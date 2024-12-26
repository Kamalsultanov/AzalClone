import { useState, useEffect } from 'react';

import axios from "axios";
import { DataInfo } from '../../../data/dataInfo.js';

let cachedCities = null;


async function getFrom() {
      
      if (cachedCities) {
          return cachedCities;
        }
      try {
        const res = await axios.get('http://localhost:3000/locations');
        const allCountryNames = res.data;
    
       
        const dataFrom = allCountryNames
          .filter(item => item.code === 'AZ')
          .flatMap(city => city.children)
          .flatMap(child => child.from)
          .concat('GYD'); 
      
        
        const cities = allCountryNames
          .filter(item => item.type === 'country')
          .flatMap(country => country.children)
          .map(city => {
            if (dataFrom.includes(city.code)) {
              return { name: city.displayNames.en, code: city.code, zone: city.timeZone };
            }
            return null;
          })
          .filter(city => city !== null);
        
          cachedCities = cities; 
        
        return cities;

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    }
    async function getOffers() {
      return new Promise((resolve) => {
        resolve(DataInfo.offers);      
      });
    }
    
    async function getFlights() {
      return new Promise((resolve) => {
        resolve(DataInfo.flights); 
      });
    }

export { getFrom, getOffers, getFlights };
