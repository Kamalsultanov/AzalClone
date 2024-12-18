import React from 'react'

import Slider from './Slider';
import SpecialOffer from './offers/SpecialOffer';
import Booking from '../header/Booking';

function Main() {
  return (
    <div>
      <div className='bg-[#01357e] '>
        <Booking/>
      </div>
      <div>
          <Slider />
        < SpecialOffer/>
      </div>
    </div>
  )
}

export default Main