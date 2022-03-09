const pool = require("../lib/database")

exports.findAll = async function(callback){
    let sql = `SELECT * FROM TBL_TODO_LIST WHERE TL_DEL_YN = 'N'`;

    let [todo, fields] = await pool.query(sql);
    for (let element of todo){
        console.log(`------------------------------------------------${element.TL_SEQ}`);
        sql = `SELECT * FROM TBL_CARD_LIST WHERE CL_PARENT_SEQ = ${element.TL_SEQ}`;
        let [cards, card_fields] = await pool.query(sql);
        console.log("cards tabel =>");
        console.log(cards);
    }

}

exports.findListById = function(id, callback) {
    
}
exports.insertList = function(id, callback) {
    
}
exports.updateListById = function(id, callback) {
    
}
exports.deleteListById = function(id, callback) {
    
}
exports.findCardById = async function(id, callback) {
    let sql = `SELECT * FROM TBL_CARD_LIST WHERE 
                CL_PARENT_SEQ = ${id} AND
                CL_DEL_YN = 'N'`;

    await db.query(sql, function(err , res){
        if (err){
            console.log("error: ", err);
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}
exports.insertCard = function(id, callback) {
    
}
exports.updateCardById = function(id, callback) {
    
}
exports.deleteCardByI = function(id, callback) {
    
}