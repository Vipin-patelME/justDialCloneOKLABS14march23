import React, { useEffect, useState } from 'react'
import { Badge, Card, Carousel, Col, Container, Row } from 'react-bootstrap'
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

    //console.log(businessData)
    const {carousalImage, name, contactNo, categoryName, city} = businessData
    //console.log("image------>",carousalImage)
    return (
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
                    <Card.Body className=' m-0'>
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
                            <div>
                                <button type='button' style={{ marginRight:"25px"}} className='btn btn-success'>
                                    <BsFillTelephoneFill style={{marginRight:"8px", }}  /><span>{contactNo}</span>
                                </button>
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
                        <div></div>
                    </Card.Body>
                </ Card>
            </Row>
        </Container>
    )
}

export default BusinessDetails