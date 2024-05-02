import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import useResponsive from '../../hooks/useResponsive';

export const NotifyContext = React.createContext(null);
const UserTemPlate = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive()
  console.log(isMobile)
  console.log(isTablet)
  console.log(isDesktop)
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const [closeTime, setCloseTime] = useState(2000);
  const renderNotify = (notify) => {
    return toast(notify)
  }
  const handleCloseTime = (time) => {
    setCloseTime(time);
  };
  // const notify = useContext(NotifyContext)
  return (
    //  <NotifyContext.Provider value={renderNotify, handleCloseTime} >
    <NotifyContext.Provider value={renderNotify} >
      {isLoading ? <Loading /> : null}
      <Outlet />
      <ToastContainer
        theme="dark"
        autoClose={closeTime}
      />

    </NotifyContext.Provider>
  )

}

export default UserTemPlate