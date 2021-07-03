import React,{Component} from 'react'
import api from '../../../api'
import {setHeader} from '../../../Helpers/Auth'
import { showPub } from '../../../Helpers/UserFunctions'
import List from './List'
// import { Sugar } from 'react-preloaders';

export default class VoteId extends Component{
        /**
   * @var {state} state object reactjs 
   * default have property of data in value array 
   */
constructor(props){
  super(props)
  this.state = {
    LinkList: null
  }
}

  handleUpdate = (event,index) => {
    event.preventDefault();

    var { vote } = this.state.data;
    console.log(vote[index]);
    api.post("sendvote", vote[index],setHeader()).then((res) => {
      window.location.reload(false);
    });
  };
  
  /**
   * async componentDidMount() 
   * merubah function componentDidMount menjadi asynchronous
   * untuk mengenali dan dapat menggunakan fungsi await
   *
   * @method {componentDidMount} Async Function 
   * change native componentDidMount function to 
   * asynchronous function 
   *
   * @returns void|null
   */
  async componentDidMount(){

    const {id} = this.props.match.params
    console.log("ComponentDidmount Sedang Berjalan")
    console.log("Await Fetch")

    /**
     * Definisi Konstanta {urlFetch} diberi nilai
     * Fetch API dan menggunakan Await untuk Menunggu
     * sampai Fetch API resolve atau mendapatkan hasil
     */
    const urlFetch = await showPub(id)
    
    console.log("execute: if urlFetch.status === 200 && 'json' in urlFetch")
    console.log("Jika True, maka setState data dengan nilai await urlFetch.json()")

    /**
     * jika HTTP.satus bernilai 200 dan 'json' ada pada object
     * urlFetch maka setState untuk data menggunakan setStateAsync 
     * dengan nilai await urlFetch.json() 
     */
    console.log(urlFetch)
    if ( urlFetch.status === 200 ){
        console.log("Dan hasilnya adalah true maka setState dilakukan")
        this.setStateAsync({
              LinkList: await urlFetch.data
        }) 
    }
  }

  /**
   *
   * React setState for Async Function
   *
   * @param {state} Object state will set in setState  
   * @returns {Promise} Object Promise will use in Async Function  
   */
  setStateAsync(state){
    return new Promise( resolve => {
        this.setState(state, resolve) 
    }) 
    }
    render(){
        const {LinkList} = this.state
        console.log(LinkList)
        console.log(this.props)
    return(
        <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}
          <List {...this.state}/>
        </>
    )
}
}