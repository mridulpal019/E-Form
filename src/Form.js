import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Routes, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Display from "./Display";

const Form=()=>{

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState(Number());
  const [salary, setSalary] = useState(Number());
  const navigate=useNavigate();
  const db=firebase.firestore();

    const clearData=(e)=>{
      e.preventDefault();
      setFirstName('');
      setLastName('');
      setSalary(Number());
      setAge(Number());

    }
    const Datasubmit=async(e)=>{
        e.preventDefault();
        console.log(firstname,lastname,age,salary);
        if(firstname != '' && lastname!= '' && age!= '' && salary != ''){
        const res = await db.collection('employee').add({
          firstname: firstname,
          lastname:lastname,
          age:Number(age),
          salary:Number(salary)
        });
        console.log('Added document with ID: ', res.id);
       
    db
    .collection('employee')
    .onSnapshot((snapshot)=>{ 

      const products= snapshot.docs.map((doc)=>{
      const data=doc.data();
      data['id']=doc.id
      console.log(data);
        return data;
      });
     
    });
    navigate('/Display')
  }else{
    alert('Kindly Fill all the Information')
  }
  }
  const backHome=(e)=>{
    e.preventDefault()
    navigate('/Display')
  }
  
        return (
            <div className="Form">
                <h1>Employee Form</h1>
                <form className="details-section">
          <div className="name">
            <div className="heading">First Name</div>
            <div className="value">
              <input
                type="text"
                placeholder="First Name"
                required
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
          </div>

          <div className="Last_Name">
            <div className="heading">Last Name</div>
            <div className="value">
            <input
                type="text"
                placeholder="Last Name"
                required
               value={lastname}
               onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="age">
            <div className="heading">Age</div>
            <div className="value">
             <input type='number'
             placeholder="Age"
             value={age} 
             onChange={(event) => setAge(event.target.value)}></input>
            </div>
          </div>
          <div className="salary">
            <div className="heading">Salary</div>
            <div className="value">
             <input type='number'
                  placeholder="Salary"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  ></input>
            </div>
          </div>

            
           
      
          <input type="submit" value="Add Employee Data"  onClick={Datasubmit} /> 
         
          
        </form>
        <button onClick={clearData}>Clear</button>
        <button onClick={backHome}>All Employee data </button>
            </div>
        )
         } 


export default Form;