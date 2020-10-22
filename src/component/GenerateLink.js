import React, { useState } from "react";
import api from "../api";
import { setHeader } from "../Helpers/Auth";
import { type } from "jquery";
import { useEffect } from "react";
function GenerateLink(props) {
  const [Code,setCode] = useState('')
  const [Public,setPublic] = useState(false)
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
    
    <button class="btn btn-success mr-3"
    data-toggle="modal"
    data-target="#GenModal" 
    onClick={async()=>{await setCode('');await setPublic(false)}}
    disabled={props.ShareList.length===0&& true}>
      Share
    </button>
    <button
    onClick={(e) => this.handleBulkDelete()}
    type="button"
    class="btn btn-danger"
    disabled={props.ShareList.length===0&& true}
  >
    Delete
  </button>
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
                Share your vote
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
              <div class="modal-body text-left">
                <div class="form-group">
                  <label for="exampleInputEmail1">Code : </label>
                  <input type="text" class="form-control" name="code" value={(Code!=='')?Code:''} />
                </div>
                <div class="form-group"
                onClick={() => setPublic(!Public)}>
                  <input
                    className="mt-3 mr-3"
                    onClick={() => setPublic(!Public)}
                    checked={Public}
                    type="checkbox"
                  />
                  <label>Let everyone vote (public vote)</label>
                </div>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
              <div class="modal-footer">
                <button
                  onClick={(e) => handleShare()}
                  class="btn btn-success"
                >
                  Generate
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateLink;
