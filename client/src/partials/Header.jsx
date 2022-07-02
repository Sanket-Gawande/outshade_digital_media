import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addProduct } from '../../../server/controllers/product'
import { login, logout } from '../redux/slices/userSlice'

const Header = () => {
  useEffect(() => {
    dispatch(login(JSON.parse(localStorage.getItem('userOutshade'))))
  }, [])

  const user = useSelector((state) => state?.userSlice?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="bg-white relative flex flex-col md:flex-row justify-between box-border items-center rounded-md shadow-sm mx-auto p-4  md:p-6 md:px-8">
      <h4 className="text-lg font-extrabold tracking-[1px] text-black my-1 backdrop-filter">
        {' '}
        <Link to={'/'}>Outshade</Link>{' '}
      </h4>
      <ul className="flex items-center space-x-4 text-sm font-semibold px-6 text-main">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="">
          {user ? (
            <>
              <Link to="categories" className="mx-2">
                Categories
              </Link>
              <Link to="products/all" className="mx-2 mr-4">
                Products
              </Link>
              <button
                className=""
                onClick={() => {
                  dispatch(logout())
                  navigate('/signin')
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin">Login</Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
