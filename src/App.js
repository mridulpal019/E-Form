import Form from './Form';
import './App.css';
import Paths from "./config/Paths";
import { BrowserRouter, Router } from 'react-router-dom';
import Display from './Display';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Form/> */}
       <Paths/>
      </BrowserRouter>
      {/* <Display/> */}
    </div>
  );
}

export default App;
