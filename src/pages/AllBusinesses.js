import React, { useState } from 'react'
import {AiFillLike} from "react-icons/ai"
//import {CiStar} from 'react-icons/ci'
//import {FaStar} from 'react-icons/fa'
import {TfiStar} from 'react-icons/tfi'
import {AiOutlineHeart} from 'react-icons/ai'
import {MdOutlineMessage} from 'react-icons/md'
import { Badge, Button, Card, Modal } from 'react-bootstrap'
//import { useLocation, useMatch, useParams } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

//import { URL } from '../helpers/ApiHelper'

const AllBusinesses =({details})=> {

    const [show, setShow] = useState(false)
    const [username] = useState(localStorage.getItem("name"))
    const [phoneNo] = useState(localStorage.getItem("phone"))
    const [email, setEmail] = useState(localStorage.getItem("email"))


    const {name, contactNo, imageUrl, id} = details
    // const id = useParams()
    // const location = useLocation()
    // const history = useMatch('/register/bussiness')
    //console.log(history)
    // console.log(location)
    // console.log(id)
    const navigate = useNavigate()

    const onNavigate = ()=>{
        navigate(`/business/details/?business_name=${name}&id=${id}`)
    }

    const onEmailInput = e =>{
        setEmail(e.target.value)
    }
    const handleClose = ()=>{
        setShow(false)
    }
    const handleShow =(e)=>{
        e.stopPropagation()
        setShow(true)
        setEmail(localStorage.getItem("email"))
    }

    const onSubmitEnquiry = (e)=>{
        e.preventDefault()
        setShow(false)
    }

    const generateEnqiryModal = ()=>{
        return(
            <>
                <Modal size="lg"  show={show} onHide={handleClose}>
                    <Row  className=''>
                        <>
                            <Col className='enwiry-form' lg={8}>
                                <div className='m-0 p-0 w-100'>
                                    <form  className='login-form m-0 pb-5 w-100' onSubmit={onSubmitEnquiry}>
                                        <div className='w-75 mb-5'>
                                            <h3>Are you Looking for?</h3>
                                            <p>{`"${name}"`}</p>
                                        </div>
                                        <div className="mb-3 ml-5 w-75 row">
                                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User name</label>
                                            <div className="col-sm-10 w-50">
                                            <input type="text"  value={username} className="form-control" id="staticEmail"  />
                                            </div>
                                        </div>
                                        <div className="mb-3 ml-5 w-75 row">
                                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Phone no</label>
                                            <div className="col-sm-10 w-50">
                                            <input type="text" value={phoneNo} className="form-control" id="inputPassword" />
                                            </div>
                                        </div>
                                        <div className="mb-3 ml-5 w-75 row">
                                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-10 w-50">
                                            <input type="email" onChange={onEmailInput} value={email} className="form-control" id="inputEmail" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row cr-btn-cont w-50 ml-5">
                                        <Button  type="submit" style={{fontWeight:"bold"}} variant="warning">
                                            Send Enquiry
                                        </Button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                            <Col className='modal-image-cont' lg={4}>
                                
                            </Col>
                        </>
                    </Row>
                </Modal>
            </>
        )
    }

    return (
        <>
            {generateEnqiryModal()}
            <li className="">
                <Card onClick={onNavigate} className='w-75 p-0 mb-5' style={{cursor:"pointer"}}>
                    <Row>
                        <Col md={5} lg={3}>
                            <div className='p-0 me-4 w-100'>
                                <Card.Img className='w-100 m-3 image-style' src={imageUrl} alt="business" />
                                <button className='popular-btn w-100 ms-3 me-3' type='button'>Popular</button>
                            </div>
                        </Col>
                        <Col md={5} lg={7} className="p-3 ms-3">
                            <div className='card-head w-75'>
                                <AiFillLike style={{fontSize:"25"}} icon="fa-thin fa-thumbs-up" />
                                <Card.Title className='fs-4 ms-3'>{name}</Card.Title>
                            </div>
                            <div className='rating-cont'>
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
                            <div className='card-btn-cont '>
                                <button className='btn-style' type="button" >{name}</button>
                                <button className='btn-style' type="button">{name}</button>
                            </div>
                            <div className='message-box mt-3'>
                                <MdOutlineMessage style={{fontSize:"25"}} />
                                <p className='ms-2'>This Hotel Was not good, I would like tosuggest you that please avoid to book this hotel if possible.</p>
                            </div>
                            <div className='contact-btn-cont'>
                                <a href={`tel:${contactNo}`} className='btn btn-success' onClick={(e)=>e.stopPropagation()}>{`+91-${contactNo}`}</a>
                                <a href="#" target="blank" className='btn btn-success' onClick={handleShow}>Enqire Now</a>
                            </div>
                        </Col>
                        <Col md={2} lg={1}>
                            <AiOutlineHeart style={{fontSize:"25"}} />
                        </Col>
                    </Row>
                </Card>
            </li>
        </>
    )
}

export default AllBusinesses;