import React, { useState } from "react";
import { Button, Modal } from "antd";
import api from "../../../../api";
// import { setHeader } from "../../../../Helpers/Auth";
import check from "./img/check.webp";
import { setHeader } from "../../../../Helpers/UserFunctions";
import { GetRootContext } from "../../../../Context/Context";
export default function ShareModal({ShareList,ShowShareModal,IsSelected,setState}) {
//  const {ShowShareModal} = GetRootContext().state.vote
 const {dispatch} = GetRootContext()
  const [Code, setCode] = useState(null);
  const handleShare = () => {
    var result = ShareList.map(el=>el.id);
    api.post("links", {id:result}, setHeader()).then((res) => {
      setCode(res.data.code);
    });
  };
  return (
    <>
      <Modal
        title={
          Code !== null
            ? "Your votes are ready to see!"
            : "Do you want to share your vote?"
        }
        visible={ShowShareModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        footer={[
          <Button
            href={process.env.REACT_APP_BASEURL + "links/"}
            class="btn btn-secondary"
          >
            Manage Link
          </Button>,
          <Button
            onClick={(e) => handleShare()}
            class="btn btn-success"
            type="primary"
          >
            Share
          </Button>,
        ]}
        onCancel={() => {
          setState({ShowShareModal:!ShowShareModal,
            IsSelected:!IsSelected
          })
      }
      }
        // okText="Ya"
        cancelText="Close"
      >
        {Code !== null && (
          <>
            <div class="modal-body text-left">
              <img
                className="img-thumbnail mx-auto d-block border-0"
                src={check}
              />
              <p>Click link down below to see your votes.</p>
              <a
                target="_blank"
                href={process.env.REACT_APP_BASEURL + "voting/" + Code}
              >
                {process.env.REACT_APP_BASEURL + "voting/" + Code}
              </a>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
