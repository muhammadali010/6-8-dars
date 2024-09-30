import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const nameRef = useRef();
  const priceRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/home');
    } else {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://auth-rg69.onrender.com/api/products/all');
          if (response) {
            response.status == 200
            const data = await response.json();
            setProducts(data);
          } else {
            console.error('Failed to fetch products:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProducts();
    }
  }, [navigate]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name: nameRef.current.value,
      price: priceRef.current.value,
    };

    try {
      const response = await fetch('https://auth-rg69.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productData),
      });

      if (response) {
        response.status == 200
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        console.log('Product created:', newProduct);
      } else {
        console.error('Failed to create product:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Products</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105" >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600"> Price: <span className="text-indigo-600 font-bold">${product.price}</span></p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateProduct} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create a New Product</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input type="text" ref={nameRef}className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Product Price</label>
            <input type="number" ref={priceRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-300">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
