import React from 'react'

function BusinessRegister() {

    const onUserNameInput = ()=>{

    }
    const onEmailInput =()=>{

    }
    const onPasswordInput = ()=>{

    }
    const onSubmitUserDetails =()=>{
        
    }

  return (
            <>
                <div className='login-page'>
                    <form  className='register-business'>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">City</label>
                            <div className="col-sm-10 w-50">
                            <input type="select" onChange={onEmailInput} value={"email"} className="form-control" id="inputEmail">
                            </input>
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label w-25">Business Name</label>
                            <div className="col-sm-10 w-50">
                            <input type="text" onChange={onUserNameInput}  value={"business name"} className="form-control" id="staticEmail"  />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label w-25">Email</label>
                            <div className="col-sm-10 w-50">
                            <input type="email" onChange={onEmailInput} value={"email"} className="form-control" id="inputEmail" />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">contact No</label>
                            <div className="col-sm-10 w-50">
                            <input type="text" onChange={onPasswordInput} value={"Contact no"} className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">Image</label>
                            <div className="col-sm-10 w-50">
                            <input type="text" onChange={onPasswordInput} value={"Image url"} className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div className="mb-3 ml-5 w-75 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label w-25">Address</label>
                            <div className="col-sm-10 w-50">
                            <input type="text" onChange={onPasswordInput} value={"Address"} className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div className="mb-3 row rg-bs-btn w-25 ms-5">
                            <input onClick={onSubmitUserDetails} className='btn btn-primary' value = "Register Business" />
                        </div>
                    </form>
                </div>
            </>
        )
}

export default BusinessRegister