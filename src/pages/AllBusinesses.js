import React from 'react'
import {AiFillLike} from "react-icons/ai"
//import {CiStar} from 'react-icons/ci'
import {FaStar} from 'react-icons/fa'
import {TfiStar} from 'react-icons/tfi'
import {AiOutlineHeart} from 'react-icons/ai'
import {MdOutlineMessage} from 'react-icons/md'
import { Badge, Card } from 'react-bootstrap'
//import { useLocation, useMatch, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
//import { URL } from '../helpers/ApiHelper'

const AllBusinesses =({details})=> {
    const {name, contactNo, imageUrl, id} = details
    // const id = useParams()
    // const location = useLocation()
    // const history = useMatch('/register/bussiness')
    //console.log(history)
    // console.log(location)
    // console.log(id)
    return (
        <Link to={`/business/details/?business_name=${name}&id=${id}`} className='link-style'>
            <li className="">
                <Card className='w-75'>
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
                                <a href="#" target="blank" className='btn btn-success' onClick={(e)=>e.stopPropagation()}>Enqire Now</a>
                            </div>
                        </Col>
                        <Col md={2} lg={1}>
                            <AiOutlineHeart style={{fontSize:"25"}} />
                        </Col>
                    </Row>
                </Card>
            </li>
        </Link>
    )
}

export default AllBusinesses;