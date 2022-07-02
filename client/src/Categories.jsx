import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { addCategory, deleteCategories } from './redux/slices/categorySlice'
import { addProducts, deleteProducts } from './redux/slices/productSlice'
const Categories = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categorySlice?.category)

  const deleteCategory = async (id, name) => {
    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/category/delete`,
      {
        method: 'POST',
        body: JSON.stringify({ id, name }),
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

    dispatch(deleteCategories({ id }))
    dispatch(deleteProducts({ id: response.deletedIds }))
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
      `${import.meta.env.VITE_BASE_URL}/api/category/add`,
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

    alert(response.message)
    dispatch(addCategory({ category: response.category }))
  }

  const user = useSelector((state) => state?.userSlice?.user)
  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <section>
      <h4 className="text-lg font-semibold my-4 p-4">Add category</h4>
      <div className="bg-white rounded-lg w-[90%] border-2 border-white mx-auto py-4 shadow-md bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1380')] bg-cover">
        <form
          onSubmit={addProduct}
          className="flex w-max mx-auto flex-wrap items-center justify-start"
        >
          <div className="my-4 w-56 mx-2">
            <h4>Category name</h4>
            <input
              type="text"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              name="category"
            />
          </div>

          <div className="my-4 w-56 mx-2">
            <button className="bg-sky-500 mt-8 text-white py-2 px-4 rounded-md">
              Add +
            </button>
          </div>
        </form>
      </div>
      <h4 className="text-lg font-semibold my-4 p-4 mx-6">
        Categories
      </h4>
      <div className="flex justify-center items-start w-90% mx-auto p-4 relative flex-wrap">
        <h4 className="text-lg font-bold text-slate-500">
          {categories?.length === 0 && 'There is no category added'}
        </h4>

        {categories?.map(({ thumbnail, name, id }) => (
          <Link
            to={`/products/${name}`}
            className="p-2 bg-white border-2 border-slate-600 m-3 w-36 md:w-44 h-44 p-4 relative"
          >
            <img src={thumbnail} alt={name} className="w-full h-[70%] border" />
            <h4 className="text-lg text-slate-900 mt-2">{name}</h4>
            {/* <h4 className="text-slate-700 text-sm "> Price : ₹{price}</h4> */}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() =>
                confirm('Sure to delete') && deleteCategory(id, name)
              }
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
                className="w-6 right-2 absolute bottom-2"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
