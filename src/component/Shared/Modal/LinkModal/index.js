import React from "react";
import {
  DeleteOneLink,
  UpdateOneLink,
} from "../../../../Helpers/UserFunctions";
import { Button, Input, Modal, Select } from "antd";
import { DeleteButton } from "../../Button";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { GetRootContext } from "../../../../Context/Context";
export default function LinkModal({ Vote, LinkList, VoteList, setState, Alert }) {
  const { Option } = Select;

  // handle input change
  const handleTitleChange = (e, index) => {
    var { name, value } = e.target;
    value = value.replace(/[^A-Za-z]/gi, "");
    const list = Vote;
    list.map((el, i) => {
      Vote[i][name] = value;
    });
    setState({ Vote: list });
  };

  // handle input change
  const handleCandidateChange = (name, value, index) => {
    // const { name, value } = e.target;
    let list = Vote;
    list[index][name] = value;
    setState({ Vote: list });
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    const list = Vote;
    list.push({
      action: "tambah",
      id: null,
      votename: "",
      id_url: list[0].id_url,
      id_vote: "",
    });
    setState({ Vote: list });
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = Vote;
    list[index]["action"] = "hapus";
    setState({ Vote: list });
  };
  const handleUpdate = () => {
    // event.preventDefault();

    UpdateOneLink(Vote).then((res) => {
      const { alert, reload } = res;
      setState({ Alert: alert });
      if (reload) window.location.reload();
    });
  };
 const {ShowEditModal} = GetRootContext().state.vote
 const {dispatch} = GetRootContext()
  return (
    <>
      <Modal
        title={
          Vote !== null
            ? process.env.REACT_APP_BASEURL + "voting/" + Vote[0].id_url
            : "kosong"
        }
        visible={ShowEditModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        onCancel={() => 
          dispatch({
          type:"EDIT_MODAL"
        })}
        // okText="Ya"
        cancelText="Close"
        footer={[
          <Button
            data-dismiss="modal"
            onClick={() => 
          dispatch({
          type:"EDIT_MODAL"
        })}
            size={"large"}
          >
            Close
          </Button>,
          <Button
            type="primary"
            size={"large"}
            target="_blank"
            href={
              Vote !== null &&
              process.env.REACT_APP_BASEURL + "voting/" + Vote[0].id_url
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
            Data={Vote !== null && Vote[0].id_url}
            DeleteFunc={(value) => {
              DeleteOneLink(value).then((res) => {
                const { alert, reload } = res;
                setState({ Alert: alert });
                if (reload) window.location.reload();
              });
            }}
            size="large"
          />,
        ]}
      >
        <div
          className="Features"
          dangerouslySetInnerHTML={{ __html: Alert }}
        />
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">
            Url Vote:
          </label>
          <Input
            onkeypress="return /[a-z]/i.test(event.key)"
            type="text"
            name="id_url"
            onChange={(e) => handleTitleChange(e)}
            value={Vote !== null ? Vote[0].id_url : "kosong"}
            id="recipient-title"
          />
        </div>

        {
          <Button type="primary" onClick={() => handleAddClick()}>
            + Add Option
          </Button>
        }
        <div className={LinkList.length > 0 && "row mt-3"}>
          {Vote &&
            Vote.map((element, i) => {
              return (
                <>
                  {element.action !== "hapus" && (
                    <>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Nama vote:
                        </label>

                        <Select
                          className="w-100"
                          defaultValue={
                            element.votename !== null && element.votename
                          }
                          name="id_vote"
                          onChange={(value) =>
                            handleCandidateChange("id_vote", value, i)
                          }
                        >
                          {VoteList &&
                            VoteList.map((option, ind) => (
                              <Option key={ind} value={option.id_vote}>
                                {option.name}
                              </Option>
                            ))}
                        </Select>
                      </div>
                      <div className="form-group">
                        {Vote.length !== 1 && (
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
