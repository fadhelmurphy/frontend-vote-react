
import React, { Component } from 'react'
import { Sugar } from 'react-preloaders';
import { ListAll } from '../../component/Contents/Voting';
import { Sidebar,Header } from '../../component/Shared';
import { logout } from '../../Helpers/UserFunctions';
import Aos from 'aos';

class Voting extends Component{
    componentDidMount() {
        Aos.init({
            once: true,
            easing: 'slide',
        });
    }
    render(){
        return(
            <>
            <Sugar background="#1e2125" color="#0f4c75" time={1000} />
            <div className="container-fluid my-5">
            <div class="row">
              
        <div class="col-md-3 mb-5">
  
        <Sidebar lastMenu={logout}/>
        </div>
              <div class="col-md-9">
              <div class="card mb-5">
                <div class="card-body px-5">
                  <Header/>
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
