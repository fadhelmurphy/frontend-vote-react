import { DeleteButton } from "../../Button";
import React from "react";
import { Upload, Button, Input, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GetRootContext } from "../../../../Context/Context";

export default function Edit({ setState, ShowEditModal, LinkList }) {
  const RootContext = GetRootContext();
  const { dispatch,_postUpdateOneVote, _postDeleteOneVote } = RootContext;
  const { DetailVote } = RootContext.state.vote;
  const handleUpdate = (event) => {
    event.preventDefault();

    // var { Vote } = props;
    _postUpdateOneVote(DetailVote);
    setState({
      ShowEditModal: !ShowEditModal
    })
  };
  // handle input change
  const handleCandidateChange = (e, index) => {
    const { name, value } = e.target;
    const list = DetailVote;
    list.candidates[index][name] = value;
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
    // setState({ Vote: list });
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = DetailVote;
    list.candidates[index].id !== undefined?
    list.candidates[index].is_delete = 1
    :list.candidates.splice(index, 1);
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
    // setState({ Vote: list });
  };
  //  const handleVoteClick = async (index) => {
  //     // const { Vote } = props;
  //     api.post("sendvote", DetailVote[index], setHeader()).then((res) => {
  //       // console.log(res)
  //       if (res.data === "berhasil") {
  //         alert("Anda berhasil vote");
  //         window.location.reload(false);
  //       } else {
  //         alert("Anda sudah vote!");
  //         window.location.reload(false);
  //       }
  //     });
  //   };
  // handle input change
  const handleTitleChange = (e, index) => {
    const { name, value } = e.target;
    const list = DetailVote;
    list[name] = value;
    
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
    // setState({ Vote: list });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    const list = DetailVote;
    list.candidates.push({
      is_delete: 0,
      name: "",
      image: null,
      id_vote: list.id
    });
    
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
  };
  

  // File Upload

  const onImageChange = ({ file: newFile }, index) => {
    // const { Vote } = props;
    var list = DetailVote;
    if (newFile.status === "removed") {
      list.candidates[index].image = "hapus";
      // setState({ list });
      
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
    } else if (newFile.status === "done") {
      newFile.originFileObj.option = list.candidates[index].name;
      newFile.name =
        list.candidates[index].name +
        "-" +
        list.title +
        "." +
        newFile.originFileObj.name.split(".")[1];
      list.candidates[index].image = newFile;
      // setState({ list });
      
    dispatch({
      type:'GET_DETAIL_VOTE_SUCCESS',
      payload:list
    })
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
        title={DetailVote !== null ? DetailVote.title : "Loading..."}
        visible={ShowEditModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none"
          }
        }}
        onCancel={() =>
          setState({
            ShowEditModal: !ShowEditModal
          })
        }
        // okText="Ya"
        cancelText="Close"
        footer={[
          <Button
            data-dismiss="modal"
            onClick={() =>
              setState({
                ShowEditModal: !ShowEditModal
              })
            }
            size={"large"}
          >
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
            Data={DetailVote != null && DetailVote.id}
            DeleteFunc={(val) => _postDeleteOneVote(val)}
            ShowEditModal={ShowEditModal}
            setState={val=>setState(val)}
            size="large"
          />
        ]}
      >
        {/* <div className="row">
                      <div className="col-12 justify-content-center text-center mt-2">
                        <h1>{DetailVote && DetailVote.title}</h1>
                      </div>
                    </div> */}
        {LinkList.length === 0 ? (
          <>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Nama Vote:
              </label>
              <Input
                type="text"
                name="title"
                class="form-control"
                onChange={(e) => handleTitleChange(e)}
                value={DetailVote !== null ? DetailVote.title : "Loading..."}
                id="recipient-title"
              />
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-12 justify-content-center text-center mt-2">
              <h1>{DetailVote && DetailVote.title}</h1>
            </div>
          </div>
        )}

        <Button type="primary" onClick={() => handleAddClick()}>
          + Add option
        </Button>
        {/* <div className={LinkList.length > 0 && "row mt-3"}> */}
        {DetailVote &&
          DetailVote.candidates.map((element, i) => {
            return (
              <>
                {element.is_delete !== 1 && (
                  <>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">
                        Opsi:
                      </label>
                      <Input
                        type="text"
                        name="name"
                        onChange={(e) => handleCandidateChange(e, i)}
                        value={element.name}
                        id="recipient-title"
                      />
                    </div>
                    <div className="form-group">
                      {" "}
                      {DetailVote.length !== 1 && (
                        <Button onClick={() => handleRemoveClick(i)} danger>
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="form-group">
                      <Upload
                        listType="picture"
                        customRequest={dummyRequest}
                        maxCount={1}
                        onChange={(fileList) => onImageChange(fileList, i)}
                        onPreview={onImagePreview}
                        defaultFileList={
                          element.image !== null && element.image !== "hapus"
                            ? [
                                {
                                  uid: -1,
                                  name: element.image,
                                  status: "done",
                                  url:
                                    process.env.REACT_APP_BACKEND +
                                    "storage/" +
                                    element.image,
                                  thumbUrl:
                                    process.env.REACT_APP_BACKEND +
                                    "storage/" +
                                    element.image
                                }
                              ]
                            : ""
                        }
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
                        <Button icon={<UploadOutlined />}> Upload</Button>
                      </Upload>
                    </div>
                  </>
                )}
              </>
            );
          })}
        {/* </div> */}
      </Modal>
    </>
  );
}
