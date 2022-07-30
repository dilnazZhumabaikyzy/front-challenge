import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import CommentPage from '../commentPage';
import { postArray as myPostArray } from '../modules/posts';
import {useEffect, useState } from 'react';




export const MyRoutes = () => {  
  const [postArray, setPostArray] = useState(myPostArray);
  useEffect(()=>{
    if(!localStorage.getItem('postArray')){
      console.log("localStorage is empty: set default data ");
      localStorage.setItem('postArray', JSON.stringify(myPostArray));
    }  
      setPostArray([...JSON.parse(localStorage.getItem('postArray'))]);  
  }, []);
      return (
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<App postArray = {postArray} setPostArray = {setPostArray}/>} />
          <Route path='/comments/:key' element={<CommentPage postArray= {postArray} setPostArray = {setPostArray}/>} />
         </Routes>
      </BrowserRouter>
      )
}