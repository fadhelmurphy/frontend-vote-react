import React, { useState } from "react";
import api from "../../../api";
import { setHeader } from "../../../Helpers/Auth";
import { Button  } from 'antd';
import check from './img/check.webp'
function GenerateLink(props) {
  const [Code,setCode] = useState('')
  const [Public,setPublic] = useState(false)
  const [Alert,setAlert] = useState('');
  const handleShare = () => {
    var result = props.ShareList.map(function (el) {
      var o = Object.assign({}, el);
      o.isPublic = Public;
      return o;
    });
    if(Public)
    api.post('generate/public', {result},setHeader())
    .then((res) => {
      setCode(res.data)
    });
    else
    api.post('generate/private', {result},setHeader())
    .then((res) => {
      setCode(res.data)
    });
  };


  return (
    <>
    
    <Button
    className="mr-3 text-success shadow-sm"
    data-toggle="modal"
    data-target="#GenModal" 
    onClick={async()=>{await setCode('');await setPublic(false)}}
    disabled={props.ShareList.length===0&& true}>
     <span>
     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 18 18">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
</svg> 
    {" "} Share</span>
    </Button>
      <div
        class="modal fade"
        id="GenModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="GenModal"
        aria-hidden="true"
        onEntered
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {Code!==''?"Your votes are ready to see!":"Do you want to share your vote?"}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
                  {Code!==''&&<>
              <div class="modal-body text-left">
                <img className="img-thumbnail mx-auto d-block border-0" src={check}/>
                    <p>Click link down below to see your votes.</p>
                  <a target="_blank" href={process.env.REACT_APP_BASEURL + "voting/" + Code}>{process.env.REACT_APP_BASEURL + "voting/" + Code}</a>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
                  </>}
              <div class="modal-footer">
                <Button
                href={process.env.REACT_APP_BASEURL + "links/"}
                  class="btn btn-secondary"
                >
                  Manage Link
                </Button>
                <Button
                  onClick={(e) => handleShare()}
                  class="btn btn-success"
    type="primary"
                >
                  Share
                </Button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateLink;
