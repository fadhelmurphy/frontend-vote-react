import React from "react";
// import {
//   DeleteOneLink,
//   UpdateOneLink
// } from "../../../../Helpers/UserFunctions";
import { Button, Input, Modal, Select } from "antd";
import { DeleteButton } from "../../Button";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { GetRootContext } from "../../../../Context/Context";
export default function LinkModal({
  ShowEditModal,
  LinkList,
  VoteList,
  setState,
  Alert
}) {
  const { DetailLink } = GetRootContext().state.link;
  const { AllVote } = GetRootContext().state.vote;
  const { dispatch, _postUpdateLink, _getListLink, _postDeleteLink } =
    GetRootContext();

  const { Option } = Select;

  // handle input change
  const handleTitleChange = (e, index) => {
    var { name, value } = e.target;
    value = value.replace(/[^A-Za-z]/gi, "");
    const list = DetailLink;
    list[name] = value;

    dispatch({
      type: "GET_DETAIL_LINK_SUCCESS",
      payload: list
    });
    // setState({ Vote: list });
  };

  // handle input change
  const handleCandidateChange = (name, value, index) => {
    // const { name, value } = e.target;
    let list = DetailLink;
    list.votes[index][name] = value;
    dispatch({
      type: "GET_DETAIL_LINK_SUCCESS",
      payload: list
    });
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    const list = DetailLink;
    list.votes.push({
      is_delete: 0,
      title: "",
      id_link: list.id
    });

    dispatch({
      type: "GET_DETAIL_LINK_SUCCESS",
      payload: list
    });
    // setState({ Vote: list });
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = DetailLink;
    // list.votes[index].is_delete = 1;
    list.votes.splice(index, 1);
    dispatch({
      type: "GET_DETAIL_LINK_SUCCESS",
      payload: list
    });
    // setState({ Vote: list });
  };
  const handleUpdate = () => {
    // event.preventDefault();
    _postUpdateLink(DetailLink).then(res=>{
      const {reload} = res
      reload &&
      setState({
        ShowEditModal: !ShowEditModal
      })
    });
  };
  return (
    <>
      <Modal
        title={
          DetailLink !== null
            ? process.env.REACT_APP_BASEURL + "voting/" + DetailLink.key
            : "Loading..."
        }
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
            target="_blank"
            href={
              DetailLink !== null &&
              process.env.REACT_APP_BASEURL + "voting/" + DetailLink.key
            }
            className="bg-primary text-white border-0"
          >
            <EyeOutlined
              className="align-self-center py-auto"
              style={{ verticalAlign: "0" }}
            />{" "}
            View
          </Button>,
          <Button
            type="primary"
            size={"large"}
            onClick={handleUpdate}
            className="bg-success text-white border-0"
          >
            Update
          </Button>,
          <DeleteButton
            Data={DetailLink}
            DeleteFunc={(value) => {
              _postDeleteLink(value);
            }}
            setState={() =>
              setState({
                ShowEditModal: !ShowEditModal
              })
            }
            size="large"
          />
        ]}
      >
        <div className="Features" dangerouslySetInnerHTML={{ __html: Alert }} />
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">
            Url Vote:
          </label>
          <Input
            onkeypress="return /[a-z]/i.test(event.key)"
            type="text"
            name="key"
            onChange={(e) => handleTitleChange(e)}
            value={DetailLink !== null ? DetailLink.key : "Loading..."}
            id="recipient-title"
          />
        </div>

        {
          <Button type="primary" onClick={() => handleAddClick()}>
            + Add Option
          </Button>
        }
        <div className={LinkList.length > 0 && "row mt-3"}>
          {DetailLink &&
            DetailLink.votes.map((element, i) => {
              return (
                <>
                  {element.is_delete !== 1 && (
                    <>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Nama vote:
                        </label>

                        <Select
                          className="w-100"
                          defaultValue={element.title}
                          name="id_vote"
                          onChange={(value) =>
                            handleCandidateChange("id_vote", value, i)
                          }
                        >
                          {AllVote &&
                            AllVote.map((option, ind) => (
                              <Option key={ind} value={option.id}>
                                {option.title}
                              </Option>
                            ))}
                        </Select>
                      </div>
                      <div className="form-group">
                        {DetailLink.length !== 1 && (
                          <Button danger onClick={() => handleRemoveClick(i)}>
                            Remove
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              );
            })}
        </div>
      </Modal>
    </>
  );
}
