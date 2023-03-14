import React, { useState } from 'react'

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

    const onLogiSuccess = ()=>{
        alert("Registration Successful")
        window.location.href="/login"
    }

    const onSubmitUserDetails = ()=>{
        const url = "http://localhost:1337/api/auth/local/register"
        const userData = {
            "username": username,
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
            console.log(res)
            //return res.json()
            if (res.ok === true){
                onLogiSuccess()
            } 
            else{
                alert("User Already exist plaese login")
                window.location.href="/login"
            }
        }))
        .catch()
    }

    return (
        <div className='login-page'>
            <form  className='login-form'>
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
                    <input onClick={onSubmitUserDetails} className='btn btn-primary' value = "Create Account" />
                </div>
            </form>
        </div>
    )
}