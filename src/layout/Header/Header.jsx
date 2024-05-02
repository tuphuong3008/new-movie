import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { getLocalStorage } from '../../utils/util'
import "./style.scss"
const Header = () => {
    let displayStyle = "block"
    const userLocal = getLocalStorage("user");
    if (userLocal) {
        displayStyle = "none"
    }
    console.log(userLocal);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user data from local storage
        window.location.reload(); // Refresh the page to reflect the logout state
    };

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    return (
        <header className={isScrolled ? "scrolled" : ""}>
            <nav className={`bg-white border-gray-200 px-4 lg:px-6 py-2.5 ${
            isScrolled ? "scrolled" : ""
          }`}>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <NavLink to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="CyberSoft Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">CyberSoft </span>
                    </NavLink>
                    <div className="flex items-center lg:order-2">
                        {userLocal ? <>
                                <p>{userLocal.hoTen}</p>
                                <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md">Đăng xuất</button>
                            </> : (
                            <NavLink to="/sign-in" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-1 focus:outline-none bg-red-500 text-white px-4 py-2 rounded-md">Đăng nhập</NavLink>
                        )}
                    </div>
                    <div className="flex items-center lg:order-2" style={{ display: displayStyle }}>
                        <NavLink to="/sign-up" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-1 focus:outline-none bg-red-500 text-white px-4 py-2 rounded-md">Đăng ký</NavLink>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/" className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Lịch chiếu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Cụm rạp</NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Tin tức</NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Ứng dụng</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header