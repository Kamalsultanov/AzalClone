import { useState, useEffect, useContext  } from 'react';

import axios from "axios";
import { DataInfo } from '../../../data/dataInfo.js';
import { LoadingContext } from '../loading/LoadingContext.jsx';

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
        null
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
    async function getMenuItems() {
      return new Promise((resolve) => {
        resolve(DataInfo.menuItems); 
      });
    }
    async function getServices() {
      return new Promise((resolve) => {
        resolve(DataInfo.services); 
      });
    }
    async function getExperience() {
      return new Promise((resolve) => {
        resolve(DataInfo.experience); 
      });
    }

export { getFrom, getOffers, getFlights, getMenuItems, getServices, getExperience};
