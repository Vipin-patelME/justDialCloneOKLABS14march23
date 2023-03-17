import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function LayOut() {
  return (
    <>
        <Header />
        <div >
            <main>
                <Outlet />
            </main>
        </div>
        <Footer />
    </>
    
  )
}

export default LayOut