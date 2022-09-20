import React from 'react';
import ReactDOM from 'react-dom/client';
//setup react router dom
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import Carts from './pages/Carts/Carts';
import Detaill from './pages/Detail/Detaill';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import HomeTemplate from './templates/HomeTemplate';
//style 
import './assets/scss/style.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

   <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register'  element={<Register />}></Route>
          <Route path='carts'  element={<Carts />}></Route>
          <Route path='detail' >
            <Route path=':id'></Route>
          </Route>
          <Route path='profile'  element={<Profile />}></Route>
          <Route path='search'  element={<Search />}></Route>
          <Route path='*' element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
   </BrowserRouter>

);


