import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './Components/Auth/signup';
import Login from './Components/Auth/login';
import Dashboard from './Components/pages/dashboard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Visa from './Components/pages/visa';
import University from './Components/pages/university';
import Course from './Components/pages/course';
import Profile from './Components/pages/profile';
import NavBar from './Components/General/NavBar';
import APS from './Components/pages/APS';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  },
  {
    path: "/university",
    element: <University></University>
  },
  {
    path: "/course",
    element: <Course></Course>
  },
  {
    path: "/visa",
    element: <Visa></Visa>
  },
  {
    path: "/aps",
    element: <APS></APS>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  },
  {
    path: "/",
    element: <Dashboard></Dashboard>
  },
]);

export default function App() {
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  )
}

axios.interceptors.request.use(function (config) {
  if(config.url.slice(0,4)!=='http'){
    config.url = 'http://localhost:5500' + config.url
  }
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use(function (config, error) {
  return config;
}, error => {
  if (error.response && error.response.status === 401) {
    return axios.post('/auth/refresh', { 'refresh_token': localStorage.getItem('refresh_token') }).then(response => {
      if (response.data && response.data.success) {
        localStorage.setItem('access_token', response.data.user.access_token);

        error.response.config.headers['Authorization'] = 'Bearer ' + response.data.user.access_token;
        return axios.request(error.response.config);
      } else {
        //redirect to login page
      }
    }).catch(error => {
      //redirect to login page
      console.log(error);
      return error;
    })
  }
});