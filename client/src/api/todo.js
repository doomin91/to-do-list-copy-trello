import http from './http';

export async function getList(){
    try {
        console.log("get /api/getList");
        return http.get(`/api/getList`);
    }catch(err){
        return err;
    }    
}

export async function insertList(data){
    try {
        console.log("post /api/insertList");
        console.log(data);
        return http.post(`/api/insertList`, data);
    }catch(err){
        return err;
    }
}

export async function insertCard(data){
    try {
        return http.post(`/api/insertCard`, data);  
    }catch(err){
        return err;
    }
}

export async function moveCard(data){
    try {
        return http.post(`/api/moveCard`, data);
    }catch(err){
        return err;
    }
}