import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap'
import { Rings } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { searchContext } from '../Context'
import { URL } from '../helpers/ApiHelper'
import AllBusinesses from './AllBusinesses'
import swal from 'sweetalert';
//import commonApiCallMethod from '../utils/commonApiCAll'
//import BusinessDetail from './AllBusinesses'

function Businesses() {
    //const array = [1,2]
    const {filterInput} = useContext(searchContext)
    //console.log("businesses --->", filterInput)

    const [isLoading, setIsLoading] = useState(true)
    const [paginationInfo, setPaginationInfo] = useState({})
    const [pageCount, setPageCount]= useState(0)
    //const [isOpen, setIsOpen] = useState(false)
    const [businessDetail, setBusinessDetail] = useState([])
    const [queryParam] = useSearchParams()
    const params = queryParam.get("category_name")
    const emptyImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    //const [count, setCount] = useState(0)
    //Modal 
    const [show, setShow] = useState(false)
    useEffect(()=>{
        console.log("called api page no is ------->",pageCount )

        const getBussinesse = async()=>{
            const res = await fetch(`${URL}/api/occupations?populate=*&filters[category][category_name][$containsi]=${params}&pagination[page]=${pageCount + 1}&pagination[pageSize]=8`)
            const data = await res.json()
            console.log("businessData--->",data.data)
            if (res.ok === true){
                const newData = data.data.map(eachData => ({
                    rating:eachData.attributes.rating,
                    id:eachData.id,
                    name:eachData.attributes.name,
                    contactNo:eachData.attributes.contact_no,
                    imageUrl:(eachData.attributes.image.data ===null ? emptyImage : `${URL}${eachData.attributes.image.data[0].attributes.url}`)
                }))
                setIsLoading(false)
                setBusinessDetail([...businessDetail,...newData])
                const meta = data.meta.pagination
                setPaginationInfo({...meta})
                
                
            }
            else{
                swal("Awwww.....","Something went wrong", "danger" )
            }
        }
        getBussinesse()

        //console.log("UseEffect runs once", count)

    }, [pageCount])

    const getNewData = ()=>{
        if (pageCount < paginationInfo.pageCount-1){
            setPageCount(pageCount + 1)
            console.log(" ")
        }
    }

    window.onscroll = () => {

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
        // console.log("scrollTop------->",scrollTop)
        // console.log("clientHeight------->",clientHeight)
        // console.log("scrollHeight----->",scrollHeight)

        if (scrollTop + clientHeight >= scrollHeight -120){
            console.log("api called and page no is----->", pageCount)
            getNewData()
        }
    }

    const getRatingValue = (e)=>{
        const rating = e.target.getAttribute("data-value")
        console.log(rating)
        const ratingFilter = businessDetail.filter(eachCount => eachCount.rating === parseInt(rating))
        setBusinessDetail(ratingFilter)
    }

    const handleOpenModal = ()=>{
        setShow(true)
    }
    const handleClose = ()=>{
        setShow(false)
    }


    const filterBusinesses = businessDetail.filter(eachBusiness=> eachBusiness.name.toLowerCase().includes(filterInput.toLowerCase()))
    console.log("filter----->", filterBusinesses)
    console.log(paginationInfo)
    

    const generateModel = ()=>{
        return(
            <>  
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Button className='float-start w-25 m-2' variant='secondary' data-value="5" type='button' onClick = {getRatingValue} >5 Star</Button>
                    <Button className='float-start w-25 m-2' variant='secondary' data-value="4" type='button' onClick = {getRatingValue} >4 Star</Button>
                    <Button className='float-start w-25 m-2' variant='secondary' data-value="3" type='button' onClick = {getRatingValue} >3 Star</Button>
                    <Button className='float-start w-25 m-2' variant='secondary' data-value="2" type='button' onClick = {getRatingValue} >2 Star</Button>
                    <Button className='float-start w-25 m-2' variant='secondary' data-value="1" type='button' onClick = {getRatingValue} >1 Star</Button>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Apply Filter
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }

    

    return (
        <>
            {generateModel()}
            <Row className='m-5'>
                <Col>
                    <Dropdown className='float-start me-3'>
                        <Dropdown.Toggle style={{width:"160px"}} variant="secondary" id="dropdown-basic">
                            Rating
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item data-value="5" onClick = {getRatingValue} >5 Star</Dropdown.Item>
                            <Dropdown.Item data-value="4" onClick = {getRatingValue} >4 Star</Dropdown.Item>
                            <Dropdown.Item data-value="3" onClick = {getRatingValue} >3 Star</Dropdown.Item>
                            <Dropdown.Item data-value="2" onClick = {getRatingValue} >2 Star</Dropdown.Item>
                            <Dropdown.Item data-value="1" onClick = {getRatingValue} >1 Star</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='float-start'>
                        <Dropdown.Toggle style={{width:"160px"}}  variant="secondary" id="dropdown-basic">
                            Price
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item  >Low to High</Dropdown.Item>
                            <Dropdown.Item >High to Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className='float-end' type="button"  variant="secondary" onClick={handleOpenModal} >Quick Filter</Button>
                </Col>
            </Row>
            {
                isLoading ? 
                <div className="d-flex justify-content-center items-center mt-5 pt-5 ">
                    <Rings color="#00BFFF" height={280} width={280} />
                </div>
                :
                <ul className='business-list-items'>
                    {
                        filterBusinesses.length > 0 ? 
                        filterBusinesses.map((eachItem, idx) =><AllBusinesses details={eachItem}  key={idx} />)
                        :
                        <>
                            <h1 className='empty-para'>Sorry....!! Searched Key word Does not contain any business Name</h1>
                            <h1 style={{textAlign:"center", width:"100%",marginBottom: "15%", marginTop:"30px", color: "green"}}>Thank you</h1>
                        </> 
                    }
                </ul>
            }

        </>
    )
}

export default Businesses