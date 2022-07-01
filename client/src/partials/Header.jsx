import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-white relative flex justify-between box-border items-center rounded-md shadow-sm mx-auto p-4  md:p-6 md:px-8">
      <h4 className='text-lg font-extrabold tracking-[1px] text-main'> <Link to={"/"}>Outshade</Link> </h4>
      <ul className='flex items-center space-x-4 text-md font-semibold px-6 text-slate-500'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className=''>
          <Link to="/signin">Login</Link>
        </li>
      </ul>
      
    </div>
  )
}

export default Header
