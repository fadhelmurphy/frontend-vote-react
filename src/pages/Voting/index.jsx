
import React, { Component } from 'react'

import { ListAll } from '../../component/Contents/Voting';
import { Sidebar,Header } from '../../component/Shared';
import { logout } from '../../Helpers/UserFunctions';

class Voting extends Component{
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
                  <Header customKata="Selamat datang di aplikasi evoting silahkan masukan code untuk memilih vote private/public"/>
                </div>
              </div>
                  <ListAll/>
                </div>
                </div>
                </div>
                </>
        )
    }
}
export default Voting
