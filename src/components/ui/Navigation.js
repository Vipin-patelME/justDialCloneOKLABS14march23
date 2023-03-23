import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import Geocode from "react-geocode";
import swal from 'sweetalert'

//import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

//import { FilterContext } from '../../App'
import { Link, NavLink } from 'react-router-dom'
import { Input } from 'reactstrap'
import { GOOGLE_MAP_KEY, URL } from '../../helpers/ApiHelper'

function Navigation() {

    //const filterTextContext = useContext(FilterContext)

    //const {inputValue} = filterTextContext

    //console.log("filter context ----->", filterTextContext.inputValue)

    const jwtToken = localStorage.getItem("jwtToken")
    const [logoUrl, setLogoUrl] = useState('')
    const [placeName, setPlaceName] = useState("")
    const [locationSelected, setLocationSelected] = useState(false)

    useEffect(()=>{
        const findLogoUrl = async()=>{
            const response= await fetch(`${URL}/api/website?populate=*`)
            const data = await response.json()
            const navLogo = data.data.attributes.logo.data[0].attributes.url
            setLogoUrl(navLogo)
            //console.log("webLogo -------->", navLogo)
        }
        const locationName = localStorage.getItem("placeName")
        //Geocode.enableDebug()
        findLogoUrl();
        setPlaceName(locationName)
        setLocationSelected(true)
        
          
    },[])
    const getLocation=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }
    const showPosition=(position)=>{
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        // console.log("Latitude: " + position.coords.latitude)
        // console.log("Longitude: " + position.coords.longitude)
        Geocode.setApiKey(GOOGLE_MAP_KEY)
        Geocode.setLanguage("en")
        Geocode.setRegion("es")
        Geocode.setLocationType("ROOFTOP")
        Geocode.enableDebug()
        Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                if (response.status === "OK"){
                    const address = response.results[0].formatted_address;
                    localStorage.setItem("placeName", address.substring(10))
                    setPlaceName(address.substring(10))
                    setLocationSelected(true)
                }else{
                    swal("Awwww.....", "Address Not Found", "warning")
                }
            //console.log(response)
            //setPlaceName(address.substring(10))
            //console.log("address -------->",address.substring(10));
            },
            (error) => {
            console.error(error);
            }
        );
    }

    const onSelectLocation =()=>{
        getLocation()
    }
        

    // const onLogin = ()=>{
    //     setLocationSelected(false)
    // }
    

    const onLogout = ()=>{
        setLocationSelected(false)
        localStorage.removeItem("jwtToken")
        
        
    }
    
    return (
            <Navbar bg="light" expand="lg">
                <Container fluid className='d-flex w-100'>
                    <Link to="/">
                        <img 
                            src={`${URL}${logoUrl}`} 
                            alt='logo'
                            className='web-logo me-5 ms-5' 
                        />
                    </Link>
                    <Form className="d-flex w-25 me-2">
                        <Input 
                            value={placeName}
                            type='select'
                            onChange={onSelectLocation}
                        >
                            {
                                locationSelected? <option>{placeName}</option> 
                                :
                                <>
                                    <option></option>
                                    <option>Select Location</option>
                                </>
                                
                            }    
                        </ Input> 
                    </Form>
                    <Form className="d-flex  me-5">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className='w-50 ms-5' id="navbarScroll">
                        <Nav
                            className=" w-75 ms-5 me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to="/" className='btn btn-primary me-3'>Home</NavLink>
                            {!jwtToken ? 
                            (
                                <>
                                    <NavLink className='btn btn-primary me-3' to="/register">Register</NavLink>
                                    <NavLink className='btn btn-primary me-3' to="/login" >Login</NavLink>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavLink className='btn btn-primary me-3' to="/register/bussiness">Register Bussiness</NavLink>
                                    <NavLink className=" btn btn-warning me-5" to="/login" onClick={onLogout}>Logout</NavLink>
                                </>
                            )
                            }
                            
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Navigation