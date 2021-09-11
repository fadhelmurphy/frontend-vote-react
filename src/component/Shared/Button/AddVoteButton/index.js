import React from "react";
import Add from "./Add";
import { Button } from "antd";
export default function AddVoteButton(props) {
  return (
    <>
      <Button
        type="primary"
        href="#"
        data-toggle="modal"
        data-target="#addModal"
      >
        + Create
      </Button>
      <Add {...props} />
    </>
  );
}
