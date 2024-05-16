import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DynamicCollections = () => {
    const { Collection } = useParams();
    const [categoryImage, setCategoryImage] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/get-category`);
            const dataOfRes = res.data.data;
            const filterRes = dataOfRes.filter(item => item.MainCategory === Collection);
            setCategoryImage(filterRes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [Collection]);

    useEffect(() => {
        setBreadcrumb([
            { name: 'Home', link: '/' },
            { name: 'Shop', link: '/Shop' },
            { name: Collection, link: `/Collection/${Collection}` }
        ]);
    }, [Collection]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categoryImage.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(categoryImage.length / itemsPerPage);

    return (
        <div className='container mx-auto'>
            {/* Breadcrumbs */}
            <nav className="flex bg-gray-900 h-52 my-4">
                <ol className="flex w-full justify-center text-center items-center space-x-2">
                    {breadcrumb.map((crumb, index) => (
                        <li className='text-center' key={index}>
                            <Link to={crumb.link} className="text-white text-sm md:text-xl hover:underline">
                                {crumb.name}
                            </Link>
                            {index !== breadcrumb.length - 1 && <span className="text-red-400 mx-2">/</span>}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Category images */}
            <div className='grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {currentItems.map((item, index) => (
                    <div key={index} className='card relative overflow-hidden rounded-lg'>
                        <img src={item.CatImg} alt={item.title} className='w-full h-auto transition duration-300 transform hover:scale-105' />
                        <div className='absolute inset-0 flex justify-center items-center opacity-0 bg-black bg-opacity-50 hover:opacity-100 transition-opacity'>
                            <Link to={`/Product-page/${item.title}`} className='bg-gray-500 text-white py-2 px-6 rounded-lg'>
                                {item.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center mt-6'>
                <nav>
                    <ul className='flex list-none'>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`mx-1 px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'} cursor-pointer`} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default DynamicCollections;
