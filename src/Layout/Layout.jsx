import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation  } from 'react-router-dom'

function Layout() {

    const location = useLocation();
    const hideFooter = location.pathname === "/book";
    
    return (
        <>
            <Header />
            <Outlet/>
            {!hideFooter && <Footer />}
        </>
  )
}

export default Layout