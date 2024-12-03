import React, { useContext, useEffect, useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import Directions from "../../assets/Icons/directions.svg";
import { IoCalendarOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiAirplaneDeparture } from "react-icons/gi";
import { PiArrowsOutCardinalLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { DATA } from "../../Context/DataContext";
import { DiVim } from "react-icons/di";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addYears, isAfter } from "date-fns";




function Booking() {

  
  
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [focusedInput, setFocusedInput] = useState("")


  const [openTab, setOpenTab] = useState(false);
  const [allDirectionTab, setAllDirectionTab] = useState(false)

  const [fromAirportCode, setFromAirportCode] = useState('');
  const [toAirportCode, setToAirportCode] = useState('');


  const [outboundDate, setOutboundDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const { from } = useContext(DATA);


  const today = new Date();
  const maxOutboundDate = addYears(today, 1);


  const toggleSearchTab = () => {
    setOpenTab(!openTab);
    setAllDirectionTab(false);
  };

  const handleDirections = () => {
    setAllDirectionTab(true)
  }

  const handleCountryClick = (country) => {

    const [cityName, countryName] = country.name.split(','); 
    const airportCode = country.code;  
  
    if (focusedInput === 'from') {
      setFromSearch(cityName.trim());  
      setFromAirportCode(airportCode);
    } else if (focusedInput === 'to') {
      setToSearch(cityName.trim());    
      setToAirportCode(airportCode);   
    }
  
    setOpenTab(false); 
    setAllDirectionTab(false);
  };

  useEffect(() => {
    if (openTab) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openTab]);


  useEffect(() => {}, [fromSearch, from]);

  
  return (
    <>
      <div className="bg-[#01357e] text-white p-4 max-w-md mx-auto">
        <div className="mb-4 relative">
          <button className="absolute top-10 right-3 p-1 border-2 rounded-full z-10 bg-white">
            <IoSwapVertical color="black" />
          </button>
          <label className="flex justify-between items-center h-[55px] bg-white text-black  p-3 rounded-t-md border-b-2 relative">
            <input type="text" className="w-full h-full outline-none font-bold workfontb"
               value={fromSearch}
              onChange={(e) => setFromSearch(e.target.value)}
              onFocus={() => setFocusedInput('from')}
              onClick={toggleSearchTab} 
              placeholder="From"  />
            <span className="text-gray-500 workfontn">{fromAirportCode }</span>
          </label>
          
            <label className="flex justify-between items-center h-[50px] bg-white text-black p-3 rounded-b-md relative">
            <input 
              type="text" 
              className="w-full h-full outline-none font-bold"
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              onFocus={() => setFocusedInput('to')}
              onClick={toggleSearchTab} 
              placeholder="To" 
            />
            <span className="text-gray-500 workfontn">{toAirportCode }</span>
            </label>
        </div>
        {/*     ----------------------------------------Calendar----------------------------------*/}
        <div className="mb-4">
          <div className="flex items-center bg-white text-black p-3 rounded-md  w-full ">
          
          <DatePicker
            selected={outboundDate}
            onChange={(date) => setOutboundDate(date)} 
            dateFormat="dd MMM"
            className="p-2 w-full outline-none rounded-md border-r "
              placeholderText="Outbound date"
              minDate={today} 
              maxDate={maxOutboundDate}
              isClearable
          />
          
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)} 
            dateFormat="dd MMM"
            className="p-2 w-full  rounded-md"
              placeholderText="Return date"
              minDate={today} 
              maxDate={maxOutboundDate}
              isClearable
          />

          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Passengers</label>
          <select className="bg-white text-black p-3 rounded-md w-full">
            <option>1, Economy</option>
            <option>2, Economy</option>
            <option>1, Business</option>
            <option>2, Business</option>
          </select>
        </div>

        <div className="mb-4">
          <button className="bg-white text-blue-900 w-full p-3 rounded-md flex items-center justify-center">
            + Add promo code
          </button>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2"/>
            Pay by Miles
          </label>
        </div>

        <div>
          <button className="bg-blue-500 w-full text-white py-3 rounded-md">
              Search
              
          </button>
        </div>
      </div>
      
          {openTab && 
          <div id="fromcountries" className="w-full h-full absolute top-0  bg-white z-50  overflow-hidden">
            <div>
              <h3 className="font-bold m-2 text-[1.4em] text-[#333539]">Choose direction</h3>
              <button onClick={toggleSearchTab} className="absolute right-2 top-3"><RxCross1 size={25} /></button>
            </div>

            <div className=" w-[90%] mx-auto relative  ">
              <div className="flex border rounded-md  border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 ">
              <input
                type="text"
                className="w-full p-2 outline-none rounded-md peer workfontb"
                value={focusedInput === 'from' ? fromSearch : focusedInput === 'to' ? toSearch : ''}
                onChange={(e) => {
                  if (focusedInput === 'from') {
                    setFromSearch(e.target.value);
                  } else if (focusedInput === 'to') {
                    setToSearch(e.target.value);
                  }
                }}
                placeholder=""
              />
                  <span className="p-2">
                    <FaMagnifyingGlass size={20} color="#333539" />
                  </span>
                  <span className="absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 
                  top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  {focusedInput === 'from' ? 'From' : 'To'}
                  </span>
              </div>
              <div>
              {allDirectionTab ? (
                <ul className="flex-col overflow-y-auto max-h-[80vh] specialscrollbar m-2  ">
                    {from .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.name.includes('Azerbaijan') && 
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                           item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Azerbaijan</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.name.includes('Azerbaijan') && 
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                  
                    {from
                    .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.name.includes('Turkiye') && 
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                          item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Turkiye</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.name.includes('Turkiye') && 
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                   {from
                    .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.name.includes('Russia') && 
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                          item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Russia</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.name.includes('Russia') && 
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                   {from
                    .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.zone.includes('Asia') &&  !item.name.includes('Turkiye') &&  !item.name.includes('Russia') &&  !item.name.includes('Azerbaijan') && 
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                          item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Asia</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.zone.includes('Asia') && !item.name.includes('Turkiye') &&  !item.name.includes('Russia') &&  !item.name.includes('Azerbaijan') &&
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                  {from
                    .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.zone.includes('Europe') &&  !item.name.includes('Turkiye') &&  !item.name.includes('Russia') &&
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                          item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Europe</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.zone.includes('Europe') && !item.name.includes('Turkiye') &&  !item.name.includes('Russia') &&
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                  {from
                    .filter(item => 
                      (focusedInput === 'from' ? fromSearch : toSearch) &&
                      (
                        item.zone.includes('Africa') &&
                        (
                          item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                          item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                        )
                      )
                    )
                    .length > 0 && (
                      <li className="pt-5">
                        <span className="text-[1.1em]">Africa</span>
                        <ul className="border rounded-lg">
                          {from
                            .filter(item => 
                              item.zone.includes('Africa') && 
                              (
                                item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) ||
                                item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase())
                              )
                            )
                            .map(item => {
                              const cityName = item.name.split(',')[0];
                              return (
                                <li key={item.code} className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b rounded-lg"
                                  onClick={() => handleCountryClick(item)}>
                                  <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                  <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                    {cityName}
                                  </span>
                                  <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">({item.code})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    )}
                </ul>
              ) : (
                <ul className="flex-col overflow-y-auto  max-h-[75vh] specialscrollbar my-3" >
                  {    (focusedInput === 'from' ? fromSearch : toSearch) && from
                  .filter(item =>  (item.name.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()) || 
                      item.code.toLowerCase().includes((focusedInput === 'from' ? fromSearch : toSearch).toLowerCase()))
                    )
                  .map(item => (
                        
                    <li key={item.code}
                      className="flex items-center w-[100%] p-1 cursor-pointer hover:bg-gray-100 "
                      onClick={() => handleCountryClick(item)}
                    >
                      <GiAirplaneDeparture  className="min-w-6 min-h-6" color="#cdd5df" />
                      <span className="workfontb p-2 text-[0.95em] font-bold  items-center text-ellipsis overflow-hidden whitespace-nowrap">
                        {item.name}
                      </span>
                      
                      <span className="ml-auto mr-2 text-[#6E7583]">
                        {item.code}
                      </span>
                    </li>
                        ))}
                </ul>)
                }
              </div>
            </div>
            <button onClick={() => handleDirections()} className={`flex w-[90%] mx-auto items-center py-3 my-3 hover:bg-gray-100 ${allDirectionTab ? 'hidden' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-500 ml-2 " width={18} height={18} fill="#2C8DC7" viewBox="1.8 1.66 16.41 16.26" >
              <path d="M9.988 1.656a.834.834 0 0 0-.654.333L6.703 4.62A.833.833 0 1 0 
              7.88 5.8l1.286-1.286v6.299L3.86 14.45l.31-1.547a.834.834 0 1 0-1.635-.326l-.723 3.62a.834.834 0 0 0
              .653.981l3.62.723a.832.832 0 0 0 .869-1.282.834.834 0 0 0-.541-.352l-1.747-.349L9.99 12.27l5.34 3.649-1.742.348a.835.835 0 1 0 .327
              1.634l3.62-.723a.833.833 0 0 0 .654-.98l-.724-3.621a.834.834 0 1 0-1.634.326l.31 1.552-5.306-3.627V4.513l1.285 1.286a.833.833
              0 1 0 1.179-1.179l-2.634-2.634a.834.834 0 0 0-.676-.33z" fill="currentColor"></path>
              </svg>
             <span className="text-[#2C8DC7] mx-2 workfontb">All Directions</span>               
            </button>
          </div>
        }
    </>  
  );
};

export default Booking;
