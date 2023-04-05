import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Carousel, Col, Container, Modal, Row } from 'react-bootstrap'
import { AiFillLike, AiOutlineHeart } from 'react-icons/ai'
import { TfiStar } from 'react-icons/tfi'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {FaWhatsappSquare} from "react-icons/fa"
import {RiMailStarLine} from 'react-icons/ri'
//import { BiLike } from 'react-icons/bi'
import { Rings } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/ApiHelper'
import { TbShare3 } from 'react-icons/tb'
import swal from 'sweetalert'

function BusinessDetails() {
    const [params] = useSearchParams()
    const [emptyImage, setEmptyImage] = useState([localStorage.getItem("emptyImage")])
    
    //console.log(params.get("id"))
    const [businessData, setBusinessData] = useState({
                                id:'',
                                name:"",
                                address:"",
                                contactNo:'',
                                carousalImage:[...emptyImage]
                            })

    const [isLoading, setIsLoading]= useState(true)
    //modal
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem("name"))
    const [email, setEmail] = useState(localStorage.getItem("email"))
    const [phoneNo, setphoneNo] = useState(localStorage.getItem("phone"))

    const getEmptyImage = async()=>{
            const response = await fetch(`${URL}/api/empty-image?populate=*`)
            const data = await response.json()
            const emptyImageUrl = URL+data.data.attributes.empty_image.data[0].attributes.url
            //console.log("emptydata------>",data.data.attributes.empty_image.data[0].attributes.url)
            //setEmptyImage([emptyImageUrl])
            localStorage.setItem("emptyImage",emptyImageUrl)
        }
    getEmptyImage()

    useEffect(()=>{
        const businessId = params.get("id")

        const getBusinessDetails=async()=>{
            const response = await fetch(`${URL}/api/occupations/${businessId}?populate=*`)
            const data = await response.json()
            //console.log("data --------->",data.data)
            const newData = 
                            {   id:data.data.id,
                                name:data.data.attributes.name,
                                city:data.data.attributes.cities.data[0].attributes.city_name,
                                address:data.data.attributes.addres,
                                contactNo:data.data.attributes.contact_no,
                                carousalImage:(data.data.attributes.carousal_image.data === null) ? [...emptyImage]  : (data.data.attributes.carousal_image.data.map(cv =>(URL+cv.attributes.url))),
                                categoryName:data.data.attributes.category.data.attributes.category_name
                                //data.data.attributes.carousal_image.data.map(cv =>cv.attributes.url)
                            }
            //console.log("newdata ----->",newData)
            setBusinessData({...businessData,...newData})
            setIsLoading(false)
        }
        getBusinessDetails()
        
    },[])

    const handleOpen = ()=>{
        setShow(true)
        setEmail(localStorage.getItem("email"))
        // if(email.length<1){
            
        // }
    }

    const handleClose = ()=>{
        setShow(false)
    }
    const onUserNameInput =(e)=>{
        //setUsername(e.target.value)
    }
    const onEmailInput =(e)=>{
        setEmail(e.target.value)
    }
    
    const onPasswordInput = (e)=>{
        //setphoneNo(e.target.value)
    }
    const onSubmitEnquiry = async(e) =>{
        e.preventDefault()
        const enquiryData = {
            "data": {
              "full_name": username,
              "contact_no": phoneNo,
              "email": email,
              "occupation": params.get("id"),
              "users_permissions_user": "23"
            }
          }
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(enquiryData)
        }

        const response = await fetch(`${URL}/api/enquiries`, options)
        const data = await response.json()
        if(response.ok === true){
            swal("Thank you for enquiry","Our member will contact you soon","success")
            setShow(false)
        }
        else{
            swal("Awww....","please provide valid credentials","warning")
        }


    }
    const generateEnqiryModal = ()=>{
        return(
            <>
                <Modal size="lg"  show={show} onHide={handleClose}>
                    <Row  className=''>
                        <Col className='enwiry-form' lg={8}>
                        <div className='m-0 p-0 w-100'>
                            <form  className='login-form m-0 pb-5 w-100' onSubmit={onSubmitEnquiry}>
                                <div className='w-75 mb-5'>
                                    <h3>Are you Looking for?</h3>
                                    <p>{`"${categoryName}"`}</p>
                                </div>
                                <div className="mb-3 ml-5 w-75 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User name</label>
                                    <div className="col-sm-10 w-50">
                                    <input type="text" onChange={onUserNameInput}  value={username} className="form-control" id="staticEmail"  />
                                    </div>
                                </div>
                                <div className="mb-3 ml-5 w-75 row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Phone no</label>
                                    <div className="col-sm-10 w-50">
                                    <input type="text" onChange={onPasswordInput} value={phoneNo} className="form-control" id="inputPassword" />
                                    </div>
                                </div>
                                <div className="mb-3 ml-5 w-75 row">
                                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10 w-50">
                                    <input type="email" onChange={onEmailInput} value={email} className="form-control" id="inputEmail" />
                                    </div>
                                </div>
                                <div className="mb-3 row cr-btn-cont w-50 ml-5">
                                <Button  type="submit" variant="warning">
                                    Send Enquiry
                                </Button>
                                </div>
                            </form>
                        </div>
                        </Col>
                        <Col className='modal-image-cont' lg={4}>
                            
                        </Col>
                    </Row>
                </Modal>
            </>
        )
    }

    //console.log(businessData)
    const {carousalImage, name, contactNo, categoryName, city} = businessData
    //console.log("image------>",carousalImage)
    return (
        <>
            {generateEnqiryModal()}
            <Container fluid>
                <div className='mb-4 mt-4'>
                    <button type='button' style={{backgroundColor:"transparent", borderStyle:"none", fontSize:"12px"}} >{city}</button><span>{`>`}</span>
                    <button type='button' style={{backgroundColor:"transparent", borderStyle:"none", fontSize:"12px"}}>{categoryName} in MP</button><span>{`>`}</span>
                    <button type='button' style={{backgroundColor:"transparent", borderStyle:"none", fontSize:"12px"}}>{categoryName} in {city}</button><span>{`>`}</span>
                    <button type='button' style={{backgroundColor:"transparent", borderStyle:"none", fontSize:"12px"}}>{name}</button><span>{`>`}</span>
                </div>
                <Row>
                    <Card>
                        <Carousel indicators={false} pause={false}>
                            {
                                isLoading ? 
                                <div className="d-flex justify-content-center items-center mt-5 pt-5 ">
                                    <Rings color="#00BFFF" height={280} width={280} />
                                </div>
                                :
                                (carousalImage.map((eachImage, idx) =>
                                    <Carousel.Item key={idx} interval={1000}>
                                        <img
                                            width={1280} 
                                            height={400}
                                            className="d-block w-100"
                                            src= {eachImage}                               
                                            alt={name}
                                        />
                                    </Carousel.Item>
                                    )
                                )
                            }
                        </Carousel>
                        <Card.Body className='bdetails-card-style pb-0'>
                            <div className='bdetails-card-head w-75'>
                                <AiFillLike style={{fontSize:"25", backgroundColor:"#2D3038", color:"#ffffff", borderRadius:"5px", padding:"3px", marginRight:"18px"}} icon="fa-thin fa-thumbs-up" />
                                <Card.Title style={{fontSize:"30px", fontFamily:"Candara"}}>{name}</Card.Title>
                            </div>
                            <div>
                                <button type='button' style={{backgroundColor:"#DDDDDD", borderStyle:"none", fontSize:"12px", borderRadius:"10px", marginRight:"18px", padding:"4px", fontWeight:"bold"}}>{categoryName}</button>
                                <button type='button' style={{backgroundColor:"#DDDDDD", borderStyle:"none", fontSize:"12px", borderRadius:"10px", padding:"4px", fontWeight:"bold"}}>{categoryName} services</button>
                            </div>
                        </Card.Body>
                        <Card.Body className='details-body-cont m-0' >
                            <div className='w-75'>
                                <div className='bdetai-rating-cont'>
                                    <h4 className='me-2 mt-2'><Badge  bg="success">3.4</Badge></h4>
                                    <div className='d-flex flex-row'>
                                        <TfiStar style={{fontSize:"25",backgroundColor:"orange", borderRadius:"5px", margin:"1px", display:"flex", justifyContent:"center", alignItems:"center", padding:"3px", color:"#FFFFFF"}} />
                                        <TfiStar style={{fontSize:"25",backgroundColor:"orange", borderRadius:"5px", margin:"1px", display:"flex", justifyContent:"center", alignItems:"center", padding:"3px", color:"#FFFFFF"}} />
                                        <TfiStar style={{fontSize:"25", backgroundColor:"orange", borderRadius:"5px", margin:"1px", display:"flex", justifyContent:"center", alignItems:"center", padding:"3px", color:"#FFFFFF"}} />
                                        <TfiStar style={{fontSize:"25", backgroundColor:"orange", borderRadius:"5px", margin:"1px", display:"flex", justifyContent:"center", alignItems:"center", padding:"3px", color:"#FFFFFF"}} />
                                        <TfiStar style={{fontSize:"25", borderRadius:"5px", margin:"1px", display:"flex", justifyContent:"center", alignItems:"center", padding:"3px"}} />
                                    </div>
                                    <p className='mt-3'>2365 Ratings</p>
                                </div>
                                <p style={{fontSize:"24px"}}>{city}</p>
                                <div className='w-75'>
                                    <a href={`tel:+91${contactNo}`} type='button' style={{ marginRight:"25px"}} className='btn btn-success'>
                                        <BsFillTelephoneFill style={{marginRight:"8px", }}  /><span>{contactNo}</span>
                                    </a>
                                    <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-secondry'>
                                        <FaWhatsappSquare style={{fontSize:"25px",marginRight:"8px"}}  /><span style={{fontWeight:"bold"}}>Chat</span>
                                    </button>
                                    <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-secondry'>
                                        <RiMailStarLine style={{fontSize:"25px",marginRight:"8px"}}  /><span style={{fontWeight:"bold"}}>Tap to Rate</span>
                                    </button>
                                    <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-secondry'>
                                        <TbShare3 style={{fontSize:"25px",marginRight:"8px"}}  /><span style={{fontWeight:"bold"}}>Share</span>
                                    </button>
                                    <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-secondry'>
                                        <AiOutlineHeart style={{fontSize:"25px"}}  />
                                    </button>
                                </div>
                            </div>
                            <div className='enqire-btn-cont'>
                                <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-primary float-end' onClick={handleOpen}>
                                    <FaWhatsappSquare style={{fontSize:"25px",marginRight:"8px"}}/><span style={{fontWeight:"bold"}}>Enqire Now</span>
                                </button>
                            </div>
                        </Card.Body>
                    </ Card>
                </Row>
            </Container>
        </>
    )
}

export default BusinessDetails