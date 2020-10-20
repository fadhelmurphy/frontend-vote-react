import React, { useState } from "react";
import api from "../api";
import { setHeader } from "../Helpers/Auth";
import { type } from "jquery";
function GenerateLink(props) {
  const [Code,setCode] = useState()
  const handleShare = () => {
    props._setCode(null)
    var result = props.state.ShareList.map(function (el) {
      var o = Object.assign({}, el);
      o.isPublic = props.state.isPublic;
      return o;
    });
    if(props.state.isPublic)
    api.post('generate/public', {result},setHeader())
    .then((res) => {
      props._setCode(res.data)
    });
    else
    api.post('generate/private', {result},setHeader())
    .then((res) => {
      props._setCode(res.data)
    });
  };

  return (
    <div className="container">
      <div
        class="modal fade"
        id="GenModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="GenModal"
        aria-hidden="true"
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
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Code : </label>
                  <input type="text" class="form-control" name="code" value={props.state.code?props.state.code:null} />
                </div>
                <div class="form-group"
                onClick={() => props._setPublic()}>
                  <input
                    className="mt-3 mr-3"
                    onClick={() => props._setPublic()}
                    checked={props.state.isPublic}
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
    </div>
  );
}

export default GenerateLink;
