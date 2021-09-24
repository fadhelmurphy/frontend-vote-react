import {notification } from 'antd';

export const customErr = (status,message)=>{
if (status>=200&&status<300) {
  notification['success']({
    message: `Anda berhasil ${message}!`,
  });
    return {
        status,
        alert: `<div class="alert alert-success alert-dismissible fade show" role="alert">
          Anda berhasil ${message}!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`,
        reload:true
    }
} else if(status>=400&&status<500){
  
  notification['error']({
    message: `Gagal, ${message}!`,
  });
    return {
        status,
        alert: `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${message}!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`,
        reload:false
    }
}else if(status>=500&&status<600){
  notification['warning']({
    message: `Server sedang bermasalah`,
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
