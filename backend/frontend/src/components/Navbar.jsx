import { NavLink, Link } from "react-router"
import { useAuth, logout } from "../auth";
import { useEffect, useState } from "react";
import {jwtDecode}  from "jwt-decode";

const Navbar = () => {
  const [logged]=useAuth()
  const [userInfo, setUserInfo] = useState(null) 
  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
  useEffect(() => {
     if (token) {
      const decoded = jwtDecode(token)
      setUserInfo(decoded)
    }
  }, [token])

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-sky-900 rounded-md px-4 py-2 font-semibold transition-all"
      : "text-sky-100 hover:bg-sky-800 hover:text-white rounded-md px-4 py-2";

  return (
    <nav className="bg-gray-600 shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-15">
          {/* app Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-white font-extrabold text-2xl tracking-wide select-none cursor-pointer">
              <Link to={'/'}>Events</Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>
              Events
            </NavLink>
            <NavLink to="/venues" className={linkClass}>
              Venues
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            {/* Add Authentication */}
            {logged?(
              <>
                <NavLink to="#" onClick={() => logout()} className={linkClass}>
                Log out
                </NavLink>
                <span className="justify-center self-center">{userInfo.sub || "Hello"}</span>
              </>
            ): (
              <>
                <NavLink to="/login" className={linkClass}>
                Log in
                </NavLink>
              </>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar