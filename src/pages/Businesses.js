import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/ApiHelper'
import BusinessDetail from './BusinessDetail'

function Businesses() {
    //const array = [1,2]
    const [isLoading, setIsLoading] = useState(true)
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

    },[])


  return (
        <>
            {
                isLoading ? 
                <div className="d-flex justify-content-center items-center mt-5 pt-5 ">
                    <Rings color="#00BFFF" height={280} width={280} />
                </div>
                :
                <>
                    {
                        allBusiness.length > 0 ? 
                        allBusiness.map((eachItem, idx) =><BusinessDetail details={eachItem}  key={idx} />)
                        :
                        <h1 className='empty-para'>This Category has Nothing to show</h1>
                    }
                </>
            }

        </>
    )
}

export default Businesses