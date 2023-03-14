import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function LayOut() {
  return (
    <>
        <Header />
        <Container>
            <main>
                <Outlet />
            </main>
        </Container>
        <Footer />
    </>
    
  )
}

export default LayOut