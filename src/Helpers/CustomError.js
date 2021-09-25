import {message } from 'antd';

export const customErr = (status,custMessage)=>{
if (status>=200&&status<300) {
  message['success']({
    content: `Anda berhasil ${custMessage}!`,
  });
    return {
        status,
        alert: `<div class="alert alert-success alert-dismissible fade show" role="alert">
          Anda berhasil ${custMessage}!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`,
        reload:true
    }
} else if(status>=400&&status<500){
  
  message['error']({
    content: `Mohon maaf, ${custMessage}!`,
  });
    return {
        status,
        alert: `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${custMessage}!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`,
        reload:false
    }
}else if(status>=500&&status<600){
  message['warning']({
    content: `Server sedang bermasalah`,
  });
    return {
        status,
        alert: `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Server</strong> sedang bermasalah.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`,
        reload:false
    }
}
}
