import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function LayOut() {

  return (
    <div className='main-cont'>
        <Header />
            <Container style={{minHeight:"500px"}} fluid>
                <Outlet />
            </Container>
        <Footer />
    </div>
    
  )
}

export default LayOut