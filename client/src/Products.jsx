import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { addProducts, deleteProducts } from './redux/slices/productSlice'
const Products = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categorySlice?.category)
  const products = useSelector((state) => state?.productSlice?.products)

  const category = useParams().category || 'all'

  // delete product

  const [error, setError] = useState('Product has been deleted')
  const deleteProduct = async (id) => {
    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/product/delete`,
      {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          Accept: '*/*',
          'Content-type': 'application/json',
        },
      },
    )
    const response = await request.json()
    if (response.error) {
      alert(response.message)
      return
    }

    alert(response.message)
    dispatch(deleteProducts({ id: [id] }))
  }

  // add product
  const addProduct = async (e) => {
    e.preventDefault()
    const payload = {}
    const data = new FormData(e.target)
    for (const [key, value] of data.entries()) {
      payload[key] = value
    }
    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/product/add`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: '*/*',
          'Content-type': 'application/json',
        },
      },
    )
    const response = await request.json()
    e.target.reset()
    if (response.error) {
      alert(response.message)
      return
    }

    alert(response.message, response.product, 'sanket')
    dispatch(addProducts({ product: response.product }))
  }

  const user = useSelector((state) => state?.userSlice?.user)
  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <section >
      <h4 className="text-lg font-semibold my-4 p-4">Add products</h4>
      <div className="bg-white rounded-lg w-[90%] border-2 border-white mx-auto py-4 shadow-md bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1380')] bg-cover">
        <form
          onSubmit={addProduct}
          className="flex w-[90%] lg:w-max mx-auto flex-wrap items-center justify-start"
        >
          <div className="my-4 w-56 mx-2">
            <h4>Product name</h4>
            <input
              type="text"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              //   placeholder="email is your useraname"
              name="name"
            />
          </div>
          <div className="my-4 w-56 mx-2">
            <h4>Enter price</h4>
            <input
              type="number"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              //   placeholder="email is your useraname"
              name="price"
            />
          </div>
          <div className="my-4 w-56 mx-2">
            <h4>Category</h4>
            <select
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              //   placeholder="email is your useraname"
              name="category"
            >
              {/* <option value="-">Select category</option> */}

              {categories?.map((i, index) => (
                <option key={index} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 w-56 mx-2">
            <button className="bg-sky-500 mt-8 text-white py-2 px-4 rounded-md">
              Add +
            </button>
          </div>
        </form>
      </div>
     
      <div className="flex items-center space-x-2 m-4">
        <h4>Filter by category</h4>
        <select onChange={(e) => navigate(`/products/${e.target.value}`)} className="p-2 px-4 bg-white shadow-sm outline-none text-main">
          {categories.map((obj) => (
            <option value={obj.name}>{obj.name}</option>
          ))}
        </select>
      </div>
      <h4 className="text-sm text-slate-500 my-4 p-4">
        Showing products from {category} category
      </h4>
      <div className="flex justify-center items-start w-90% mx-auto p-4 relative flex-wrap">
        <h4 className="text-lg font-bold text-slate-500">
          {products?.filter(
            (obj) => obj.category === category || category === 'all',
          ).length === 0 && 'There is no product under this category'}
        </h4>
        {products
          ?.filter((obj) => obj.category === category || category === 'all')
          ?.map(({ thumbnail, name, price, category, id }, i) => (
            <div
              key={i}
              className="p-2 md:px-4 bg-white shadow-sm outline-none text-main bg-white border-2 border-slate-600 m-3 w-36 h-52 p-4 relative"
            >
              <img
                src={thumbnail}
                alt={name}
                className="w-full h-[70%] border"
              />
              <h4 className="text-lg text-slate-900 mt-2">{name}</h4>
              <h4 className="text-slate-700 text-sm "> Price : ₹{price}</h4>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => confirm('Sure to delete') && deleteProduct(id)}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                  className="w-6 right-2 absolute bottom-2"
                />
              </span>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Products
