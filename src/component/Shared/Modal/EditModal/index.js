

import { DeleteButton } from "../../Button"; 
import React from 'react'
import { Upload, Button, Input, Modal } from "antd";
import { UploadOutlined} from "@ant-design/icons";
import { UpdateOneVote,DeleteOneVote } from "../../../../Helpers/UserFunctions";
import api from "../../../../api";
import { setHeader } from "../../../../Helpers/Auth";
 
export default function Edit(props){
    

  const handleUpdate = (event) => {
    event.preventDefault();

    var { Vote } = props;
    UpdateOneVote(Vote).then((res) => {
      const { alert, reload } = res;
      props.setState({ Alert: alert });
      if (reload) window.location.reload();
    });
  };
  // handle input change
  const handleCandidateChange = (e, index) => {
    const { name, value } = e.target;
    const list = props.Vote;
    props.Vote[index][name] = value;
    props.setState({ Vote: list });
  };
  // handle click event of the Remove button
 const handleRemoveClick = (index) => {
    const list = props.Vote;
    list[index]["action"] = "hapus";
    props.setState({ Vote: list });
  };
 const handleVoteClick = async (index) => {
    const { Vote } = props;
    api.post("sendvote", Vote[index], setHeader()).then((res) => {
      // console.log(res)
      if (res.data === "berhasil") {
        alert("Anda berhasil vote");
        window.location.reload(false);
      } else {
        alert("Anda sudah vote!");
        window.location.reload(false);
      }
    });
  };
  // handle input change
  const handleTitleChange = (e, index) => {
    const { name, value } = e.target;
    const list = props.Vote;
    list.map((el, i) => {
      props.Vote[i][name] = value;
    });
    props.setState({ Vote: list });
  };

  // handle click event of the Add button
 const handleAddClick = () => {
    const list = props.Vote;
    list.push({
      action: "tambah",
      id: null,
      votename: list[0].votename,
      kandidat: "",
      kandidatImage: "kosong",
      id_vote: list[0].id_vote,
    });
    props.setState({ Vote: list });
  };

      // File Upload

 const onImageChange = ({ file: newFile }, index) => {
    const { Vote } = props;
    var list = Vote;
    if (newFile.status === "removed") {
      list[index]["kandidatImage"] = "";
      props.setState({ list });
    } else if (newFile.status === "done") {
      newFile.name = list[index]["kandidat"] + "-" + list[index].votename+ "." +newFile.originFileObj.name.split('.')[1];
      list[index]["kandidatImage"] = newFile;
      props.setState({ list });
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
return(
    <>
    
    <Modal
    title= {props.Vote !== null ? props.Vote[0].votename : "kosong"}
      visible={props.showEditModal}
      
      style={{ top: 10 }}
      width={1000}
      zIndex={2}
okButtonProps={{
        style: {
          display: "none",
        },
      }}
      onCancel={()=>props.setState({showEditModal:false})}
      // okText="Ya"
      cancelText="Close"
      footer={[
                    <Button data-dismiss="modal" 
                    onClick={()=>props.setState({showEditModal:false})}
                    size={"large"}>
                      Close
                    </Button>,
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={(e) => handleUpdate(e)}
                      className="bg-success text-white border-0"
                    >
                      Update
                    </Button>,
                    <DeleteButton
                      Data={props.Vote != null && props.Vote[0].id_vote}
                      DeleteFunc={(val) =>
                        DeleteOneVote(val).then((res) => {
                          const { alert, reload } = res;
                          props.setState({ Alert: alert });
                          if (reload) window.location.reload();
                        })
                      }
                      size="large"
                    />]}
    >
                  {props.LinkList.length === 0 ? (
                    <>
                      <div
                        className="Features"
                        dangerouslySetInnerHTML={{ __html: props.Alert }}
                      />
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Nama Vote:
                        </label>
                        <Input
                          type="text"
                          name="votename"
                          class="form-control"
                          onChange={(e) => handleTitleChange(e)}
                          value={props.Vote !== null ? props.Vote[0].votename : "kosong"}
                          id="recipient-title"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-12 justify-content-center text-center mt-2">
                        <h1>{props.Vote && props.Vote[0].votename}</h1>
                      </div>
                    </div>
                  )}

                  {props.LinkList.length === 0 && (
                    <Button
                      type="primary"
                      onClick={() => handleAddClick()}
                    >
                      + Add option
                    </Button>
                  )}
                  <div className={props.LinkList.length > 0 && "row mt-3"}>
                    {props.Vote &&
                      props.Vote.map((element, i) => {
                        return (
                          <>
                            {props.LinkList.length === 0 ? (
                              <>
                                {element.action !== "hapus" && (
                                  <>
                                    <div class="form-group">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Opsi:
                                      </label>
                                      <Input
                                        type="text"
                                        name="kandidat"
                                        onChange={(e) =>
                                          handleCandidateChange(e, i)
                                        }
                                        value={element.kandidat}
                                        id="recipient-title"
                                      />
                                    </div>
                                    <div className="form-group">
                                      {" "}
                                      {props.Vote.length !== 1 && (
                                        <Button
                                          onClick={() =>
                                            handleRemoveClick(i)
                                          }
                                          danger
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <Upload
                                        listType="picture"
                                        customRequest={dummyRequest}
                                        maxCount={1}
                                        onChange={(fileList) =>
                                            onImageChange(fileList, i)
                                        }
                                        onPreview={onImagePreview}
                                        defaultFileList={
                                          element.kandidatImage !== "kosong"
                                            ? [
                                                {
                                                  uid: -1,
                                                  name: element.kandidatImage,
                                                  status: "done",
                                                  url:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                  thumbUrl:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                },
                                              ]
                                            : ""
                                        }
                                        beforeUpload={(file) => {
                                          const isJPG =
                                            file.type === "image/jpeg" ||
                                            file.type === "image/png";
                                          if (!isJPG) {
                                            alert(
                                              "You can only upload JPG or PNG file!"
                                            );
                                            return false;
                                          } else {
                                            return true;
                                          }
                                        }}
                                        // onRemove={onImageRemove}
                                      >
                                        <Button icon={<UploadOutlined />}>
                                          {" "}
                                          Upload
                                        </Button>
                                      </Upload>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div class="col col-md-6 mt-2">
                                <div class="card border-0 shadow rounded-lg mb-4">
                                  <img
                                    class="card-img-top"
                                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22362%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20362%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_175c6c72523%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_175c6c72523%22%3E%3Crect%20width%3D%22362%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22134.953125%22%20y%3D%22108.1%22%3E362x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                    alt="Card image cap"
                                  />
                                  <div class="card-body">
                                    <h5 class="card-title text-center">
                                      {element.kandidat}
                                    </h5>
                                    <div className="text-center">
                                      <a
                                        // href="#"
                                        onClick={(e) => handleVoteClick(i)}
                                        class="btn btn-primary w-100 active"
                                        style={{ cursor: "pointer" }}
                                      >
                                        Vote
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                  </div>
                
                  

    </Modal>
    <div
          class="modal fade"
          id="my-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="my-modal"
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
                 {props.Vote !== null ? props.Vote[0].votename : "kosong"}
                </h5>
              </div>
              <form method="POST">
                <div class="modal-body px-4">
                  {props.LinkList.length === 0 ? (
                    <>
                      <div
                        className="Features"
                        dangerouslySetInnerHTML={{ __html: props.Alert }}
                      />
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Nama Vote:
                        </label>
                        <Input
                          type="text"
                          name="votename"
                          class="form-control"
                          onChange={(e) => handleTitleChange(e)}
                          value={props.Vote !== null ? props.Vote[0].votename : "kosong"}
                          id="recipient-title"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-12 justify-content-center text-center mt-2">
                        <h1>{props.Vote && props.Vote[0].votename}</h1>
                      </div>
                    </div>
                  )}

                  {props.LinkList.length === 0 && (
                    <Button
                      type="primary"
                      onClick={() => handleAddClick()}
                    >
                      + Add option
                    </Button>
                  )}
                  <div className={props.LinkList.length > 0 && "row mt-3"}>
                    {props.Vote &&
                      props.Vote.map((element, i) => {
                        return (
                          <>
                            {props.LinkList.length === 0 ? (
                              <>
                                {element.action !== "hapus" && (
                                  <>
                                    <div class="form-group">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Opsi:
                                      </label>
                                      <Input
                                        type="text"
                                        name="kandidat"
                                        onChange={(e) =>
                                          handleCandidateChange(e, i)
                                        }
                                        value={element.kandidat}
                                        id="recipient-title"
                                      />
                                    </div>
                                    <div className="form-group">
                                      {" "}
                                      {props.Vote.length !== 1 && (
                                        <Button
                                          onClick={() =>
                                            handleRemoveClick(i)
                                          }
                                          danger
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <Upload
                                        listType="picture"
                                        customRequest={dummyRequest}
                                        maxCount={1}
                                        onChange={(fileList) =>
                                            onImageChange(fileList, i)
                                        }
                                        onPreview={onImagePreview}
                                        defaultFileList={
                                          element.kandidatImage !== "kosong"
                                            ? [
                                                {
                                                  uid: -1,
                                                  name: element.kandidatImage,
                                                  status: "done",
                                                  url:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                  thumbUrl:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                },
                                              ]
                                            : ""
                                        }
                                        beforeUpload={(file) => {
                                          const isJPG =
                                            file.type === "image/jpeg" ||
                                            file.type === "image/png";
                                          if (!isJPG) {
                                            alert(
                                              "You can only upload JPG or PNG file!"
                                            );
                                            return false;
                                          } else {
                                            return true;
                                          }
                                        }}
                                        // onRemove={onImageRemove}
                                      >
                                        <Button icon={<UploadOutlined />}>
                                          {" "}
                                          Upload
                                        </Button>
                                      </Upload>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div class="col col-md-6 mt-2">
                                <div class="card border-0 shadow rounded-lg mb-4">
                                  <img
                                    class="card-img-top"
                                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22362%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20362%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_175c6c72523%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_175c6c72523%22%3E%3Crect%20width%3D%22362%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22134.953125%22%20y%3D%22108.1%22%3E362x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                    alt="Card image cap"
                                  />
                                  <div class="card-body">
                                    <h5 class="card-title text-center">
                                      {element.kandidat}
                                    </h5>
                                    <div className="text-center">
                                      <a
                                        // href="#"
                                        onClick={(e) => handleVoteClick(i)}
                                        class="btn btn-primary w-100 active"
                                        style={{ cursor: "pointer" }}
                                      >
                                        Vote
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                  </div>
                
                </div>
                
                {props.LinkList.length === 0 && (
                  <div class="modal-footer">
                    <Button data-dismiss="modal" size={"large"}>
                      Close
                    </Button>
                    
                    {/* <div
                        onClick={() =>Vote != null && 
                          this._getHasilVote(
                            Vote[0].name,
                            VoteResult.jumlahkandidat,
                            VoteResult.jumlahVoters,
                            Vote[0].id_vote
                          )
                        }
                      >
                        <HasilButton
                          {...this.state}
                          handleDeleteVoter={(value) =>
                            this.handleDeleteVoter.bind(this, value)
                          }
                        />
                      </div> */}
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={(e) => handleUpdate(e)}
                      className="bg-success text-white border-0"
                    >
                      Update
                    </Button>

                    <DeleteButton
                      Data={props.Vote != null && props.Vote[0].id_vote}
                      DeleteFunc={(val) =>
                        props.DeleteOneVote(val).then((res) => {
                          const { alert, reload } = res;
                          props.setState({ Alert: alert });
                          if (reload) window.location.reload();
                        })
                      }
                      size="large"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      
    </>
)
}