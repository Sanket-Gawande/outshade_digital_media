import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from './redux/slices/userSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const loginForm = async (e) => {
    e.preventDefault()
    const payload = {}
    const data = new FormData(e.target)
    for (const [key, value] of data.entries()) {
      payload[key] = value
    }
    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/login`,
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
    if (response.error) {
      setError(response.message)
      return
    }
    dispatch(login(response.user))
  }
  return (
    <section className="block  w-full md:p-6">
      {/* login form  */}
      <div className="w-[94%] md:p-4 md:max-w-[500px] py-6 bg-white rounded-lg shadow-md  shadow-slate-400/40 mx-auto mt-[25%] md:mt-[10%]">
        {/* alert  */}
        {error && (
          <h4 className="w-[95%] flex items-center justify-between text-bold text-rose-500 bg-red-500/10 py-2 px-6 mx-auto">
            {error}

            <span
              onClick={() => setError(null)}
              className="font-extrabold cursor-pointer"
            >
              x
            </span>
          </h4>
        )}
        <h4 className="text-lg text-main p-4 relative  font-semibold">
          Login here
          <span className="absolute bg-gold left-4 h-[2px] rounded-md w-[50px] bottom-4"></span>
        </h4>
        <form onSubmit={loginForm} className="mx-4 md:mx-6 mb-4">
          <div className="my-4">
            <h4>Username</h4>
            <input
              type="email"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              placeholder="email is your useraname"
              name="username"
            />
          </div>
          <div className="mb-4">
            <h4>Password</h4>
            <input
              className="outline-none  w-full border rounded-md py-2 px-4 mt-2 focus:border-gold focus:shadow-sm focus:shadow-gold"
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="password"
            />
          </div>
          <button className="bg-main text-gold text-md py-2 px-8 my-4 font-semibold rounded-full">
            Login
          </button>
          <h4 className="text-sm  my-2 text-main">
            Don't have an account ? ,{' '}
            <Link className="text-sky-600" to="/signup">
              Signup here
            </Link>{' '}
          </h4>
          <h4 className="text-sm text-main">
            Forget password ,{' '}
            <Link className="text-sky-600" to="/forgotpass">
              click here
            </Link>{' '}
          </h4>
        </form>
      </div>
    </section>
  )
}

export default Login
