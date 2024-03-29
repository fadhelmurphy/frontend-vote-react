import React from 'react'

// import Add from "../Button/AddVoteButton/Add";

import { Link } from "react-router-dom";
import { GetRootContext } from '../../../../Context/Context';
import { logout } from '../../../../Helpers/httpheader';
// import Add from '../../Button/AddVoteButton/Add';
export default function AuthNav(props){
  const{_postLogout} =GetRootContext()
    return(
        <>
        
        <nav class="navbar navbar-dark bg-primary navbar-expand fixed-bottom d-md-none d-lg-none d-xl-none p-0 pb-2 m-3 rounded" style={{backgroundImage:'linear-gradient(to right, #00d2ff, #3a7bd5)',zIndex:1}}>
          <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item">
            <Link to="/voting" class="nav-link pt-2 pb-0 px-0 text-white">
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  class="bi bi-house"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <span class="mt-1 small d-block">Home</span>
                
                </Link>
            </li>
            <li class="nav-item">
              <a 
        type="primary"
        onClick={()=>props.setState({ShowAddModal:!props.ShowAddModal})}
        // href="#"
        // data-toggle="modal"
        // data-target="#addModal" 
        class="nav-link pt-2 pb-0 px-0 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>

                <span class="mt-1 small d-block">Add</span>
              </a>
            </li>
            <li class="nav-item dropup">
              <a
                href="#"
                class="nav-link pt-2 pb-0 px-0 text-center text-white"
                role="button"
                id="dropdownMenuProfile"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  class="bi bi-person"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              
                </svg>
                <span class="mt-1 small d-block">Settings</span>
              </a>
              <div class="dropdown-menu ml-n5" aria-labelledby="dropdownMenuProfile">
              <Link class="dropdown-item" to="/links">Manage Links</Link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" onClick={()=>_postLogout()}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
              
              {/* <Add /> */}
        </>
    )
}