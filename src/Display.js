import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Data from "./Data";

const Display=()=>{
    const [employee_data, setEmployeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const db=firebase.firestore();
    const navigate=useNavigate();
    const home=(e)=>{
       e.preventDefault();
       navigate('/');
    }
 
  const employeeData=()=>{ db
    .collection('employee')
    .onSnapshot((snapshot)=>{ 

      const employe_data= snapshot.docs.map((doc)=> {
      const data=doc.data();
      data['id']=doc.id
    //   console.log(data);
        return data;
      });
      setEmployeData(employe_data)
    //   employee_data=employe_data
    setLoading(false)
    });
}
if(employee_data.length<1){
    employeeData()
   }
    // console.log(employee_data,'dataatat')
    
  
    console.log(employee_data,'dataatat')

        return(
    <>
    <h1>Employee Data</h1>
    <button id="new-entry" onClick={home} >New Entry!!</button>
    {loading && <h1>Loading Data...</h1>}
    
  
   
 
            <table className="Data">
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>Salary</th>
              </tr>
                {employee_data.map((product)=>{
                return <Data
                Edata={product} 
                key={product.id}
                //  onIncreaseQuantity={props.onIncreaseQuantity} 
                //  onDecreaseQuantity={props.onDecreaseQuantity}
                //  onHandleDeleteProduct={props.onHandleDeleteProduct}
                  />} )} 
            </table>

    </>
        
    )

    
    }



export default Display;