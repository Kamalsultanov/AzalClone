import React from 'react'

import Slider from './Slider';
import SpecialOffer from './offers/SpecialOffer';
import Booking from '../header/Booking';

function Main() {
  return (
    <div>
      <div id='headermain' className=''>
        <div className='bg-[#01357e]  sm:bg-transparent h-[70vh] flex justify-center'>
          <Booking />
        </div>
      </div>
      <div>
          <Slider />
        < SpecialOffer/>
      </div>
    </div>
  )
}

export default Main