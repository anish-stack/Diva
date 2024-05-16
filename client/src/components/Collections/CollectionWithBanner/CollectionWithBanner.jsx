import React from 'react'
import './collectionwithbanner.css'
import ops from '../../../assets/opsss.jpg'
import ps from '../../../assets/po.jpg'

const CollectionWithBanner = () => {
  return (
    <div className='w-full py-3'>
      <div className='max-w-[1400px] mx-auto mt-5 p-2'>
        <div className='grid grid-cols-1  space-x-3 gap-2 md:grid-cols-2'>
          <div className='w-full hovers transition-all ease-in-out md:h-[70vh] rounded-xl relative shadow-2xl '>
            <img src={ops} className='w-full h-full transition-all ease-in-out object-cover object-center' alt="" />
            <div className='content'>
              <div>
                {/* <h2 className='text-gray-900'>Traditional Kurta For Men</h2>
                <h2>Collection</h2>
                <p className='text-white'>These kurtas for men are also known as Khan kurtas and are available in a plethora of prints, embellishments and patterns. This ensures that there is a perfect ...
</p> */}

                {/* <button className='btn-views'>Shop Now</button> */}
              </div>
            </div>
          </div>
          <div className='w-full hovers transition-all ease-in-out rounded-xl  md:h-[70vh]  relative shadow-2xl'>
            <img src={ps} className='w-full h-full transition-all ease-in-out object-cover object-center' alt="" />
            <div className='content'>
              {/* <div>
                <h2 className='text-gray-900'> Beautiful Women Saree</h2>
                <h2>Collection</h2>
                <p className='text-white'>We have a wide range of styles, which includes the beautiful ombre-dyed sarees, georgette sarees, embroidered and printed sarees ...
</p>

                <button className='btn-views'>View Collection</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionWithBanner
