import React,{Component} from 'react'
import { URL_API } from "../../../utils/api";
import axios from 'axios'
// import { Sugar } from 'react-preloaders';

export default class ListAll extends Component{
        /**
   * @var {state} state object reactjs 
   * default have property of data in value array 
   */
  state = {
    data: [] 
  }

  handleUpdate = (event,index) => {
    event.preventDefault();

    var { vote } = this.state.data;
    console.log(vote[index]);
    axios.post(URL_API + "sendvote", vote[index]).then((res) => {
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
    const urlFetch = await fetch(URL_API+"get/"+id) 
    
    console.log("execute: if urlFetch.status === 200 && 'json' in urlFetch")
    console.log("Jika True, maka setState data dengan nilai await urlFetch.json()")

    /**
     * jika HTTP.satus bernilai 200 dan 'json' ada pada object
     * urlFetch maka setState untuk data menggunakan setStateAsync 
     * dengan nilai await urlFetch.json() 
     */
    if ( urlFetch.status === 200 && 'json' in urlFetch ){
        console.log("Dan hasilnya adalah true maka setState dilakukan")
        this.setStateAsync({
            data: await urlFetch.json()
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
        const {data} = this.state
        console.log(data)
    return(
        <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}
        <div className="container">
            <div class="row">
              <div className="col-12 justify-content-center text-center mt-5">
              <h1>
                {data.vote && data.vote[0].votename}
              </h1>
              </div>
                {
                data.vote && data.vote.map((el,i)=>{
                    return(
                        <div class="col-sm-6 mt-5">
                        <div class="card">
                          <div class="card-body">
                    <h5 class="card-title">{el.kandidat}</h5>
                            <a href="#" onClick={e=>this.handleUpdate(e,i)} class="btn btn-primary">Vote</a>
                          </div>
                        </div>
                      </div>
                    )
                })
            }

</div>
        </div>
        </>
    )
}
}