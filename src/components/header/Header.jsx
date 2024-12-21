import React from 'react'
import Logo from '../../assets/icons/logo.svg';
import { BsCurrencyExchange } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

import { HiBars3 } from "react-icons/hi2";
import Booking from './Booking';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <>
      <div className='bg-transparent relative h-[0px]  top-0 w-full  ' >
        <div  className='flex items-center justify-between'>
            <div>
              <Link to={`/`}> <img src={Logo} alt="Logo" className='p-4' /></Link>      
            </div>
            <div className='flex items-center'>
              <span className='p-2 bg-slate-100 bg-opacity-10 rounded-lg m-1'>
                <BsCurrencyExchange size={20}  color='white' />
              </span>
              <span className='p-2  bg-slate-100 bg-opacity-10 rounded-lg m-1'>
                <CiGlobe color='white ' size={20} />
              </span>
              <span className='p-2  bg-slate-100 bg-opacity-10 rounded-lg m-1'>
                <IoPersonOutline color='white' size={20} />
              </span>
              <span className='p-2  bg-slate-100 bg-opacity-10 rounded-lg m-1'>
                <HiBars3 color='white' size={20} />
              </span>
          </div>
        </div>

    </div>
    </>
  )
}

export default Header