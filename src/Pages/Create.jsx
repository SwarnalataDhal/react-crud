import React, { useState } from 'react'
import { toast } from 'react-toastify'
import UserApi from '../API/UserApi'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [user,SetUser] = useState({
    name: "",
    email:"",
    mobile:""
  })

  const navigate = useNavigate()


  const readInput = (e) => {
    const {name, value} = e.target 
    SetUser({...user, [name]:value })
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log(`new user =`, user)
      await UserApi.createUser(user)
      .then(res => {
        toast.success(res.data.msg)
        navigate(`/`)
      }).catch(err => {
        toast.error(err.response.data.msg)
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="display-3 text-success">Create User</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body" onSubmit={submitHandler}>
              <form autoComplete="off">
                <div className="form-group mt-2">
                  <label htmlFor="name">Name</label>
                  <input type="text" name='name' value={user.name} onChange={readInput} id='name' className='form-control' required />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email' value={user.email} onChange={readInput} id='email' className='form-control' required />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="number" name='mobile' value={user.mobile} onChange={readInput} id='mobile' className='form-control' required />
                </div>
                <div className='form-group mt-2'>
                  <input type="submit" value="Create User"  className='btn btn-success' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
