import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function LayOut() {
  return (
    <div className='main-cont'>
        <Header />
          <main>
              <Outlet />
          </main>
        <Footer />
    </div>
    
  )
}

export default LayOut