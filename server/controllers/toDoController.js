'use strict'

const getToDo = async (req, res) =>{
    try{
        console.log(1);
        res.status(200).json("connect!!!!!");
    }catch(err){
        res.status(404).json(err);
    }
}

module.exports = {
    getToDo
}