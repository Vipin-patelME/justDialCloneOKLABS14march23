import React, { useContext, useEffect, useState } from 'react'
import { URL } from '../helpers/ApiHelper'
import { Rings } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { searchContext } from '../Context'

const ListItems = (props)=>{
    const {category} = props
    const {categoryName, imgUrl} = category
    

    return(
        <Link className='link-style' to={`/business/categories/?category_name=${categoryName}`}>
            <li className='list-items'>
                <img className='img-style'  src={`${URL}${imgUrl}`}  alt={categoryName} />
                <p className='text-center w-75'>{categoryName}</p>
            </li>
        </Link>
    )
}



function Home() {

    const [categories, setCategories] = useState([{id:"",categoryName:"",imgUrl:"" }])
    const [isLoading, setIsLoading] = useState(true)
    const {filterInput} = useContext(searchContext)
    //console.log(filterInput)
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
                            id:cv.id,
                            categoryName: cv.attributes.category_name,
                            imgUrl:cv.attributes.image.data[0].attributes.url
                        })
            })
            setCategories([...newData ])
            //console.log(newData)
        }
        getData()
    }, [])

    const filterderCategories = categories.filter(eachCategory =>eachCategory.categoryName.toLowerCase().includes(filterInput.toLowerCase()))
    //console.log(filterderCategories)
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
                    filterderCategories.length > 0 ?
                    filterderCategories.map((eachCategory, idx) =>
                        <ListItems key={idx} category={eachCategory} />    
                    )
                    :
                    <>
                        <h1 className='empty-para'>Sorry....!! Searched Key word Does not contain any business category</h1>
                        <h1 style={{textAlign:"center", width:"100%",marginBottom: "15%", marginTop:"30px", color: "green"}}>Thank you</h1>
                    </>
                }
            </ul>
        }
    </>
  )
}

export default Home