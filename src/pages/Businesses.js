import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Rings } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/ApiHelper'
import AllBusinesses from './AllBusinesses'
//import BusinessDetail from './AllBusinesses'

function Businesses() {
    //const array = [1,2]
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [allBusiness, setAllBusiness] = useState([{name:""}])
    const [queryParam] = useSearchParams()
    const params = queryParam.get("category_name")
    const emptyImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"

    useEffect(()=>{
        const getBussinesse = async()=>{
            const res = await fetch(`${URL}/api/occupations?populate=*&filters[category][category_name][$containsi]=${params}`)
            const data = await res.json()
            console.log(data.data)
            const newData = data.data.map(eachData => ({
                id:eachData.id,
                name:eachData.attributes.name,
                contactNo:eachData.attributes.contact_no,
                imageUrl:(eachData.attributes.image.data ===null ? emptyImage : `${URL}${eachData.attributes.image.data[0].attributes.url}`)
            }))
            setAllBusiness(newData)
            setIsLoading(false)
        }
        getBussinesse()

    }, [])
    const openMenu=()=>{
        setIsOpen(!isOpen)
    }
    const closeMenu=()=>{
        setIsOpen(!isOpen)
    }
  return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" show={true} onMouseEnter={openMenu} onMouseLeave={closeMenu} id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
            {
                isLoading ? 
                <div className="d-flex justify-content-center items-center mt-5 pt-5 ">
                    <Rings color="#00BFFF" height={280} width={280} />
                </div>
                :
                <ul className='business-list-items'>
                    {
                        allBusiness.length > 0 ? 
                        allBusiness.map((eachItem, idx) =><AllBusinesses details={eachItem}  key={idx} />)
                        :
                        <h1 className='empty-para'>{`${params} Category has Nothing to show`}</h1>
                    }
                </ul>
            }

        </>
    )
}

export default Businesses