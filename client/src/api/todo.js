import axios from './axios';

export async function getToDo(){
    try{
        return axios.get(`/api/getToDo`);
    }catch(err){
        return err;
    }
    
}
