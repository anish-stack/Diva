import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import './Slider.css';

const CustomSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActiveSlider = async () => {
        try {
            const response = await axios.get('https://api.thedivastory.com/api/get-Banners');
            setSlider(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActiveSlider();
    }, []);

    const settings = {
        className: "w-full h-full",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        swipeToSlide: true,
        autoplaySpeed: 1500,
        fade: true,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className='max-w-[1600px] mx-auto'>
            <Slider {...settings}>
                {slider && slider.map((slide, index) => (
                    <div 
                        key={index} 
                        style={{ backgroundImage: `url(${slide.image})` }} 
                        className=''
                    >
                        {/* Optionally, you can use an img element */}
                        <img src={slide.image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CustomSlider;
