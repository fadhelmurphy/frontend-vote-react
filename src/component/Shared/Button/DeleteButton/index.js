import { Modal, Button } from "antd";
import React, { useState } from "react";
import { GetRootContext } from "../../../../Context/Context";
// import { _getList } from "../../../../Helpers/UserFunctions";
export default function DeleteButton(props) {
  const [state, setstate] = useState({ visible: false });
  const RootContext = GetRootContext()
  const handleDelete = async () => {
    // var { Vote } = this.state;
    props.DeleteFunc(props.Data);
    props.setState && props.setState({ShowEditModal:!props.ShowEditModal})
    // _getList(RootContext)
    setstate({
      visible: false,
    });
  };
  const showModal = () => {
    setstate({
      visible: true,
    });
  };

  const hideModal = () => {
    setstate({
      visible: false,
    });
  };
  return (
    <>
      <Button
        className="shadow-sm"
        danger
        type="primary"
        size={props.size}
        // onClick={() => handleDelete()}
        onClick={showModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </Button>
      <Modal
        visible={state.visible}
        onOk={() => handleDelete()}
        onCancel={()=>hideModal()}
        okText="Ya"
        cancelText="Tidak"
        zIndex={1050}
      >
        <p>Anda yakin ingin menghapus?</p>
      </Modal>
    </>
  );
}
