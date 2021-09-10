import React, { useState } from "react";
import api from "../../../api";
import { setHeader } from "../../../Helpers/Auth";
import { bulkDelete } from "../../../Helpers/UserFunctions";
import { Button  } from 'antd';
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

  const handleBulkDelete = async () => {
    const sharelist = await props.AllData.filter((el) => el.isChecked && el);
    console.log(sharelist);
    bulkDelete(sharelist)
    .then(res => {
      const {reload} = res
      if(reload)
      window.location.reload(true);
    })
  };

  return (
    <>
    
    <Button
    className="mr-3"
    data-toggle="modal"
    data-target="#GenModal" 
    onClick={async()=>{await setCode('');await setPublic(false)}}
    disabled={props.ShareList.length===0&& true}>
      Share
    </Button>
    {" "}
    <Button
    className="mr-3"
    type="primary"
    onClick={() => handleBulkDelete()}
    disabled={props.ShareList.length===0&& true}
    danger>
      Delete
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
                  <label>Let everyone vote without login (public vote)</label>
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
