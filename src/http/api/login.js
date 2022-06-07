// api文件夹,用于集中管理接口
import serviceAxios from "../index";


export const getLoginInfo = () => {
    return serviceAxios({
        url: "/index/login",
        method: "get",
        params: {
            _token:
                "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
        },
    });
};
export const deleteLoginInfo = (row) => {
    
    return serviceAxios({
        url: "/index/login",
        method: "post",
        params: {
            _token:
                "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
        },
        data:{
            row:row
        }
    });
};

export const addPersonInfo = (personData) => {
    console.log('api获取到的编辑数据');
    console.log(personData);
    return serviceAxios({
        url: "/index/login",
        method: "post",
        params: {
            _token:
                "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
        },
        data:{
            personData:personData
        }
    });
};

export const editPersonInfo = (personData) => {
    
    return serviceAxios({
        url: "/index/login",
        method: "post",
        params: {
            _token:
                "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
        },
        data:{
            personData:personData
        }
    });
};


