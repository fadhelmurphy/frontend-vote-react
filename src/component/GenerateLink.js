import React, { useState } from "react";
import api from '../api'
import {setHeader} from '../Helpers/Auth'
function GenerateLink() {
  const [inputList, setInputList] = useState([{votename:"",data:[{ kandidat: "" }]}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[0].data[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list[0].data.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([{votename:inputList[0].votename,data:[...inputList[0].data, { kandidat: "" }]}]);
  };

  const handletitle = (e) => {
    const { value } = e.target;
    const list = [...inputList];
    list[0].votename = value;
    setInputList(list);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const list = inputList[0]
    console.log(list);
    api.post('add', list,setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  return (
    <div className="container">
            <div class="modal fade" id="GenModal" tabindex="-1" role="dialog" aria-labelledby="GenModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Share your vote</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form method="POST">
            <div class="modal-body">
                
              <div class="form-group">
    <label for="exampleInputEmail1">Code : </label>
    <input type="text" class="form-control" 
              name="votename"
              onChange={e => handletitle(e)}/>
  </div>
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
            </div>
            <div class="modal-footer">
              <button type="submit" onClick={e=>handleSubmit(e)} class="btn btn-success">Generate</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateLink;