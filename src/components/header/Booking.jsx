import React, { useContext, useEffect, useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import Directions from "../../assets/Icons/directions.svg";
import { IoCalendarOutline } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";
import { PiArrowsOutCardinalLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { DATA } from "../../Context/DataContext";
import Locations from "./Locations";
import { SlMagnifier } from "react-icons/sl";

import { IoIosArrowDown } from "react-icons/io";

import AllDirections from "./AllDirections";
import Calendar from "./CalendarComponent";


function Booking() {
  const { from } = useContext(DATA);
  
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [focusedInput, setFocusedInput] = useState("")


  const [outboundDate, setOutboundDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);


  const [openTab, setOpenTab] = useState(false);
  const [allDirectionTab, setAllDirectionTab] = useState(false)

  const [fromAirportCode, setFromAirportCode] = useState('');
  const [toAirportCode, setToAirportCode] = useState('');

  const handleCloseCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };
 
  useEffect(() => {
    if (isCalendarVisible) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCalendarVisible]); 

  // Close the Tab
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

    // -------------------------- Airports Swap -------------- 
  const swapLocations = () => {
    setFromSearch(toSearch);
    setToSearch(fromSearch);
  
    setFromAirportCode(toAirportCode);
    setToAirportCode(fromAirportCode);
  };


  //  ------------------------PASSENGER SELECT--------------- 
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [isPassengerOpen, setPassengerOpen] = useState(false);


  const handleClick = (className) => {
    setSelectedClass(className);
  };
  const handlePassengerTab = () => {
    setPassengerOpen(prevState => !prevState);
  };

  const changeCount = (type, delta) => {

    const newCount = type === 'adults' ? adults + delta :
                     type === 'children' ? children + delta : babies + delta;

    if (newCount >= 0 && adults + children + babies + delta <= 8) {
      if (type === 'adults') setAdults(adults + delta);
      if (type === 'children') setChildren(children + delta);
      if (type === 'babies') setBabies(babies + delta);
    }
  };


  useEffect(() => {
    if (isPassengerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPassengerOpen]);


  return (
    <div className="md:w-[100%]">
        <div className=" sm:bg-white   mx-auto my-3 rounded-lg  md:w-[80%]  p-2">
          <div className="  text-white w-full    rounded-lg md:flex  md:items-center   ">
            {/*     ----------------------------------------Location----------------------------------*/}
            <div className="mb-4 mt-4 relative sm:border border-gray-400   md:flex md:items-center md:w-[50%] ">
                  <label className="flex justify-between items-center h-[55px] bg-white text-black 
                    p-3 rounded-t-md md:rounded-t-none  relative
                    md:p-0 md:border-r md:border-gray-400 ">
                    <input type="text" className="w-full h-full outline-none font-bold workfontb p-2"
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      onFocus={() => setFocusedInput('from')}
                      onClick={toggleSearchTab} 
                      placeholder="From"  />
                    <span className="text-gray-500 workfontn md:mx-5">{fromAirportCode }</span>
                  </label>
                  <button
                    onClick={swapLocations}
                    className="absolute top-10 right-3 p-1 border-2 rounded-full z-10 bg-white
                      md:rotate-90 md:relative md:translate-y-[-40px]  ">
                    <IoSwapVertical color="black" />
                  </button>
                  <label className="flex justify-between items-center h-[50px] bg-white text-black p-3 relative
                    md:rounded-l-lg md: md:p-0  md:border-gray-400
                    ">
                      <input 
                        type="text" 
                        className="w-full h-full outline-none font-bold p-2"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        onFocus={() => setFocusedInput('to')}
                        onClick={toggleSearchTab} 
                        placeholder="To" 
                      />
                      <span className="text-gray-500 workfontn md:p-2">{toAirportCode }</span>
                  </label>
            </div>
              {/*     ----------------------------------------Calendar----------------------------------*/}
              <div className="mb-4  sm:border rounded-md  md:rounded-none md:h-14  md:my-3 md:border md:min-w-[20%] md:border-gray-400 ">
                <label className="flex justify-around items-center h-[50px] bg-white  p-3 rounded-md relative">
                  <button onClick={handleCloseCalendar} className="flex justify-between items-center w-full text-[#6E7583]">
                    {outboundDate || returnDate ? (
                      <>
                        <div className="flex-1 text-left text-black font-semibold">
                        <label
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                          top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3"
                          >
                          Outbound
                          </label>
                          <p className="pt-3">{outboundDate ? outboundDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Outbound"}</p>
                        </div>
                        <span className="mx-2 text-gray-500">|</span>
                        <div className="flex-1 text-right text-black font-semibold">
                          <label
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                          top-2 z-10 origin-[0] end-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3"
                          >
                          Return
                          </label>
                          <p className="pt-3">{returnDate ? returnDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "---"}</p>

                        </div>
                      </>
                    ) : (
                      <span className="flex justify-between items-center w-full text-[#6E7583]">
                        <p>Flight date</p>
                        <IoCalendarOutline size={22} />
                      </span>
                    )}
                  </button>
                </label>
              </div>
                      {/*------------- Classes ----------------- */}
              <div className="mb-2  sm:border rounded-md md:rounded-none  md:h-14 md:py-1  md:my-3 md:border md:w-[20%]  md:border-gray-400">
                <button className="bg-white text-black pt-4 pb-2 px-3 w-full rounded-lg relative flex justify-between items-center "
                onClick={handlePassengerTab}
                >
                  <label
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                  top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                  Pasengers
                  </label>
                  <p className="workfontb text-[0.8em] text-[#2E3034]">1, Economy</p>
                  <IoIosArrowDown size={22} className="flex justify-end" />

                </button>
              
              </div>

              <div className="mb-4   sm:border border-[#2C8DC7] rounded-md md:hidden  ">
                <button className="bg-white text-blue-900 w-full p-3 rounded-md flex items-center justify-center">
                  + Add promo code
                </button>
              </div>

              <div className="mb-4  md:hidden sm:text-black">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2"/>
                  Pay by Miles
                </label>
              </div>

              <div>
                <button className="bg-[#37A6DB] w-full text-white py-3 rounded-md md:rounded-r-lg md:rounded-none md:px-3 md:py-[18px] md:bg-[#01357e] ">
                    <p className="md:hidden">Search</p>
                    <p className="hidden md:block"><SlMagnifier size={23} /></p>
                </button>
              </div>
          </div>
          <div className=" justify-between hidden md:flex ">
                <div className="mx-2">
                  <label className="flex items-center text-black">
                    <input type="checkbox" className="mr-2"/>
                    Pay by Miles
                  </label>
                </div>
                <div className="  sm:border border-[#2C8DC7] rounded-md mx-2 ">
                      <button className="bg-white text-blue-900 w-full p-3 rounded-md flex items-center justify-center">
                        + Add promo code
                      </button>
                </div>
                
          </div>
        </div>
          {openTab && 
          <div id="fromcountries" className="w-full h-full absolute top-0  bg-white z-50  overflow-hidden">
            <div>
              <h3 className="font-bold m-2 text-[1.4em] text-[#333539]">Choose direction</h3>
              <button onClick={toggleSearchTab} className="absolute right-2 top-3"><RxCross1 size={25} /></button>
            </div>
            <div className=" w-[90%] mx-auto relative  ">
              
              <div>
              {allDirectionTab ? ( <AllDirections onCountryClick={handleCountryClick}/>
              ) : (
                  <Locations onCountryClick={handleCountryClick} />
              )
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
        <div className="overflow-hidden h-[100%]">
          <Calendar
          outboundDate={outboundDate}
          returnDate={returnDate}
          isCalendarVisible={isCalendarVisible}
          setOutboundDate={setOutboundDate}
          setReturnDate={setReturnDate}
          setIsCalendarVisible={setIsCalendarVisible}
          />
      </div>
        {/* -----------------CLASSSELECT-------------- */}
      { isPassengerOpen &&( <div className=" absolute top-0 w-full h-full bg-white z-50">
        <button className="absolute right-2 top-3"
          onClick={handlePassengerTab}
        ><RxCross1 size={25} /></button>
        <h3 className="p-2 text-[1.3em] workfontb">Passenger selection</h3>
        <ul>
          <li className="flex justify-between items-center">
            <span className="p-3 m-1">
              <p>Adults</p>
              <p className="text-xs text-gray-500">from 12 years</p>
            </span>
            <span className="flex items-center space-x-2">
              <button
                onClick={() => changeCount('adults', -1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={adults === 1}
              >
                <span className="text-lg font-semibold">-</span>
              </button>
              <span className="font-medium">{adults}</span>
              <button
                onClick={() => changeCount('adults', 1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={adults + children + babies === 8}
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="p-3 m-1">
              <p>Children</p>
              <p className="text-xs text-gray-500">up to 12 years</p>
            </span>
            <span className="flex items-center space-x-2">
              <button
                onClick={() => changeCount('children', -1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={children === 0}
              >
                <span className="text-lg font-semibold">-</span>
              </button>
              <span className="font-medium">{children}</span>
              <button
                onClick={() => changeCount('children', 1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={adults + children + babies === 8}
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="p-3 m-1">
              <p>Infants</p>
              <p className="text-xs text-gray-500">up to 2 years</p>
            </span>
            <span className="flex items-center space-x-2">
              <button
                onClick={() => changeCount('babies', -1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={babies === 0}
              >
                <span className="text-lg font-semibold">-</span>
              </button>
              <span className="font-medium">{babies}</span>
              <button
                onClick={() => changeCount('babies', 1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                disabled={adults + children + babies === 8 }
                >
                <span className="text-lg font-semibold">+</span>
              </button>
            </span>
          </li>
          

        </ul>
        <div className="flex w-[90%] justify-center mx-auto m-2">
          <button
            onClick={() => handleClick('Economy')}
            className={`rounded-l-lg  px-4 py-2 border w-[50%] 
                      ${selectedClass === 'Economy' ? 'bg-blue-100 text-blue-700 border-blue-500 ' : 'bg-gray-100 text-black'}`}
          >
            Economy
          </button>
          <button
            onClick={() => handleClick('Business')}
            className={`rounded-r-lg  px-4 py-2 border w-[50%] 
                      ${selectedClass === 'Business' ? 'bg-blue-100 text-blue-700 border-blue-500' : 'bg-gray-100 text-black'}`}
          >
            Business
          </button>
        </div>
      </div>)}
    </div>  
  );
};

export default Booking;
