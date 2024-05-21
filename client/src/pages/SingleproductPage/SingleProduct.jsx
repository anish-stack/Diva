import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import payment from '../../assets/payment.png';
import NewArrival from '../../components/Collections/New Arrival/NewArrival';
import QualityFooter from '../../components/Others/QualityFooter'
import CollectionWithBanner from '../../components/Collections/CollectionWithBanner/CollectionWithBanner'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleData } from '../../store/slices/singleProductslice';
import axios from 'axios';
import { addItem } from '../../store/slices/CartSlice';
import toast from 'react-hot-toast';
const SingleProduct = () => {
    const { name, id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const dispatch = useDispatch()
    const fetchSingleProduct = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.thedivastory.com/api/get-products-name/${name}/${id}`);
            console.log(response.data);
            setProduct(response.data.data); // Assuming response.data is the product object
        } catch (error) {
            console.log(error);
        }
    }, [name, id]);

    useEffect(() => {

        fetchSingleProduct();
    }, [fetchSingleProduct]);
    useEffect(() => {
 
    
        window.scrollTo({
            top: 0,
            
            behavior: "smooth"
        });
    
    }, [id, name]);
    
    



    // useEffect(() => {
    //     setNav1(sliderRef1);
    //     setNav2(sliderRef2);
    // }, []);
    const handleSmallImageClick = (image) => {
        // Update the bigImage property with the clicked image path
        setProduct({ ...product, bigImage: image });
    };

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleClickSize = (size) => {
        console.log(size)
        setSelectedSize(size);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    const handleAddToCartClick = () => {
        if (!selectedSize) {


            if (selectedSize) {
                handleAddToCart(selectedSize);
            } else {
                console.error('No sizes available for this product.');
                // Handle the case where no sizes are available, e.g., show an error message to the user.
            }// Provide default value for color index
        } else {
            // If size is selected, call handleAddToCart with selected size and color
            handleAddToCart(selectedSize); // Provide default value for color index
        }
    };

    const handleAddToCart = (selectedSize) => {
        // Construct the product object with selected size, color, and quantity

        const selectedProduct = {
            ...product,
            size: selectedSize,

            quantity: quantity // Assuming quantity is already set elsewhere in your code
        };

        // Dispatch addItem action with the selected product to add to cart
        dispatch(addItem(selectedProduct));
        // Optionally, you can show a success message or perform any other action after adding to cart
        console.log('Product added to cart:', selectedProduct);
    };
    const mapSizeToFullName = (abbreviation) => {
        switch (abbreviation) {
            case 'S':
                return 'Small';
            case 'M':
                return 'Medium';
            case 'L':
                return 'Large';
            case 'X':
                return 'XL';
            default:
                return abbreviation; // If the abbreviation doesn't match, return it as is
        }
    };





    return (
        <div className='w-full mt-5'>

            {/* Bread Crumbs */}
            <nav className="flex bg-gray-200 py-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="/Shop" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Products</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{product ? product.collectionName || "s" : ""}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* main-single-product */}
            <div className='max-w-screen-xl  mx-auto py-3 px-3 min-h-screen'>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <div className='w-full md:w-[600px  h-full] md:h-[600px] gap-3 flex md:space-x-3'>
                        <div className='hidden md:block small-imgs mt-2 px-2'>
                            <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                <img
                                    onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                    onMouseEnter={() => handleSmallImageClick(product ? product.img : "")}
                                    src={product ? product.img : ""}
                                    className='w-full mb-2 h-full object-cover'
                                    alt=""
                                />
                            </div>
                            <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                <img
                                    onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                    onMouseEnter={() => handleSmallImageClick(product ? product.secondImg : "")}
                                    src={product ? product.secondImg : ""}
                                    className='w-full mb-2 h-full object-cover'
                                    alt=""
                                />
                            </div>
                            <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                <img
                                    onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                    onMouseEnter={() => handleSmallImageClick(product ? product.thirdImage : "")}
                                    src={product ? product.thirdImage : ""}
                                    className='w-full mb-2 h-full object-cover'
                                    alt=""
                                />
                            </div>
                            <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                <img
                                    onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                    onMouseEnter={() => handleSmallImageClick(product ? product.fourthImage : "")}
                                    src={product ? product.fourthImage : ""}
                                    className='w-full mb-2 h-full object-cover'
                                    alt=""
                                />
                            </div>
                        </div>
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className='w-full relative bigimage  h-[450px] md:h-[600px] '
                        >
                            <img
                                src={product && product.bigImage ? product.bigImage : (product && product.fourthImage ? product.img : "")}
                                className='w-full h-full md:h-full object-cover object-center'
                                alt=""
                            />

                            <div className='tag'>
                                {product ? product.whatShowAtPercentage : ""}
                            </div>
                        </motion.div>
                    </div>
                    <div className=' md:hidden flex gap-2 small-imgs mt-2 px-2'>
                        <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.img : "")}
                            src={product ? product.img : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                        <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.secondImg : "")}
                            src={product ? product.secondImg : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                        <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.thirdImage : "")}
                            src={product ? product.thirdImage : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                        <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.fourthImage : "")}
                            src={product ? product.fourthImage : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                    </div>
                    <div className='w-full'>
                        <div className=' min-h-screen'>
                            <p className=' text-xl md:text-3xl font-medium mb-2'>{product ? product.productName : ""}</p>

                            <div className='w-full '>
                                <p className=' text-xm md:text-lg text-pretty mt-2 md:mt-4'>{product ? product.description : ""}</p>
                            </div>

                            <div className='prices'>
                                <p className='text-base font-semibold text-[#E51515]'><span className='text-xl text-gray-900'>Offer Price: </span> Rs  {product ? product.discountPrice : ''} <del className='text-[14px] text-gray-500'> {product ? product.mainPrice : ''}</del> <span className='text-xs text-red-400'>{product ? product.percentage : ''}% Off</span> </p>
                            </div>
                            <div>
                                {product ? (
                                    <div className='sizes flex mt-3 gap-2'>
                                        {product.sizes.map((sizeObject, index) => (
                                            <p
                                                onClick={(e) => handleClickSize(mapSizeToFullName(Object.values(sizeObject).find(value => typeof value === 'string')))}
                                                className={` shadow-md py-1 px-3 cursor-pointer ${selectedSize === mapSizeToFullName(Object.values(sizeObject).find(value => typeof value === 'string')) ? 'bg-green-400' : 'bg-white'}`}
                                                key={index}
                                            >
                                                {mapSizeToFullName(Object.values(sizeObject).find(value => typeof value === 'string'))}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>




                            <div className='flex  mt-5 items-start justify-between'>
                                <div className="flex justify-between border-2 w-[40%]  rounded-[40px] border-black items-center">
                                    <button onClick={handleDecrement} className="  font-extrabold text-lg text-gray-900 px-5 py-1 rounded-md ml-2">-</button>
                                    <span className='text-lg font-bold'>{quantity}</span>
                                    <button onClick={handleIncrement} className="  font-extrabold text-lg text-gray-900 px-5 py-1 rounded-md mr-2">+</button>
                                </div>
                                <div className="flex border-2 w-[100%] rounded-[40px] border-white items-center">
                                    <button onClick={handleAddToCartClick} className='py-2 w-full rounded-[40px] bg-gray-900 text-white'>Add To Cart</button>
                                </div>
                            </div>
                            <div className="otherdetails mt-6">
                                <table className="border-collapse text-left border border-gray-300">
                                    <tbody>
                                        <tr className="border-b border-gray-300">
                                            <th className="border-r w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">SKU:</th>
                                            <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.SKU ? product.SKU : ""}</td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <th className="border-r  w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">Availability:</th>
                                            <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.availability ? "In Stock" : "Out Of Stock"}</td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <th className="border-r  w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">Categories:</th>
                                            <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.categories ? product.categories : ""}</td>
                                        </tr>
                                        <tr>
                                            <th className="border-r  w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">Tags:</th>
                                            <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.tags && product.tags.length > 0 ? product.tags : "N.A"}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                            <div className='payment-foot mt-5 w-[100%] '>
                                <img src={payment} className='w-full object-cover object-center' alt="" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* products */}
            <CollectionWithBanner />
            <NewArrival />
            <QualityFooter />

        </div>
    )
}

export default SingleProduct