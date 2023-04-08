import React, { useEffect, useState, useContext } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
//import { Navigate } from 'react-router-dom';
import Geocode from "react-geocode";
import swal from 'sweetalert'
import {TbLanguageHiragana} from 'react-icons/tb'


//import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

//import { FilterContext } from '../../App'
import { Link, NavLink } from 'react-router-dom'
import { Input } from 'reactstrap'
import { GOOGLE_MAP_KEY, URL } from '../../helpers/ApiHelper'
import { searchContext } from '../../Context';



function Navigation() {

    //const filterTextContext = useContext(FilterContext)

    //const {inputValue} = filterTextContext

    //console.log("filter context ----->", filterTextContext.inputValue)

    const jwtToken = localStorage.getItem("jwtToken")
    const [logoUrl, setLogoUrl] = useState('')
    const [placeName, setPlaceName] = useState("")
    //const [sliderDetails,setSliderDetails] = useState([])
    const [locationSelected, setLocationSelected] = useState(false)
    const [isEnglishActive, setIsEnglishActive ] = useState((localStorage.getItem("lang") === "hi") ? false: true)
    const {filterInput, setFilterInput, setFilterLanguage, setMainSlider} = useContext(searchContext)

    useEffect(()=>{
        const findLogoUrl = async()=>{
            const response= await fetch(`${URL}/api/website?populate[logo]=*&populate[main_slider][populate]=*`)
            const data = await response.json()
            const navLogo = data.data.attributes.logo.data.attributes.url
            console.log("navigation   data----->",data.data.attributes.main_slider) 
            const sliderNewDetails =  data.data.attributes.main_slider.map(eachData =>({
                                                                                         categoryName:eachData.category_name,
                                                                                         imageUrl:URL+eachData.slider_image.data[0].attributes.url 
                                                                                        }))
            setMainSlider([...sliderNewDetails])
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
    
    const onChangeLanguageToEnglish=()=>{
        localStorage.setItem("lang","hi")
        setFilterLanguage("hi")
        setIsEnglishActive(!isEnglishActive)

    }
    const onChangeLanguageToHindi=()=>{
        localStorage.setItem("lang","en")
        setFilterLanguage("en")
        setIsEnglishActive(!isEnglishActive)
    }
    //console.log(sliderDetails)
    return (
            <Navbar bg="light" expand="lg">
                <Container fluid className='d-flex w-100'>
                    <Link to="/" onClick={(e)=>setFilterInput("")}>
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
                        value={filterInput}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e)=>setFilterInput(e.target.value)}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className='w-75 ms-5' id="navbarScroll">
                        <Nav
                            className=" w-100 ms-5 my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {
                                isEnglishActive ? <Button style={{width:"100px", padding:"0px"}} className='btn btn-primary me-3' onClick={onChangeLanguageToEnglish}>
                                <TbLanguageHiragana style={{fontSize:"20px", marginRight:"8px"}} /><span>हिंदी</span></Button>
                                :
                                <Button  style={{width:"100px"}}  className='btn btn-primary me-3' onClick={onChangeLanguageToHindi}>
                                <TbLanguageHiragana style={{fontSize:"19px", marginRight:"4px"}} />English</Button>
                            }
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