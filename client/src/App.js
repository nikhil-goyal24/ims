import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Tax from './pages/tax';
import AddProduct from './pages/add_product';
import Sales from './pages/sales';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/add' element={<AddProduct />}></Route>
        <Route path='/sales' element={<Sales />}></Route>
        <Route path='/tax' element={<Tax />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
