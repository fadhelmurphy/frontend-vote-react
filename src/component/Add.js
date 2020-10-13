import React, { useState } from "react";
import api from '../api'
import {setHeader} from '../Helpers/Auth'
function Add() {
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
            <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tambah vote</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form method="POST">
            <div class="modal-body">
                
              <div class="form-group">
    <label for="exampleInputEmail1">Nama Vote : </label>
    <input type="text" class="form-control" 
              name="votename"
			  placeholder="judul vote"
              value={inputList[0].votename}
              onChange={e => handletitle(e)}/>
  </div>
      {inputList[0].data.map((x, i) => {
        return (
          <div className="box">
            
            <div class="form-group">
        <label for="exampleInputEmail1">Opsi {i+1} : </label>
    <input type="text" class="form-control" aria-describedby="emailHelp" 
              name="kandidat"
			  placeholder="Masukkan kandidat"
              value={x.kandidat}
              onChange={e => handleInputChange(e, i)}
            />
  </div>
            <div className="form-group">
              {inputList[0].data.length - 1 === i && <button type="button" class="btn btn-primary mr-3" onClick={()=>handleAddClick(i)}>Add</button>}
              {inputList[0].data.length !== 1 && <button
                type="button" class="btn btn-danger mr-3"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
            </div>
          </div>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
            </div>
            <div class="modal-footer">
              <button type="submit" onClick={e=>handleSubmit(e)} class="btn btn-success">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;