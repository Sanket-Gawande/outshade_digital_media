import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { login } from './redux/slices/userSlice'
import { useRef } from 'react'
const Home = () => {
  const [profile, setProfile] = useState()
  const user = useSelector((state) => state?.userSlice?.user)
  const dispatch = useDispatch()
  useEffect(() => {
    setProfile(user)
  }, [])

  if (!user) {
    return <Navigate to="/signin" />
  }

  const profButton = useRef()
  const changeProfile = async (e) => {
    profButton.current.disabled = true
    profButton.current.innerHTML = 'Updating...'
    e.preventDefault()
    const payload = {}
    const data = new FormData(e.target)
    for (const [key, value] of data.entries()) {
      payload[key] = value
    }

    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/update`,
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
    profButton.current.disabled = false
    profButton.current.innerHTML = 'Update'
    if (response.error) {
      alert(response.message)
      return
    }
    dispatch(login(response.user))
    setProfile(response.locker)
    alert('Profile updated successfully')
   
  }

  // change password
  const passButton = useRef()
  const changePassword = async (e) => {
    passButton.current.disabled = true
    passButton.current.innerHTML = 'Updating...'
    e.preventDefault()
    const payload = {}
    const data = new FormData(e.target)
    for (const [key, value] of data.entries()) {
      payload[key] = value
    }

    const request = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/password/update`,
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

    passButton.current.disabled = false
    passButton.current.innerHTML = 'Update'
    if (response.error) {
      alert(response.message)
      return
    }

    alert(response.message)
    e.target.reset()
  }

  return (
    <section className="w-full p-2 md:py-16">
      <div className="w-[90%] mx-auto flex felx-wrap bg-white p-6 lg:py-8 flex-wrap items-start border-2 border-white rounded-lg  justify-center bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1380')] bg-cover ">
        <div className="w-full] lg:w-[500px] border  rounded-md  my-4 p-4 mx-4 backdrop-filter backdrop-blur-md">
          <h4 className="text-main  border-slate-500  w-max font-bold text-lg  mx-4">
            My profile !
          </h4>
          <form className="px-6" onSubmit={changeProfile}>
            <div className="my-4">
              <h4 className="text-slate-500">Full name</h4>
              <input
                type="text"
                required
                value={profile?.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="outline-none w-full border-b   focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                placeholder="email is your useraname"
                name="name"
              />
            </div>
            <div className="my-4">
              <h4 className="text-slate-500">Email</h4>
              <input
                type="email"
                readOnly
                required
                value={profile?.email}
                className="outline-none w-full border-b  cursor-not-allowed  focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                placeholder="email "
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                name="email"
              />
            </div>
            <div className="my-4">
              <h4 className="text-slate-500">Phone</h4>
              <input
                type="text"
                required
                pattern="[0-9]{10}"
                className="outline-none w-full border-b   focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                placeholder="phone "
                value={profile?.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                name="phone"
              />
            </div>
            <button className="inline-block bg-main text-gold rounded-full py-2 px-4 my-2">
              {' '}
              Save changes
            </button>
          </form>
        </div>
        <div className="w-full lg:w-[500px] border  my-4 rounded-md p-4 mx-4 backdrop-filter backdrop-blur-md">
          <h4 className="text-main  border-slate-500  w-max font-bold text-lg  mx-4">
            Change password!
          </h4>
          <form className="px-6" onSubmit={changePassword}>
            <input type="text" value={profile?.email} hidden name="email" />
            <div className="my-4">
              <h4 className="text-slate-500">Old password</h4>
              <input
                type="password"
                minLength={8}
                required
                value={profile?.old_password}
                onChange={(e) =>
                  setProfile({ ...profile, old_password: e.target.value })
                }
                className="outline-none w-full border-b   focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                // placeholder="email is your useraname"
                name="old_password"
              />
            </div>
            <div className="my-4">
              <h4 className="text-slate-500">New password</h4>
              <input
                type="text"
                required
                minLength={8}
                value={profile?.password}
                className="outline-none w-full border-b    focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                // placeholder="N"
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                name="password"
              />
            </div>
            <div className="my-4">
              <h4 className="text-slate-500">Confirm password</h4>
              <input
                type="password"
                required
                minLength={8}
                className="outline-none w-full border-b   focus:border-gold focus:shadow-sm focus:shadow-gold py-2 px-4 mt-2"
                placeholder="phone "
                value={profile?.c_password}
                onChange={(e) =>
                  setProfile({ ...profile, c_password: e.target.value })
                }
                name="c_password"
              />
            </div>

            <button className="inline-block bg-main text-gold rounded-full py-2 px-4 my-2"
              ref={passButton}> Save changes
            </button>
          </form>
        </div>
        {/* <div className="w-full] lg:w-[500px] border  p-4"></div> */}
      </div>
    </section>
  )
}

export default Home
