import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useSearchParams } from "react-router-dom";


const Edit=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(searchParams.get("id"));
    const[emp_data,SetEmpData]=useState([])
     
   console.log(id,'id')
   
const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState(Number());
  const [salary, setSalary] = useState(Number());
  const navigate=useNavigate();
  const db=firebase.firestore();

  const emp=()=>{db
    .collection('employee')
    .where(firebase.firestore.FieldPath.documentId(),'==',id)
    .onSnapshot((snapshot)=>{ 

      const employe_data= snapshot.docs.map((doc)=> {
      const data=doc.data();
      data['id']=doc.id
      console.log(data);
        return data;
      }
      );
      SetEmpData(employe_data)
      setFirstName(employe_data[0].firstname)

      setLastName(employe_data[0].lastname)
      setAge(employe_data[0].age)
      setSalary(employe_data[0].salary)

    })
  }
  if(emp_data.length<1){
    emp();
 }



  

    const Datasubmit=async(e)=>{
        e.preventDefault();
        if(firstname != '' && lastname!= '' && age!= '' && salary != ''){
        const docRef=db.collection('employee').doc(id);
 
        docRef
        .update({
         firstname:firstname,
         lastname:lastname,
         age:age,
         salary:salary
        })
        .then(()=>{
          console.log('Updated')
        })
        .catch((err)=>{
          console.log('err',err);
      
        })
   
    navigate('/Display')
      }else{
        alert('Please Fill all details')
      }
  }

  const backHome=(e)=>{
    e.preventDefault()
    navigate('/Display')
  }
  
        return (
            <div className="Form">
                <h1>Edit Employee Form</h1>
                <form className="details-section">
          <div className="name">
            <div className="heading">First Name</div>
            <div className="value">
              <input
                type="text"
                placeholder="Loading.."
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
                placeholder="Loading.."
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
             placeholder="loading.."
             value={age} 
             onChange={(event) => setAge(event.target.value)}></input>
            </div>
          </div>
          <div className="salary">
            <div className="heading">Salary</div>
            <div className="value">
             <input type='number'
                  placeholder="loading"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  ></input>
            </div>
          </div>

            
           
      
          <input type="submit" value="Edit Employee Data"  onClick={Datasubmit} /> 
         
          
        </form>
        <button onClick={backHome}>Back</button>
            </div>
        )

    
    }



export default Edit;