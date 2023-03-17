import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function LayOut() {
  return (
    <>
        <Header />
          <main>
              <Outlet />
          </main>
        <Footer />
    </>
    
  )
}

export default LayOut