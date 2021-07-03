

import React, { Component } from 'react'

import { ListLink } from '../../component/Contents/LinkManager';
import { Sidebar,Header } from '../../component/Shared';
import { logout } from '../../Helpers/UserFunctions';

class LinkManager extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <div className="container-fluid my-5">
            <div class="row">
        <div class="col-md-3 mb-5">
  
        <Sidebar lastMenu={logout}/>
        </div>
              <div class="col-md-9">
              <div class="card mb-5">
                <div class="card-body px-5">
                  <Header customKata="Link vote yang anda share"/>
                </div>
              </div>
                  <ListLink {...this.props}/>
                </div>
                </div>
                </div>
                </>
        )
    }
}
export default LinkManager
