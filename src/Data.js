import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Edit from "./Edit";


const Data=(props)=>{
    const {firstname ,lastname,age,salary,id} =props.Edata
    console.log(id);
    const navigate=useNavigate();
    const db=firebase.firestore();
//    console.log(props,'data ke andr',firstname,lastname,age,salary)
   const editPage=(e)=>{
    e.preventDefault()
    navigate(`/Edit/?id=${id}`)


   }
    const deleteData=(e)=>{
        e.preventDefault();
        const docRef=db.collection('employee').doc(id);
        docRef
        .delete()
        .then(()=>{
          console.log('Deleted')
        })
        .catch((err)=>{
          console.log('err',err);
      
        })

    }
        return(
            <tr className="card">
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{age}</td>
            <td>{salary}</td>
            <td><button onClick={editPage} className='edit-button'>Edit</button></td>
            <td><button onClick={deleteData} className="del-button">Delete</button></td>
          </tr>
        
    )

    
    }



export default Data;