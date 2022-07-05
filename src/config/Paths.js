import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Display from '../Display';
import Form from '../Form';
import Edit from '../Edit';

const Paths = () => {
    return (
        <div>
        <Routes>
   
        <Route
               exact
                path='/'
                element={<Form/>}
            />
            <Route
               exact
                path='/Display'
                element={<Display/>}
            />
             <Route
               exact
                path='/Edit'
                element={<Edit/>}
            />
         
            
        </Routes>
        </div>
        
    );
}

export default Paths;