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
      console.log(typeof(employe_data),employe_data[0].firstname,'ee')
      SetEmpData(employe_data)
    })
  }
  if(emp_data.length<1){
    emp();
 }


    // console.log(emp_data[0].lastname,'last')

  

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

            
           
      
          <input type="submit" value="Edit Employee Data"  onClick={Datasubmit} /> 
         
          
        </form>
            </div>
        )

    
    }



export default Edit;