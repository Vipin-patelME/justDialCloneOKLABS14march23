import React, { useState } from 'react'
import swal from 'sweetalert';

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const onUserNameInput = e =>{
        setUsername(e.target.value)
    }

    const onPasswordInput = e =>{
        setPassword(e.target.value)
    }
    const onEmailInput = e =>{
        setEmail(e.target.value)
    }


    const onSubmitUserDetails = (e)=>{
        e.preventDefault()
        const url = "http://localhost:1337/api/auth/local/register"
        const userData = {
            "username": username.toLowerCase(),
            "email": email,
            "password": password
          }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };

        console.log(username)

        fetch(url, options)
        .then((res =>{
            console.log(res.json())
            //return res.json()
            if (res.ok === true){
                swal("Boom...!", "User created successfuly!", "success")
            } 
            else{
                swal("Awwww....!", "User name or Gmail already taken!", "error")
                
            }
        }))
        .catch()
    }

    return (
        <div className='login-page'>
            <form  className='login-form' onSubmit={onSubmitUserDetails}>
                <div className="mb-3 ml-5 w-75 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User name</label>
                    <div className="col-sm-10 w-50">
                    <input type="text" onChange={onUserNameInput}  value={username} className="form-control" id="staticEmail"  />
                    </div>
                </div>
                <div className="mb-3 ml-5 w-75 row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10 w-50">
                    <input type="email" onChange={onEmailInput} value={email} className="form-control" id="inputEmail" />
                    </div>
                </div>
                <div className="mb-3 ml-5 w-75 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10 w-50">
                    <input type="password" onChange={onPasswordInput} value={password} className="form-control" id="inputPassword" />
                    </div>
                </div>
                <div className="mb-3 row cr-btn-cont w-25 ml-5">
                    <button type='submit'  className='btn btn-primary'>Create Account </button>
                </div>
            </form>
        </div>
    )
}