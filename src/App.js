import React,{useEffect} from 'react';
import Router from './router'
import AuthContext from "./Context/AuthContext";
import './App.css';
import Aos from 'aos'
import { Sugar } from 'react-preloaders';

export default function App() {
  useEffect(() => {
    
    Aos.init({
      once: true,
      easing: 'slide',
  });
  })
  return (
    <>
    <Sugar background="#1e2125" color="#0f4c75" time={1000} />
    <AuthContext>
      <Router />
    </AuthContext>
    </>
  )
}
