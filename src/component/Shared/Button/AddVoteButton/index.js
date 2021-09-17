import React from "react";
import Add from "../../Modal/AddModal";
import { Button } from "antd";
export default function AddVoteButton(props) {
  return (
    <>
      <Button
        type="primary"
        // href="#"
        // data-toggle="modal"
        // data-target="#addModal"
        onClick={()=>props.setState({showAddModal:true})}
      >
        +
      </Button>
    </>
  );
}
