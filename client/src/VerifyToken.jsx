import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VerifyToken = () => {
  const { usertoken } = useParams()
  const forgobtn = useRef()
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)
  const resetForm = async (e) => {
    e.preventDefault()
    const payload = {}
    const data = new FormData(e.target)
    for (const [key, value] of data.entries()) {
      payload[key] = value
    }
    payload.token = usertoken
    forgobtn.current.disabled = true
    forgobtn.current.innerHTML = 'Wait...'
    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/forgot/verify`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: '*/*',
          'Content-type': 'application/json',
        },
      },
    )
    forgobtn.current.disabled = false
    forgobtn.current.innerHTML = 'Reset password'
    const response = await request.json()
    if (response.error) {
      setError(response.message)
      setMsg(null)
      return
    }
    if (!response.error) {
      setMsg(response.message)
      setError(null)
      return
    }
  }
  return (
    <section className="block  w-full md:p-6">
      {/* login form  */}
      <div className="w-[94%] md:p-4 md:max-w-[500px] py-6 bg-white rounded-lg shadow-md  shadow-slate-400/40 mx-auto my-8">
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
        {msg && (
          <h4 className="w-[95%] flex items-center justify-between text-bold text-green-500 bg-green-500/10 py-2 px-6 mx-auto">
            {msg}

            <span
              onClick={() => setMsg(null)}
              className="font-extrabold cursor-pointer"
            >
              x
            </span>
          </h4>
        )}
        <h4 className="text-lg text-main p-4 relative  font-semibold">
          Change password
          <span className="absolute bg-gold left-4 h-[2px] rounded-md w-[50px] bottom-4"></span>
        </h4>
        <form onSubmit={resetForm} className="mx-4 md:mx-6 mb-4">
          <div className="my-4">
            <h4> Password</h4>
            <input
              type="password"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              // placeholder="email is your useraname"
              name="password"
            />
          </div>
          <div className="my-4">
            <h4> Confirm password</h4>
            <input
              type="password"
              required
              className="outline-none w-full border rounded-md  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
              // placeholder="email is your useraname"
              name="cpassword"
            />
          </div>
          <button
            ref={forgobtn}
            className="bg-main text-gold text-md py-2 px-8 my-4 font-semibold rounded-full"
          >
            Change password
          </button>
          <h4 className="text-sm  my-2 text-main">
            <Link className="text-sky-600" to="/signin">
              Login here
            </Link>{' '}
          </h4>
        </form>
      </div>
    </section>
  )
}

export default VerifyToken
