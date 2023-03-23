import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import { URL } from '../helpers/ApiHelper'
import swal from 'sweetalert'

function BusinessRegister() {

    const [contries, setContries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [details, setDetails] = useState({
                                            country:"",
                                            state:"",
                                            city:"",
                                            category:"",
                                            bussinessName:"",
                                            email:"",
                                            contactNo:"",
                                            address:"",
                                            isCountrySelected:false,
                                            isStateSelected:false
                                          })

    useEffect(()=>{
        const findCities = async()=>{
            const response = await fetch(`${URL}/api/countries`)
            const data = await response.json()
            console.log("cities --------->", data.data)
            const newContries = data.data.map((cv)=>({id:cv.id, name:cv.attributes.country_name}))
            setContries(newContries)
        }
        const findCategories = async()=>{
            const response = await fetch(`${URL}/api/categories`)
            const data = await response.json()
            console.log("categories --------->", data.data)
            const newCategories = data.data.map((cv)=>({id:cv.id, name:cv.attributes.category_name}))
            setCategories(newCategories)
        }
        findCities()
        findCategories()
    }, [])

    const onHandleInput =async(e)=>{
        const {name, value} = e.target
        if(name === "country"){
            const response = await fetch(`${URL}/api/states?filters[country][id][$eq]=${value}`)
            const data = await response.json()
            console.log("filtered States --------->",value,  data.data)
            const newStates = data.data.map((cv)=>({id:cv.id, name:cv.attributes.Name}))
            setStates(newStates)
            setDetails(prevDetails =>({...prevDetails, isCountrySelected:true }))
        }
        else if (name === "state"){
            const response = await fetch(`${URL}/api/cities?filters[state][id][$eq]=${value}`)
            const data = await response.json()
            console.log("filtered cities --------->",value,  data.data)
            const newcities = data.data.map((cv)=>({id:cv.id, name:cv.attributes.city_name}))
            setCities(newcities)
            setDetails(prevDetails =>({...prevDetails, isStateSelected:true }))
        }
        setDetails(preDetails =>({...preDetails, [name]:value}))
    }
    const onSubmitUserDetails = async(e)=>{
        e.preventDefault()
        //console.log(details)
        const jToken = localStorage.getItem("jwtToken")
        const payLoad = {
                            "data": {
                                        "Business_name":details.bussinessName ,
                                        "Email": details.email,
                                        "Contact_no": details.contactNo,
                                        "address": details.address,
                                        "cities": [details.city
                                        ],
                                        "category": details.category
                                    }
                        }
        const options = {
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                                "Authorization":`Bearer ${jToken}`
                            },
                            body:JSON.stringify(payLoad)
                        }

        const res = await fetch(`${URL}/api/businesses`,options)
        const data = await res.json()
        console.log(data)
        if (res.ok === true){
            swal("Boom...", "Your business Registerd successfuly", "success")
            //window.location.href = "/"
            setDetails(
                {
                    country:"",
                    state:"",
                    city:"",
                    category:"",
                    bussinessName:"",
                    email:"",
                    contactNo:"",
                    address:"",
                    isCountrySelected:false,
                    isStateSelected:false
                  }
            )
        }
        else{
            swal("Awww.....","Forbidden", "warning")
        }
        


    }
    //console.log(cities)

  return (
            <>
                <div className='login-page'>
                    <form  className='register-business' onSubmit={onSubmitUserDetails}>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">Country</label>
                            <div className="col-sm-10 w-50">
                                <Input type={"select"} name="country" value={details.country} onChange={onHandleInput} placeholder="select country">
                                    <option>Select country</option>
                                    {
                                        contries.map((cv, idx) =>
                                        <option key={idx} value={cv.id}>{cv.name}</option>
                                        )
                                    }
                                </Input>
                            </div>
                        </div>
                        {
                            details.isCountrySelected && 
                            <div className="mb-3 ml-5 w-75 row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">State</label>
                                <div className="col-sm-10 w-50">
                                    <Input type={"select"} name="state" value={details.state} onChange={onHandleInput}>  
                                        <option>Select State</option>
                                        {
                                            states.map((cv, idx) =>
                                            <option key={idx} value={cv.id}>{cv.name}</option>
                                            )
                                        }
                                    </Input>
                                </div>
                            </div>
                        }
                        {
                            details.isStateSelected && 
                            <div className="mb-3 ml-5 w-75 row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">City</label>
                                <div className="col-sm-10 w-50">
                                    <Input type={"select"} name="city" value={details.city} onChange={onHandleInput}>
                                        <option>Select City</option>
                                        {
                                            cities.map((cv, idx) =>
                                            <option key={idx} value={cv.id}>{cv.name}</option>
                                            )
                                        }
                                    </Input>
                                </div>
                            </div>
                        }
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label w-25">Business Category</label>
                            <div className="col-sm-10 w-50">
                                <Input type={"select"} name="category" value={details.category} onChange={onHandleInput}>
                                    {
                                        categories.map((cv, idx) =>
                                        <option key={idx} value={cv.id}>{cv.name}</option>
                                        )
                                    }
                                </Input>
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">Business Name</label>
                            <div className="col-sm-10 w-50">
                                <input type="text" name="bussinessName" onChange={onHandleInput} value={details.bussinessName} className="form-control" id="inputPassword" placeholder='Enter business name' />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">Email</label>
                            <div className="col-sm-10 w-50">
                            <input type="email" name="email" onChange={onHandleInput} value={details.email} className="form-control" id="inputEmail" placeholder='Enter business email' />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">contact No</label>
                            <div className="col-sm-10 w-50">
                            <input type="text" name='contactNo' onChange={onHandleInput} value={details.contactNo} className="form-control" id="inputPassword" placeholder='Enter business contact no'  />
                            </div>
                        </div>
                        
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">Address</label>
                            <div className="col-sm-10 w-50">
                            <textarea type="text" name="address"onChange={onHandleInput} rows={4} cols={30} value={details.address} className="form-control" id="inputPassword" placeholder='Enter business address'></textarea>
                            </div>
                        </div>
                        <div className="mb-3 row rg-bs-btn w-25 ms-5">
                            <button type = "submit"  className='btn btn-primary'>Register Business</button>
                        </div>
                    </form>
                </div>
            </>
        )
}

export default BusinessRegister