import React from 'react'
import './collection.css'
import { Link } from 'react-router-dom'
import img from './Beige Minimalist Fashion Sale Instagram Story (1).png'
import img2 from './Beige Minimalist Fashion Sale Instagram Story.png'
import img3 from './op.png'
import img4 from './sa.png'


const EssintalCollection = () => {
    const Data = [
        {
            id: 1,
            img: img,
            // collectionName: "Mens",
            href:"/Mens-Kurta"
        },
        {
            id: 2,
            img:img2,
            // collectionName: "Kids Fashion",
            href:"/Kids"
        },
        {
            id: 3,
            img: img3,
            // collectionName: "Traditional Kurta",
            href:"/Kurta"
        },
        {
            id: 4,
            img: img4,
            // collectionName: "Women Sarees",
            href:"/Womens-Sarees"
        }
    ]
    return (
        <div className='w-full mt-12'>
            <div className='text-center py-2 md:py-5'>
                <h1 className='md:text-3xl text-pretty mb-2 text-2xl font-bold'>The Essential Collection</h1>
                <p className='md:tracking-wide font-meduim text-base md:text-xl	'>Shop the latest products from the most popular collections</p>
            </div>
            <div className='mt-5 p-2'>
                <div className='w-full grid grid-cols-2 md:grid-cols-4 space-x-3 gap-2'>
                    {Data.map((item, index) => (
                        <div className=' p-1 md:p-2' key={index}>
                            <Link className='relative'>
                                <img src={item.img} className='w-full imgs-collections h-64 md:h-96 object-cover object-top' alt={item.collectionName} />

                                <button className=' whitespace-nowrap collectionbtns'>{item.collectionName}</button>

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EssintalCollection