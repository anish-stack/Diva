import React from 'react'
import './collectionwithbanner.css'
import ops from '../../../assets/opsss.jpg'
import ps from '../../../assets/po.jpg'
import { Link } from 'react-router-dom'

const CollectionWithBanner = () => {
  return (
    <div className='w-full py-3'>
      <div className='max-w-[1400px] mx-auto mt-5 p-2'>
        <div className='grid grid-cols-1  space-x-3 gap-2 md:grid-cols-2'>
          <div className='w-full hovers transition-all ease-in-out md:h-[70vh] rounded-xl relative shadow-2xl '>
            <img src={ops} className='w-full h-full transition-all ease-in-out object-cover object-center relative' alt="" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='content flex items-center justify-center'>
              <div>
     

                <Link to={'/Shop'} className='btn-views'>Shop Now</Link>
              </div>
            </div>
          </div>
          <div className='w-full hovers transition-all ease-in-out rounded-xl  md:h-[70vh]  relative shadow-2xl'>
            <img src={ps} className='w-full h-full transition-all ease-in-out object-cover object-center relative' alt="" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='content flex items-center justify-center'>
     
              <Link to={'/Shop'} className='btn-views'>View Collection</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionWithBanner
