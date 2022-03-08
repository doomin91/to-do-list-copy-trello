import http from './http';

export async function getToDo(){
    try{
        console.log("get, getToDo");
        return http.get(`/api/getToDo`);
    }catch(err){
        return err;
    }
    
}
