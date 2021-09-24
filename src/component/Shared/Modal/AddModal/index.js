import React, { useState } from "react";
import api from "../../../../api";
import { 
  // TambahVote,
   _getList } from "../../../../Helpers/UserFunctions";
import { Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Modal } from 'antd';
import "antd/dist/antd.css";
import { GetRootContext } from "../../../../Context/Context";

function Add({ShowAddModal,setState}) {

const RootContext = GetRootContext()
const {_postTambahVote} = RootContext

  const [inputList, setInputList] = useState({
    title: "",
    data: [{ name: "", image: "" }],
  });
  const [ErrorList, setErrorList] = useState({});
  const [Alert, setAlert] = useState("");

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    var list = inputList.data;
    list[index][name] = value;
    setInputList({ title: inputList.title, data: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = inputList.data;
    list.splice(index, 1);
    setInputList({ title: inputList.title, data: list });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList({
      title: inputList.title,
      data: [...inputList.data, { name: "", image: "" }],
    });
  };

  const handletitle = (e) => {
    const { value } = e.target;
    setInputList({ title: value, data: inputList.data });
  };
  const handleSubmit = (event) => {
    
    var opsiMsg = false;
    var theData = ErrorList;
    event.preventDefault();
    const list = inputList;
    console.log(list);
    if (list.title.length === 0) {
      // props._setError("title", "mohon isi judul vote terlebih dahulu");
      theData.title = "mohon isi judul vote terlebih dahulu!";
      alert("mohon isi judul vote terlebih dahulu!");
      setErrorList((prevState)=>({...prevState, title: theData.title }));
    }else{
      
      setErrorList((prevState)=>({...prevState, title: null}));
    }
    theData.data = []
    list.data.forEach((element, i) => {
      if (element.name.length === 0) {
        theData.data[i] = "mohon isi opsi/kandidat vote terlebih dahulu!";
        setErrorList((prevState)=>({...prevState,data: theData.data }));
        opsiMsg = true;
      }else{
        theData.data[i] = null
        setErrorList((prevState)=>({...prevState,data: theData.data }));
      }
    });
    if (opsiMsg) return alert("mohon isi opsi/kandidat terlebih dahulu!")
    _postTambahVote(list).then(async (res) => {
      const { reload } = res;
      if(reload){
        
        setState({ShowAddModal:!ShowAddModal
        })
        setInputList({
          title: "",
          data: [{ name: "", image: "" }]})
      }
    });
  };

  const onImageChange = ({ file: newFile }, index) => {
    console.log(newFile.originFileObj.name.split('.')[1]);
    var list = inputList.data;
    if (newFile.status === "removed") {
      list[index]["image"] = "";
      setInputList({ title: inputList.title, data: list });
    } else if (newFile.status === "done") {
      newFile.name = list[index]["name"] + "-" + inputList.title + "." +newFile.originFileObj.name.split('.')[1]
      list[index]["image"] = newFile;
      setInputList({ title: inputList.title, data: list });
    }
  };

  const onImagePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <>
    <Modal
    title="Add Vote"
      visible={ShowAddModal}
      
      style={{ top: 10 }}
      width={1000}
      zIndex={2}
okButtonProps={{
        style: {
          display: "none",
        },
      }}
      onCancel={()=>setState({
        ShowAddModal: !ShowAddModal
      })}
      // okText="Ya"
      cancelText="Close"
      footer={[
                <Button
                  className="bg-success text-white border-0"
                  size={"large"}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>]}
    >
        {/* <div
                  className="Features"
                  dangerouslySetInnerHTML={{ __html: Alert }}
                /> */}
                <div class="form-group">
                  <label for="exampleInputEmail1">Nama Vote : </label>
                  <Input
                    type="text"
                    class="form-control"
                    name="title"
                    placeholder="judul vote"
                    value={inputList.title}
                    onChange={(e) => handletitle(e)}
                    required
                  />
                  <small className="text-danger">{ErrorList.title}</small>
                </div>
                {inputList.data.map((x, i) => {
                  return (
                    <div className="box">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Opsi {i + 1} : </label>
                        <Input
                          type="text"
                          aria-describedby="emailHelp"
                          name="name"
                          placeholder="Masukkan kandidat"
                          value={x.name}
                          onChange={(e) => handleInputChange(e, i)}
                          required
                        />
                        <small className="text-danger">
                          {ErrorList.data && ErrorList.data[i]}
                        </small>
                      </div>
                      <div className="form-group">
                        {/* <ImgCrop rotate> */}
                        <Upload
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture"
                          // fileList={fileList}
                          customRequest={dummyRequest}
                          maxCount={1}
                          onChange={(fileList) => onImageChange(fileList, i)}
                          onPreview={onImagePreview}
                          beforeUpload={(file) => {
                            const isJPG =
                              file.type === "image/jpeg" ||
                              file.type === "image/png";
                            if (!isJPG) {
                              alert("You can only upload JPG or PNG file!");
                              return false;
                            } else {
                              return true;
                            }
                          }}
                          // onRemove={onImageRemove}
                        >
                          {inputList.data[i].image.length === 0 && (
                            <Button icon={<UploadOutlined />}> Upload</Button>
                          )}
                        </Upload>
                        {/* </ImgCrop> */}
                      </div>
                      <div className="form-group">
                        {inputList.data.length - 1 === i && (
                          <>
                            <Button
                              type="primary"
                              onClick={() => handleAddClick(i)}
                            >
                              + Add Option
                            </Button>{" "}
                          </>
                        )}
                        {inputList.data.length !== 1 && (
                          <>
                            {" "}
                            <Button danger onClick={() => handleRemoveClick(i)}>
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
      </Modal>
    <div className="container">
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
              <div class="modal-header justify-content-start">
                <button
                className="mr-3"
                  type="button"class="close m-0 p-2 mr-2" 
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title align-self-center" id="exampleModalLabel">
                Tambah vote
                </h5>
              </div>
            <form method="POST">
              <div class="modal-body">
              
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
              <div class="modal-footer">
                <Button
                  className="bg-success text-white border-0"
                  size={"large"}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Add;
