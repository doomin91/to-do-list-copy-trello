'use strict'

const getToDo = async (req, res) =>{
    try{
        console.log(req);
        res.json("connect!!");
    }catch(err){
        console.log(err);
        res.json(err);
    }
}

module.exports = {
    getToDo
}