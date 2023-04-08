import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge, Button, Card, Carousel, CloseButton, Col, Container, Modal, Row } from 'react-bootstrap'
import { AiFillLike, AiOutlineHeart } from 'react-icons/ai'
import { TfiStar } from 'react-icons/tfi'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {FaWhatsappSquare} from "react-icons/fa"
import {RiMailStarLine} from 'react-icons/ri'
//import { BiLike } from 'react-icons/bi'
import { Rings } from 'react-loader-spinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL as url } from '../helpers/ApiHelper'
import { TbShare3 } from 'react-icons/tb'
import swal from 'sweetalert'

function BusinessDetails() {

    const history = useNavigate()
    const [params] = useSearchParams()
    const [token, setToken] = useState(localStorage.getItem("jwtToken"))
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
    const [modalFor, setModalFor] = useState({enqiry:true})
    //const [buttonClicked, setButtonClicked] = useState("")
    const [uploadedImage, setUploadedImage] = useState("") 
    const [imageSelected,setImageSelected] = useState(false)
    const [desc,setDesc] = useState("")
    const [files, setFiles] = useState('')
    const[closeButton,setCloseButton] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showProgressBar, setShowProgressBar] = useState("")

    const getEmptyImage = async()=>{
            const response = await fetch(`${url}/api/empty-image?populate=*`)
            const data = await response.json()
            const emptyImageUrl = url+data.data.attributes.empty_image.data[0].attributes.url
            //console.log("emptydata------>",data.data.attributes.empty_image.data[0].attributes.url)
            //setEmptyImage([emptyImageUrl])
            localStorage.setItem("emptyImage",emptyImageUrl)
        }
    getEmptyImage()

    

    useEffect(()=>{
        const businessId = params.get("id")

        const getBusinessDetails=async()=>{
            const response = await fetch(`${url}/api/occupations/${businessId}?populate=*`)
            const data = await response.json()
            //console.log("data --------->",data.data)
            const newData = 
                            {   id:data.data.id,
                                name:data.data.attributes.name,
                                city:data.data.attributes.cities.data[0].attributes.city_name,
                                address:data.data.attributes.addres,
                                contactNo:data.data.attributes.contact_no,
                                carousalImage:(data.data.attributes.carousal_image.data === null) ? [...emptyImage]  : (data.data.attributes.carousal_image.data.map(cv =>(url+cv.attributes.url))),
                                categoryName:data.data.attributes.category.data.attributes.category_name
                                //data.data.attributes.carousal_image.data.map(cv =>cv.attributes.url)
                            }
            //console.log("newdata ----->",newData)
            setBusinessData({...businessData,...newData})
            setIsLoading(false)
        }
        getBusinessDetails()
        
    },[])

    const onEnquiry = ()=>{
        setEmail(localStorage.getItem("email"))
        setModalFor({enqiry:true})
        setShow(true)
        // if(email.length<1){
            
        // }
    }
    const onUploadImage = ()=>{
        {token ? setShow(true): history("/register")}
        setModalFor({enqiry:false})
    }

    const handleClose = ()=>{
        setShow(false)
        setImageSelected(false)
        setCloseButton(false)
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
        if(token){
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
            const response = await fetch(`${url}/api/enquiries`, options)
            const data = await response.json()
            if(response.ok === true){
                swal("Thank you for enquiry","Our member will contact you soon","success")
                setShow(false)
            }
            else{
                swal("Awww....","please provide valid credentials","warning")
            }
        }
        else{
        swal("Aww.....", "Please Register first", "warning")
            history("/register")
        }
        
    }


    const onReadFile = (e)=>{
        const file = e.target.files[0]
        //console.log(file)
        if (file.type === "image/jpeg" || file.type === "image/png"){
            setFiles(file)
            setUploadedImage(URL.createObjectURL(file))
            setImageSelected(true)
        }
        else{
            swal("Aww....", "you have to select jpeg or png Image only", "error")
        }
    }
    
    const onReadDesc = (e) =>{
        setDesc(e.target.value)
    }

    const uploadImageAndDesc = ()=>{
        const formData = new FormData();
        formData.append("files", files);
        console.log(formData)
        axios.post(`${url}/api/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            },
            onUploadProgress : (progressEvent) => {
                const progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                //console.log(progress);
                setProgress(progress);

                if(progress===100){
                    setShowProgressBar(false)

                    //setShow(false)
                    setCloseButton(true)
                    setProgress(0)
                    //setImageSelected(false)
                }

            }
        })
    }

    const onUploadFile = (e) =>{
        e.preventDefault()
        setShowProgressBar(true)
        //alert("GO ahead")
        uploadImageAndDesc()
        //await setShow(false)
        //await setImageSelected(false)
    }
    
    
    const generateEnqiryModal = ()=>{
        return(
            <>
                <Modal size="lg"  show={show} onHide={handleClose}>
                    <Row  className=''>
                        {modalFor.enqiry ?
                        <>
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
                        :
                        <>
                            <form onSubmit = {onUploadFile} className='p-5'>
                                { imageSelected ?
                                    <>
                                    <div className='d-flex'>
                                        <img className='w-25 me-3' src = {uploadedImage} alt="upladedImage" />
                                        <textarea className='w-100 p-2' value={desc} rows={4} placeholder="write your opinion" onChange={onReadDesc}></textarea>
                                    </div>
                                    {
                                        closeButton ? 
                                        <>
                                            <h2 className='mb-3 mt-3 text-center'>Image loaded successfully!</h2>
                                            <button className='btn btn-primary w-25 mt-3 mb-3' style={{fontWeight:"bold"}} type='button' onClick={handleClose}>Close</button>
                                        </>
                                        :
                                        <button className='btn btn-primary w-25 mt-3 mb-3' type = "submit" style={{fontWeight:"bold"}} >Upload File</button>
                                    }
                                    {showProgressBar?
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: `${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            <p>Loading image.......</p>
                                        </div>
                                        :
                                        ""
                                    }                                    
                                    </>
                                    :
                                    <div>
                                        <input className=' p-5 w-100 mb-4' style={{border:"2px dashed red", borderRadius:"8px", height:"260px"}} type="file" onChange={onReadFile} />
                                    </div>
                                }                           
                            </form>
                        </>

                        }
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
                                <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-primary float-end' onClick={onEnquiry}>
                                    <FaWhatsappSquare style={{fontSize:"25px",marginRight:"8px"}}/><span style={{fontWeight:"bold"}}>Enquire Now</span>
                                </button>
                            </div>
                        </Card.Body>
                        <div className='m-3'>
                            <button type='button' style={{border:"1px solid gray", marginRight:"25px"}} className='btn btn-primary' onClick={onUploadImage}>
                                <FaWhatsappSquare style={{fontSize:"25px",marginRight:"8px"}}/><span style={{fontWeight:"bold"}}>Upload Images</span>
                            </button>
                        </div>
                    </ Card>
                </Row>
            </Container>
        </>
    )
}

export default BusinessDetails