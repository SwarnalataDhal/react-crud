import React, { useEffect, useState} from 'react'
import UserApi from '../API/UserApi'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

function Home() {
  const [users,SetUsers] = useState([])

  const [index,setIndex] = useState(0)   // bigining index

  const itemsPerPage = 5 
  const endIndex = index + itemsPerPage;   // ending index
  const pCount = Math.ceil(users.length / itemsPerPage)   // page count

  // curreny active page item 
  const currentUsers = users.slice(index,endIndex)

  // page item handler
  const pageItemHandler = (e) => {
    console.log(`selected item =`, e.selected) //page item index
    let newIndex = (e.selected * itemsPerPage) % users.length;
    setIndex(newIndex)
  }

  const readHandler = async () => {
    await UserApi.readAll().then(res => {
      console.log(`data =`, res)
      SetUsers(res.data.users)
    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.msg)
    })

  }

  useEffect(()=> {
    readHandler()
  },[users])

  // delete
  const deleteHandler = async(id) => {
    if(window.confirm(`Are you sure to delete user id ?`)) {
      await UserApi.deleteUser(id)
      .then(res => {
        toast.success(res.data.msg)
      }).catch(err => toast.error(err.response.data.msg))
    } else {
      toast.warning(`delete terminated`)
    }
  }

  return (
    <div className=' container'>
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <div className="table table-responsive">
            <table className="table table-bordered table-striped table-hovered">
              <thead>
                <tr>
                  <th colSpan={6}>
                    <h4 className='display-4 text-success text-center'>Users Data</h4>
                  </th>
                </tr>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentUsers && currentUsers.map((item,index) => {
                    return (
                      <tr key={index} className='text-center'>
                        <td> {item._id} </td>
                        <td> {item.name} </td>
                        <td> {item.email} </td>
                        <td> {item.mobile} </td>
                        <td> {item.isActive ? <strong className='text-success'>Active</strong> : <strong className='text-danger'>Blocked</strong> } </td>
                        <td>
                          <NavLink to={`/edit/${item._id}`} className="btn btn-sm btn-info" title='Edit' >
                            <i className='bi bi-pencil'></i>
                          </NavLink>

                          <button onClick={() => deleteHandler(item._id)} className='btn btn-sm btn-danger' title='Delete'>
                            <i className='bi bi-trash'></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={6}>
                  <ReactPaginate
                 pageCount = {pCount}  
                 onPageChange = {pageItemHandler}
                 className='pagination justify-content-center' 
                 pageClassName='page-item'
                 pageLinkClassName='page-link' 
                 nextClassName='page-item'
                 nextLinkClassName='page-link'
                 previousClassName='page-item'
                 previousLinkClassName='page-link'
                 activeClassName='active'
                 activeLinkClassName='active'
                 breakLabel="..."
                 pageRangeDisplayed={3}
                 />
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
