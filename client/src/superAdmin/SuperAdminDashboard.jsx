import React, { useEffect, useState } from 'react';
import SuperAdminNav from './SuperAdminNav';
import styles from './SuperAdminDash.module.css'
import axios from 'axios';

function SuperAdminDashboard() {
  const[details,setDetails]=useState([]);
 


  const fetchAdminData=async()=>{
    try {
      const response=await axios.get(`http://localhost:8000/api/v1/superadmin/getalladmins`);
      
      console.log("Admins list",response.data.response);
      setDetails(response.data.response)
    } catch (error) {
      console.log("Error",error)
      
    }

  }
  useEffect(()=>{
    fetchAdminData()
  },[])
  const handleStatus=async(id)=>{
    try {
      const response=await axios.patch(`http://localhost:8000/api/v1/superadmin/adminlogincontrol`,{
        id:id
      })
      const updatedDetails = details.map((admin) =>
        admin._id === id ? { ...admin, isEnabled: response.data.admin.isEnabled } : admin
      );
      setDetails(updatedDetails)
    } catch (error) {
      console.log("Error",error)
      
    }

  }

  const handleDelete=async(id)=>{
    // console.log("handle delete id",id)
try {
  const response=await axios.delete(`http://localhost:8000/api/v1/superadmin/deleteadmin`,{data:{id}})
  // console.log("id",response);
const updatedDetails=details.filter((admin)=>admin._id!==id);
setDetails(updatedDetails)
} catch (error) {
  
}
  }
  return (
    <div>
    <SuperAdminNav/>
    <div className={styles.main}>
      <table>
        <thead>
        <tr>
          <th>Sl.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Status</th>

        </tr>
        </thead>
        <tbody>
          {details.map((item,index)=>(

    
          <tr key={item._id}>
            <th>{index+1}</th>
            <th>{item.fullName}</th>
            <th>{item.email}</th>
            <th>{item.date}</th>
            <th><button onClick={()=>handleStatus(item._id)}>{item.isEnabled?"Disable":"Enable"}</button></th>
            <th><button onClick={()=>handleDelete(item._id)}>Delete</button></th>



          </tr>
                ))}
        </tbody>


      </table>
    </div>
    

      
    </div>
  )
}

export default SuperAdminDashboard
