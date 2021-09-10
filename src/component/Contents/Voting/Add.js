import React, { useState } from "react";
import api from "../../../api";
import { setHeader } from "../../../Helpers/Auth";
import { TambahVote } from "../../../Helpers/UserFunctions";
import { Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function Add(props) {
  const [inputList, setInputList] = useState({
    votename: "",
    data: [{ kandidat: "", kandidatImage: "" }],
  });
  const [ErrorList, setErrorList] = useState({ votename: "", data: {} });
  const [Alert, setAlert] = useState("");

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    var list = inputList.data;
    list[index][name] = value;
    setInputList({ votename: inputList.votename, data: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = inputList.data;
    list.splice(index, 1);
    setInputList({ votename: inputList.votename, data: list });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList({
      votename: inputList.votename,
      data: [...inputList.data, { kandidat: "", kandidatImage: "" }],
    });
  };

  const handletitle = (e) => {
    const { value } = e.target;
    setInputList({ votename: value, data: inputList.data });
  };
  const handleSubmit = (event) => {
    var opsiMsg = false;
    var theData = ErrorList;
    event.preventDefault();
    const list = inputList;
    console.log(list);
    if (list.votename.length === 0) {
      // props._setError("votename", "mohon isi judul vote terlebih dahulu");
      theData.votename = "mohon isi judul vote terlebih dahulu!";
      alert("mohon isi judul vote terlebih dahulu!");
      return setErrorList({ votename: theData.votename, data: theData.data });
    } else {
      theData.votename = "";
      setErrorList({ votename: theData.votename, data: theData.data });
    }

    list.data.forEach((element, i) => {
      if (element.kandidat.length === 0) {
        theData.data[i] = "mohon isi opsi/kandidat vote terlebih dahulu!";
        setErrorList({ votename: theData.votename, data: theData.data });
        opsiMsg = true;
      }
    });
    if (opsiMsg) return alert("mohon isi opsi/kandidat terlebih dahulu!");
    TambahVote(list).then((res) => {
      const { alert, reload } = res;
      setAlert(alert);
      if (reload) window.location.reload();
    });
  };

  const onImageChange = ({ file: newFile }, index) => {
    var list = inputList.data;
    if (newFile.status === "removed") {
      list[index]["kandidatImage"] = "";
      setInputList({ votename: inputList.votename, data: list });
    } else if (newFile.status === "done") {
      newFile.name = list[index]["kandidat"] + "-" + inputList.votename
      list[index]["kandidatImage"] = newFile;
      setInputList({ votename: inputList.votename, data: list });
    }
    console.log(list);
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
                <div
                  className="Features"
                  dangerouslySetInnerHTML={{ __html: Alert }}
                />
                <div class="form-group">
                  <label for="exampleInputEmail1">Nama Vote : </label>
                  <Input
                    type="text"
                    class="form-control"
                    name="votename"
                    placeholder="judul vote"
                    value={inputList.votename}
                    onChange={(e) => handletitle(e)}
                    required
                  />
                  <small className="text-danger">{ErrorList.votename}</small>
                </div>
                {inputList.data.map((x, i) => {
                  return (
                    <div className="box">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Opsi {i + 1} : </label>
                        <Input
                          type="text"
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
                          {inputList.data[i].kandidatImage.length === 0 && (
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
  );
}

export default Add;
