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

    // constructor(){
    //     super();
    //     this.state={
    //        firstname:'',
    //        lastname:'',
    //        age:undefined,
    //        salary:undefined,
    //     } 
    //     this.db=firebase.firestore();
      

       
    // }
   

    
    
  
    // handleFirstName=(e)=>{
    //     this.setState({
    //         firstname:e.target.value
    //     })
    // }
    // handleLastName=(e)=>{
    //     this.setState({
    //         lastname:e.target.value
    //     })
    // }
    // handleAge=(e)=>{
    //     this.setState({
    //         age:e.target.value
    //     })
    // }
    // handleSalary=(e)=>{
    //     this.setState({
    //         salary:e.target.value
    //     })
    // }

    const Datasubmit=async(e)=>{
        e.preventDefault();
        console.log(firstname,lastname,age,salary);
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
  }
  
    // }
    //     render(){
        return (
            <div className="Form">
                <h1>Employee Form</h1>
                <form className="details-section">
          <div className="name">
            <div className="heading">First Name</div>
            <div className="value">
              <input
                type="text"
                placeholder="Mahendra"
                required
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
                // onChange={this.handleFirstName}
              />
            </div>
          </div>

          <div className="Last_Name">
            <div className="heading">Last Name</div>
            <div className="value">
            <input
                type="text"
                placeholder="Dhoni"
                required
               value={lastname}
              //  onChange={this.handleLastName}
               onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="age">
            <div className="heading">Age</div>
            <div className="value">
             <input type='number'
             placeholder="14"
             value={age} 
             onChange={(event) => setAge(event.target.value)}></input>
            </div>
          </div>
          <div className="salary">
            <div className="heading">Salary</div>
            <div className="value">
             <input type='number'
                  placeholder="14000"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  ></input>
            </div>
          </div>

            
           
      
          <input type="submit" value="Add Employee Data"  onClick={Datasubmit} /> 
         
          
        </form>
            </div>
        )
         } 
        // }

export default Form;