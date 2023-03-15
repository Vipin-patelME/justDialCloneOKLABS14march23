import React, { useState } from 'react'
import swal from 'sweetalert'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onUserNameInput = e =>{
        setUsername(e.target.value)
    }

    const onPasswordInput = e =>{
        setPassword(e.target.value)
    }

    const onLoginSuccess = data =>{
        localStorage.setItem("jwtToken", data.jwt)
        //console.log(data.jwt)
        window.location.href="/"
    }


    const onUserLogin = async (e) =>{
        e.preventDefault()
        const url = "http://localhost:1337/api/auth/local"
        const userData = {
            "identifier": username,
            "password": password
          }
          
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };

        const res = await fetch(url, options)
        swal("Well done", "Logged in Successfuly", "success")
        const data = await res.json()
        
        if (res.ok === true){
            onLoginSuccess(data)
        }
        else{
            swal("Awwww...", "Credentials mismatch", "warning")
        }
        
    }

    return (
        <div className='login-page'>
            <form onSubmit={onUserLogin} className='login-form'>
                <div className="mb-3 ml-5 w-75 row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">User name</label>
                    <div className="col-sm-10 w-50">
                        <input type="text" onChange={onUserNameInput} value={username}  className="form-control" id="username"  />
                    </div>
                </div>
                <div className="mb-3 ml-5 w-75 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10 w-50">
                        <input type="password" onChange={onPasswordInput} value={password} className="form-control" id="inputPassword" />
                    </div>
                </div>
                <div className="mb-3 row btn-cont">
                    <button type='submit' className='btn btn-primary'>Login</button>
                </div>
            </form>
        </div>
    )
}


export default Login