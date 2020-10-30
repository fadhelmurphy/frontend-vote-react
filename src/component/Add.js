import React, { useState } from "react";
import api from "../api";
import { setHeader } from "../Helpers/Auth";
function Add(props) {
  const [inputList, setInputList] = useState(
    { votename: "", data: [{ kandidat: "" }] });
  const [ErrorList, setErrorList] = useState({votename:"",data:{}})

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    var list = inputList.data;
    list[index][name] = value;
    setInputList({votename:inputList.votename,data:list});
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = inputList.data;
    list.splice(index, 1);
    setInputList({votename:inputList.votename,data:list});
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList(
      {
        votename:inputList.votename,
        data: [...inputList.data, { kandidat: "" }],
      }
    );
  };

  const handletitle = (e) => {
    const { value } = e.target;
    setInputList({votename:value,data:inputList.data});
  };
  const handleSubmit = (event) => {
    var opsiMsg = false
    var theData = ErrorList
    event.preventDefault();
    const list = inputList;
    console.log(list);
    if (list.votename.length===0) {
      // props._setError("votename", "mohon isi judul vote terlebih dahulu");
      theData.votename = 'mohon isi judul vote terlebih dahulu!'
      alert("mohon isi judul vote terlebih dahulu!");
      return setErrorList({votename:theData.votename,data:theData.data})
    }else{
      theData.votename = ''
      setErrorList({votename:theData.votename,data:theData.data})
    }
    
    list.data.forEach((element,i) => {
      if (element.kandidat.length===0) {
        theData.data[i] = "mohon isi opsi/kandidat vote terlebih dahulu!"
        setErrorList({votename:theData.votename,data:theData.data})
        opsiMsg = true
      }
      // else{
      //   theData.data[i] = ""
      //   setErrorList({votename:theData.votename,data:theData.data})
      //   opsiMsg = false
      // }
    });
    if(opsiMsg)
    return alert("mohon isi opsi/kandidat terlebih dahulu!");
    api.post('add', list,setHeader()).then((res) => {
      alert('berhasil ditambahkan!')
      window.location.reload(false);
    });
  };

  return (
    <div className="container">
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addModal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tambah vote
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
            <form method="POST">
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nama Vote : </label>
                  <input
                    type="text"
                    class="form-control"
                    name="votename"
                    placeholder="judul vote"
                    value={inputList.votename}
                    onChange={(e) => handletitle(e)}
                    required
                  />
                  <small className="text-danger">
                      {ErrorList.votename}
                    </small>
                </div>
                {inputList.data.map((x, i) => {
                  return (
                    <div className="box">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Opsi {i + 1} : </label>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          name="kandidat"
                          placeholder="Masukkan kandidat"
                          value={x.kandidat}
                          onChange={(e) => handleInputChange(e, i)}
                          required
                        />
                        <small className="text-danger">
                            {ErrorList.data[i]}
                          </small>
                      </div>
                      <div className="form-group">
                        {inputList.data.length - 1 === i && (
                          <button
                            type="button"
                            class="btn btn-primary mr-3"
                            onClick={() => handleAddClick(i)}
                          >
                            Add
                          </button>
                        )}
                        {inputList.data.length !== 1 && (
                          <button
                            type="button"
                            class="btn btn-danger mr-3"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  class="btn btn-success"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
