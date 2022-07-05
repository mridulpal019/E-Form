import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Edit from "./Edit";


const Data=(props)=>{
    const {firstname ,lastname,age,salary,id} =props.Edata
    console.log(id);
    const navigate=useNavigate();
   console.log(props,'data ke andr',firstname,lastname,age,salary)
   const editPage=(e)=>{
    e.preventDefault()
    navigate(`/Edit/?id=${id}`)


   }
    const deleteData=(e)=>{
        e.preventDefault();

    }
        return(
            <tr>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{age}</td>
            <td>{salary}</td>
            <td><button onClick={editPage}>Edit</button></td>
            <td><button onClick={deleteData}>delete</button></td>
          </tr>
        
    )

    
    }



export default Data;