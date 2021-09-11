import { Button } from 'antd';
import React from 'react'
export default function BulkDeleteButton(props){
    const handleBulkDelete = async () => {
        const sharelist = await props.AllData.filter((el) => el.isChecked && el);
        console.log(sharelist);
        props.bulkDelete(sharelist)
      };
    return (
        <>
            <Button
    className="mr-3"
    type="primary"
    onClick={() => handleBulkDelete()}
    disabled={props.disabled}
    danger>
      Delete
    </Button>
        </>
    )
}