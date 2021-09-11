import { Button } from 'antd';
import React from 'react'
export default function DeleteButton(props){
    const handleDelete = async () => {
        // var { Vote } = this.state;
        props.DeleteFunc(props.Data)
      };
    return (
            <Button
                    danger
                    type="primary"
                    size={props.size}
    onClick={() => handleDelete()}>
      Delete
    </Button>
    )
}