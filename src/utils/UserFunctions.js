import React from 'react'
import api from '../api'
// import api from 'api'
// import { URL_API } from "./api";

export const register = newUser => {
  return api
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return api
    .post('login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
      return res.data
    })
    .catch(err => {
      console.log('Invalid username and password, ' + err)
    })
}

export const logout = () => {
  localStorage.removeItem('usertoken');
  window.location.replace('/login')
}

export const getUser = id => {
  return api
    .get(`getuser/${id}`)
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}
