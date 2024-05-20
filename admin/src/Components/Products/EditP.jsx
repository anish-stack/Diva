import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProject = () => {
  const { id, name } = useParams();

  const [load, setLoad] = useState(false);
  const [formdata, setFormdata] = useState({
    productName: '',
    sizes: [],
    discountPrice: '',
    mainPrice: '',
    whatShowAtPercentage: '',
    percentage: '',
    collectionName: '',
    description: '',
    SKU: '',
    availability: true,
    categories: '',
    tags: '',
  });

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/get-products-name/${name}/${id}`);
        const fetchedData = response.data.data;
        console.log(fetchedData);
        // Update formdata with fetched data
        setFormdata({
          productName: fetchedData.productName,
          sizes: fetchedData.sizes || [], // Assuming sizes is an array
          discountPrice: fetchedData.discountPrice,
          mainPrice: fetchedData.mainPrice,
          percentage: fetchedData.percentage,
          whatShowAtPercentage: fetchedData.whatShowAtPercentage,
          collectionName: fetchedData.collectionName,
          description: fetchedData.description,
          SKU: fetchedData.SKU,
          categories: fetchedData.categories,
          tags: fetchedData.tags,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchMainData();
  }, [id, name]);

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'size' || name === 'discountPrice' || name === 'mainPrice') {
      const sizes = [...formdata.sizes];
      sizes[index][name] = value;
      setFormdata({
        ...formdata,
        sizes
      });
    } else if (name === 'file') {
      setFormdata({
        ...formdata,
        [name]: e.target.files[0]
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value
      });
    }
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    let updatedFormdata = { ...formdata, [name]: value };

    if (name === 'mainPrice' || name === 'percentage') {
      const mainPrice = name === 'mainPrice' ? value : formdata.mainPrice;
      const percentage = name === 'percentage' ? value : formdata.percentage;
      if (mainPrice && percentage) {
        const discountPrice = (mainPrice - (mainPrice * (percentage / 100))).toFixed(2);
        updatedFormdata = { ...updatedFormdata, discountPrice };
      }
    }

    setFormdata(updatedFormdata);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const previews = fileArray.map(file => URL.createObjectURL(file));

    setFormdata((prevProduct) => ({
      ...prevProduct,
      files: files
    }));

    setImagePreviews(previews);
  };

  const predefinedSizes = ['Small', 'Medium', 'Large', 'XL'];

  const handleCheckboxChange = (size) => {
    console.log(size)
    setFormdata((prevState) => {
      const sizes = prevState.sizes.includes(size)
        ? prevState.sizes.filter((s) => s !== size)
        : [...prevState.sizes, size];
      return { ...prevState, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log(formdata)
    try {
      // Make Axios request
      const response = await axios.patch(`http://localhost:4000/api/update-products/${id}`, formdata);
      console.log(response.data); // Assuming you want to log the response
      toast.success('Product Updated');
      setLoad(false);
    } catch (error) {
      toast.error('Error in Updating');
      console.error('Error:', error);
    }
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thedivastory.com/api/get-tags');
        setTags(response.data.data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchData();
  }, []);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataCat = async () => {
      try {
        const response = await axios.get('https://api.thedivastory.com/api/get-all-main-category');
        console.log(response.data.data);
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setIsLoading(false); // Update loading state even if there's an error
      }
    };

    fetchDataCat();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Information */}
        <div className='flex w-full items-center justify-center gap-2'>
          <div className='w-1/2'>
            <input type="text" value={formdata.productName} onChange={handleChange} name="productName" placeholder="Product Name" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          </div>
          <div className='w-1/2'>
            <select
              id="tags"
              name="tags"
              value={formdata.tags}
              onChange={handleChange}
              className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select a tag</option>
              {tags.map(tag => (
                <option key={tag._id} value={tag.title}>{tag.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex gap-2 justify-between'>
          <select onChange={handleChange} value={formdata.categories} name="categories" className='block w-[49%] border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50' id="">
            <option value="">---select category---</option>
            {categories && categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input type="text" value={formdata.SKU} onChange={handleChange} name="SKU" placeholder="SKU" className="block w-[49%] border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          {imagePreviews.length > 0 && (
            <div className="image-previews flex gap-2 items-start ">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover mb-2 rounded-md" />
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input type="file" name="images" multiple className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" onChange={handleFileChange} />
        </div>
        <div className='flex gap-2'>
          <input
            type="text"
            name="mainPrice"
            placeholder='Main Price'
            value={formdata.mainPrice}
            onChange={handleDiscountChange}
            className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <input
            type="text"
            name="percentage"
            value={formdata.percentage}
            placeholder='How Much Discount Percentage'
            onChange={handleDiscountChange}
            className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <input
            type="text"
            name="discountPrice"
            value={formdata.discountPrice}
            placeholder='Discount Price'
            onChange={handleDiscountChange}
            className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div className='flex gap-2'>
          <input type="text" name="whatShowAtPercentage" value={formdata.whatShowAtPercentage} placeholder='What Show At Percentage Tag' onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          <input type="text" name="collectionName" placeholder='Collection Name' value={formdata.collectionName} onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <div className='mb-4 flex gap-2 '>
            {predefinedSizes.map((size, index) => (
              <div key={index} className='mb-2 justify-center'>
                {/* {console.log(formdata.sizes)} */}
                <input
                  type='checkbox'
                  id={`size-${index}`}
                  checked={formdata.sizes.includes(size)}
                  onChange={() => handleCheckboxChange(size)}
                  className='mr-2'
                />
                <label htmlFor={`size-${index}`} className='capitalize'>{size}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <textarea value={formdata.description} onChange={handleChange} name="description" placeholder="description" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>

        <button
          type="submit"
          disabled={load}
          className="px-4 py-2 bg-green-500 capitalize text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
        >
          {load ? 'Please Wait' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EditProject;
