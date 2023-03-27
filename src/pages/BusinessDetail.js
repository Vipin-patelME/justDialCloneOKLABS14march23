import React from 'react'
import {AiFillLike} from "react-icons/ai"
//import {CiStar} from 'react-icons/ci'
import {TfiStar} from 'react-icons/tfi'
import {AiOutlineHeart} from 'react-icons/ai'
import {MdOutlineMessage} from 'react-icons/md'
import { Badge, Card } from 'react-bootstrap'
//import { useLocation, useMatch, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
//import { URL } from '../helpers/ApiHelper'

const BusinessDetail =({details})=> {
    const {name,contactNo, imageUrl} = details
    // const id = useParams()
    // const location = useLocation()
    // const history = useMatch('/register/bussiness')
    //console.log(history)
    // console.log(location)
    // console.log(id)
    return (
        <Container  fluid>
            <Link to="/" className='link-style'>
                <Card className='mb-3 w-100'>
                    <Row>
                        <Col md={12} lg={3}>
                            <div className='p-0 m-0'>
                                <Card.Img className='w-100 m-3' src={imageUrl} alt="business" />
                                <button className='popular-btn w-100 ms-3 me-3' type='button'>Popular</button>
                            </div>
                        </Col>
                        <Col lg={8} className="p-3 ms-3 w-50 ">
                            <div className='card-head'>
                                <AiFillLike style={{fontSize:"25"}} icon="fa-thin fa-thumbs-up" />
                                <Card.Title className='fs-4 ms-3'>{name}</Card.Title>
                            </div>
                            <div className='rating-cont w-50'>
                                <h4 className='me-2 mt-2'><Badge  bg="success">3.4</Badge></h4>
                                <div>
                                    <TfiStar style={{fontSize:"25",backgroundColor:"orange"}} />
                                    <TfiStar style={{fontSize:"25",backgroundColor:"orange"}} />
                                    <TfiStar style={{fontSize:"25", backgroundColor:"orange"}} />
                                    <TfiStar style={{fontSize:"25", backgroundColor:"orange"}} />
                                    <TfiStar style={{fontSize:"25"}} />
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
                        <Col lg={2}>
                            <AiOutlineHeart style={{fontSize:"25"}} />
                        </Col>
                    </Row>
                </Card>
            </Link>
        </Container>
    )
}

export default BusinessDetail