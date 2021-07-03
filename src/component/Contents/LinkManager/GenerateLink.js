import React, { useState } from "react";
import api from "../../../api";
import { setHeader } from "../../../Helpers/Auth";
import { bulkDeleteLinks } from "../../../Helpers/UserFunctions";
function GenerateLink(props) {
  const [Code,setCode] = useState('')
  // const [Public,setPublic] = useState(false)
  const [Alert,setAlert] = useState('');
  // const handleShare = () => {
  //   var result = props.ShareList.map(function (el) {
  //     var o = Object.assign({}, el);
  //     o.isPublic = Public;
  //     return o;
  //   });
  //   if(Public)
  //   api.post('generate/public', {result},setHeader())
  //   .then((res) => {
  //     setCode(res.data)
  //   });
  //   else
  //   api.post('generate/private', {result},setHeader())
  //   .then((res) => {
  //     setCode(res.data)
  //   });
  // };

  const handleBulkDelete = async () => {
    const sharelist = await props.AllData.filter((el) => el.isChecked && el);
    console.log(sharelist);
    bulkDeleteLinks(sharelist)
    .then(res => {
      const {reload} = res
      if(reload)
      window.location.reload(true);
    })
  };

  return (
    <>
    <button
    onClick={() => handleBulkDelete()}
    type="button"
    class="btn btn-danger"
    disabled={props.ShareList.length===0&& true}
  >
    Delete
  </button></>
  );
}

export default GenerateLink;
