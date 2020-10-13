import React from 'react';
import Router from './router'
import AuthContext from "./Context/AuthContext";
import './App.css';

export default function App() {
  return (
    <AuthContext>
      <Router />
    </AuthContext>
  )
}
