import React, { useEffect, useState } from 'react'
import './NewArrival.css'
import QucikView from './QucikView'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../../../store/slices/product.slice'
const NewArrival = () => {
    const dispatch = useDispatch();
    const [showQuickView, setShowQucikView] = useState(false)
    const [items, setItems] = useState(false)
    const { data, status, error } = useSelector((state) => state.product);


    useEffect(() => {
        // Dispatch the fetchData thunk when the component mounts
        dispatch(fetchData());
    }, [dispatch]);
    // console.log(data)
    const handleShowQuickView = (item, index) => {
        setShowQucikView(true)
    
        setItems(item)

    }
    const handleClose = () => {
        setShowQucikView(false)
    }



    return (
        <div className='w-full mt-12'>
            <div className='text-center py-2 md:py-5'>
                <h1 className='md:text-3xl text-pretty mb-2 text-2xl font-bold'>Girls Fashion</h1>
                <p className='md:tracking-wide font-meduim text-base md:text-xl	'>Shop the trending products and most buy of the week</p>
            </div>
            <div className='mt-5 p-2'>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-x-3 gap-2'>
                    {data && data.slice(0,5).reverse().map((item, index) => (
                            
                        <div className=' p-1 md:p-2' key={index}>
                           
                            <div className='relative first-img '>
                                <Link className='relative first-img' to={`/single-product/${item._id}/${item.productName}`}>

                                    <img src={item.img} className='w-full relative transition-all duration-500 ease-linear  h-64 md:h-[23rem] object-cover object-center' alt={item.collectionName} />
                                    <img src={item.secondImg} className='w-full transition-all duration-500 ease-linear  second-img absolute top-0 opacity-0 h-64 md:h-[23rem] object-cover object-center' alt={item.secondImg} />
                                </Link>
                                <div className='buttons'>
                                    <ul>
                                        <li onClick={() => handleShowQuickView(item, index)}><i className="ri-eye-fill"></i></li>
                                        <li><i className="ri-shopping-bag-4-line"></i></li>
                                        <li><i className="ri-heart-fill"></i></li>

                                    </ul>
                                </div>
                                <div className='product-information text-center'>
                                    <p className='text-xl font-medium mb-2'>{item.productName}</p>
                                    <div className='prices'>
                                        <p className='text-base font-semibold text-[#E51515]'>Rs <del className='text-gray-500'>{item.mainPrice}</del> {item.discountPrice}</p>
                                    </div>
                                </div>
                                {/* <h3 className='text-xl font-bold text-red-500'>
                                    <del className='text-gray-300 font-thin'>{item.sizes[0].mainPrice}</del> {item.sizes[0].discountPrice}
                                </h3> */}
                                <div className='tag'>
                                    {item.whatShowAtPercentage}
                                </div>
                            </div>
                        </div>
                 
              

            ))}
                
                </div>
            </div>
            <QucikView showQuickView={showQuickView} handleClose={handleClose} item={items} />
        </div>)
}

export default NewArrival