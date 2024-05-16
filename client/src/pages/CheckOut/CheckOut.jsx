import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
const CheckOut = () => {

    const items = sessionStorage.getItem('checkOut') || []
    useEffect(() => {
        const itemss = JSON.parse(sessionStorage.getItem('checkOut')) || [];
        if (itemss.length === 0) {
            window.location.href = "/Shop";
        }
    }, []);
    const finalPrice = sessionStorage.getItem('FinalPrice') || {};
    const userInfo = sessionStorage.getItem('user');
    const parsedItem = JSON.parse(items)
    const price = parsedItem.FinalPrice
    const token = sessionStorage.getItem('token')


    const parsedUser = JSON.parse(userInfo)

    const [formData, setFormData] = useState({
        items: parsedItem.Items,
        finalPrice: parsedItem.FinalPrice,
        UserInfo: {
            Name: parsedUser?.name || "",
            Email: parsedUser?.email || "",
            userid: parsedUser?._id
        },
        UserDeliveryAddress: {
            Street: "",
            HouseNo: "",
            Pincode: "",
            State: "",
            City: "",
            landMark: ""
        },
        PaymentMode: "Online" // Default payment mode
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            UserDeliveryAddress: {
                ...formData.UserDeliveryAddress,
                [name]: value
            }
        });
    };

    const handlePaymentModeChange = (e) => {
        setFormData({
            ...formData,
            PaymentMode: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.items.length === 0) {
            toast.error('Please Add Item In Cart', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
            return; // Exit the function early if items are empty
        }

        try {
            const response = await axios.post('http://localhost:4000/api/Make-Orders', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("response", response.data);

            sessionStorage.removeItem('checkOut');
            sessionStorage.removeItem('cart');

            if (formData.PaymentMode === 'Online') {
                const redirectUrl = response.data.payData.data.instrumentResponse.redirectInfo.url;
                window.location.href = redirectUrl;
            } else if (formData.PaymentMode === 'COD') {
                const redirectUrl = '/Payment-Status/Cash-on-Delivery?success=true';
                window.location.href = redirectUrl;
            }
        } catch (error) {
            console.log("error", error);
            const redirectUrl = '/Payment-Status/server-error-payment?success=false';
            window.location.href = redirectUrl;
        }
    };


    return (
        <div className="max-w-2xl  shadow-xl  p-4 mx-auto">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit} className=" bg-gray-100 py-2 px-5 space-y-4">
                <div className='grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="name" className="block w-full text-sm font-medium text-gray-700">Name</label>
                        <input id="name" type="text" name="Name" value={formData.UserInfo.Name} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="email" className="block w-full text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" name="Email" value={formData.UserInfo.Email} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="street" className="block w-full text-sm font-medium text-gray-700">Street</label>
                        <input id="street" type="text" name="Street" value={formData.UserDeliveryAddress.Street} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="houseNo" className="block w-full text-sm font-medium text-gray-700">House No</label>
                        <input id="houseNo" type="text" name="HouseNo" value={formData.UserDeliveryAddress.HouseNo} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>

                </div>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="pincode" className="block w-full text-sm font-medium text-gray-700">Pincode</label>
                        <input id="pincode" type="text" name="Pincode" value={formData.UserDeliveryAddress.Pincode} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="state" className="block w-full text-sm font-medium text-gray-700">State</label>
                        <input id="state" type="text" name="State" value={formData.UserDeliveryAddress.State} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="city" className="block w-full text-sm font-medium text-gray-700">City</label>
                        <input id="city" type="text" name="City" value={formData.UserDeliveryAddress.City} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>

                </div>
                <div className='w-full'>
                    <label htmlFor="landMark" className="block w-full text-sm font-medium text-gray-700">Landmark</label>
                    <input id="landMark" type="text" name="landMark" value={formData.UserDeliveryAddress.landMark} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                </div>
                <div className='w-full'>
                    <label htmlFor="paymentMode" className="block w-full text-sm font-medium text-gray-700">Payment Mode</label>
                    <select id="paymentMode" value={formData.PaymentMode} onChange={handlePaymentModeChange} className="w-full py-2 px-3">
                        <option value="Online">Online</option>
                        <option value="COD">Cash on Delivery</option>
                    </select>
                </div>
                <button type="submit" className=" text-center bg-green-400 py-1 px-5 mt-2">Proceed to Pay</button>
            </form>
        </div>
    );
};

export default CheckOut;
