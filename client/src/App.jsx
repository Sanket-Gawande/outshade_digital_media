import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import ForgotPass from './ForgotPass'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import VerifyToken from './VerifyToken'
import Header from './partials/Header'
import Footer from './partials/Footer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { login } from './redux/slices/userSlice'
import Categories from './Categories'
import Products from './Products'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/:category" element={<Products />} />

        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/verify/change_pass/:usertoken"
          element={<VerifyToken />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
