import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function Navigation() {
    
    const onLogout = ()=>{
        localStorage.removeItem("jwtToken")
        window.location.href = '/register'
    }

    const jwtToken = localStorage.getItem("jwtToken")

  return (
    <Navbar bg="light" expand="lg">
        <Container fluid>
            <img 
                src='https://akam.cdn.jdmagicbox.com/images/icontent/jdrwd/jdlogosvg.svg' 
                alt='logo'
                className='web-logo me-5 ms-5' 
            />
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <div className='nav-cont'>
                    <Form className="d-flex me-5">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        className="me-auto ms-5 my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/" className='btn btn-primary me-3'>Home</Link>
                        {!jwtToken ? 
                        (
                            <>
                                <Link className='btn btn-primary me-3' to="/register">Register</Link>
                                <Link className='btn btn-primary me-3' to="/login">Login</Link>
                            </>
                        )
                        :
                        (
                            <>
                                <Link className='btn btn-primary me-3' to="/register/bussiness">Register Bussiness</Link>
                                <Link className=" btn btn-warning me-5" onClick={onLogout}>Logout</Link>
                            </>
                        )
                        }
                        
                    </Nav> 
                        
                </div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation