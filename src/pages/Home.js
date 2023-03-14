import React, { useEffect, useState } from 'react'
import { URL } from '../helpers/ApiHelper'
import { Rings } from 'react-loader-spinner'

const ListItems = (props)=>{
    const {category} = props
    const {categoryName, imgUrl} = category
    return(
        <>
            <li className='list-items'>
                <img className='' src={`${URL}${imgUrl}`} />
                <p>{categoryName}</p>
            </li>
        </>
    )
}



function Home() {

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const getData = async () =>{
            const url = `${URL}/api/categories?populate=*`
            const res = await fetch(url)
            const data = await res.json()
            setIsLoading(false)
            //console.log(data)
            const newData = data.data.map((cv,idx) =>{
                //console.log(cv.attributes.image.data[0].attributes.name                  )
                return ({
                            categoryName: cv.attributes.business_name,
                            imgUrl:cv.attributes.image.data[0].attributes.url
                        })
            })
            setCategories([...newData])
            console.log(newData)
        }
        getData()
    }, [])


  return (
    <>
        {
            isLoading ? 
            <div className="d-flex justify-content-center items-center mt-5 pt-5 ">
                <Rings color="#00BFFF" height={280} width={280} />
            </div>
            :
            <ul className='categories-list'>
                {
                    categories.map((eachCategory, idx) =>
                        <ListItems key={idx} category={eachCategory} />    
                    )
                }
            </ul>
        }
    </>
  )
}

export default Home