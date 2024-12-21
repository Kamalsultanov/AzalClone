import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Reservation() {
  const location = useLocation();
  const bookingData = location.state;

  console.log(bookingData);

  // Date Generator

  const [outboundDates, setOutboundDates] = useState([]);
  const [selectedOutboundDate, setSelectedOutboundDate] = useState(null);

  const getDateRange = (startDate, days = 6) => {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }

    return dates;
  };
  useEffect(() => {
    if (bookingData?.outboundDate) {
      const dates = getDateRange(bookingData.outboundDate);
      setOutboundDates(dates);
    }
  }, [bookingData]);

  //  Flight Button
  const [selected, setSelected] = useState(0);
  const handleClick = (index) => {
    setSelected(index);
  };


  return (
    <div className="h-[100vh] bg-[#edf1f4] p-2 pt-24">
      {/* ----------------FLIGHT BUTTONS--------------*/}
      <div id="FlightButtons" className="my-5">
        <div className="w-full flex justify-between">
          <button
            onClick={() => handleClick(0)}
            className={` border border-[ #c1c8d1] rounded-lg h-10 p-1 px-2 items-center flex ${
              selected === 0
                ? "bg-[#37a6db] w-[90%]"
                : " border-2 border-[ #c1c8d1]"
            }`}
          >
            <MdFlightTakeoff
              className={`${selected === 0 ? "text-white" : "text-[#8d9094]"}`}
              size={23}
            />
            <p
              className={` font-semibold text-[0.8em] p-2 ${
                selected === 0 ? "block text-white" : "hidden"
              }`}
            >
              Choose outbound flight
            </p>
          </button>
          <button
            onClick={() => handleClick(1)}
            className={` border border-[ #c1c8d1] rounded-lg h-10 p-1 px-2 items-center flex ${
              selected === 1
                ? "bg-[#37a6db] w-[90%]"
                : " border-2 border-[ #c1c8d1]"
            }`}
          >
            <MdFlightLand
              className={`${selected === 1 ? "text-white" : "text-[#8d9094]"}`}
              size={23}
            />
            <p
              className={` p-2  font-semibold text-[0.8em] ${
                selected === 1 ? "block text-white" : "hidden"
              }`}
            >
              Choose return flight
            </p>
          </button>
        </div>
      </div>
      {/* ----------------SLIDER--------------*/}
      <div id="SliderForDates">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={2}
          slidesPerView={8}
          pagination={{ clickable: true }}
          className="w-full flex items-center"
        >
          <SwiperSlide>
            <div>
              <div className="bg-white w-8 h-8 flex justify-center items-center rounded-full text-[0.8em] border-2 border-[#CDD5DF]">
                <p className=" font-semibold">
                  {" "}
                  <IoIosArrowBack />
                </p>
              </div>
            </div>
          </SwiperSlide>
          {outboundDates.map((date, index) => {
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dayOfMonth = date.getDate();
            return (
              <SwiperSlide
                key={index}
                onClick={() => handleOutboundDateSelect(date)}
              >
                <div className="flex flex-col items-center text-center ">
                  <div className="bg-white w-8 h-8 flex justify-center items-center rounded-full text-[1em] border-2 border-[#CDD5DF]">
                    <p className=" font-semibold">{dayOfMonth}</p>
                  </div>
                  <p className="text-[0.8em] p-1">{weekday}</p>
                </div>
              </SwiperSlide>
            );
          })}
          <SwiperSlide>
            <div>
              <div className="bg-white w-8 h-8 flex justify-center items-center rounded-full text-[0.8em] border-2 border-[#CDD5DF]">
                <p className=" font-semibold">
                  {" "}
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* ----------------SLIDER--------------*/}
      <div id="CardContainer"></div>
    </div>
  );
}

export default Reservation;
