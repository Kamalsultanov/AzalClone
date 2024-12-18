import React, { useContext, useState } from "react";
import { DATA } from "../../Context/DataContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiAirplaneDeparture } from "react-icons/gi";

function Locations({ onCountryClick }) {

  const { from } = useContext(DATA);
  const [focusedInput, setFocusedInput] = useState("from"); 
  const [inputValue, setInputValue] = useState("");

  if (!from || from.length === 0) {
    return console.log('Nope');
  }

  return (
    <>
      <div className="flex border rounded-md border-gray-300 focus-within:ring-1 focus-within:ring-blue-500">
        <input
          type="text"
          className="w-full p-2 outline-none rounded-md peer workfontb"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          onFocus={() => setFocusedInput("from")} 
          placeholder=""
        />
        <span className="p-2">
          <FaMagnifyingGlass size={20} color="#333539" />
        </span>
        <label
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        >
          {focusedInput === "from" ? "From" : "To"}
        </label>
      </div>
      <ul className="flex-col overflow-y-auto max-h-[75vh] specialscrollbar my-3">
        {inputValue &&
          from
            .filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.code.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <li
                key={item.code}
                className="flex items-center w-[100%] p-1 cursor-pointer hover:bg-gray-100"
                onClick={() => onCountryClick(item)}
              >
                <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.name}
                </span>
                <span className="ml-auto mr-2 text-[#6E7583]">{item.code}</span>
              </li>
            ))}
      </ul>
    </>
  );
}

export default Locations;
