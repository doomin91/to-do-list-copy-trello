const db = require("../lib/database")

exports.findAll = async function(){
    let sql = `SELECT * FROM TBL_TODO_LIST WHERE TL_DEL_YN = 'N'`;
    let result = [];
    let [todoList, fields] = await db.query(sql);
    for (let todo of todoList){
        sql = `SELECT * FROM TBL_CARD_LIST WHERE CL_PARENT_SEQ = ${todo.TL_SEQ}`;
        let listData = {
            id: todo.TL_SEQ,
            mode: 0,            // 0: 기본 값, 1: 쓰기 모드
            addCardTitle: "",   // 입력된 데이터를 받을 변수 선언
            name: todo.TL_TITLE,
            rows: []
        }
        let [cardList, cardFields] = await db.query(sql);
        for (let card of cardList){
            let cardData = {
                id: card.CL_SEQ,
                mouseOver: 0,   // 마우스오버 이벤트 제어변수
                name: card.CL_TITLE,
            }
            listData.rows.push(cardData);
        }   
        result.push(listData)        
    }

    return result;
}

exports.findListById = function(id, callback) {
    
}

exports.getPrevNode = async function(todoSeq, futureIndex){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = 1 AND CL_DEL_YN = 'N'
    ORDER BY CL_PREV
    LIMIT ${futureIndex-1}, 1`;
    let [prev, fields] = await db.query(sql);
    return prev;
}

exports.getNextNode = async function(todoSeq, futureIndex){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = 1 AND CL_DEL_YN = 'N'
    ORDER BY CL_PREV
    LIMIT ${futureIndex+1}, 1`;
    let [next, fields] = await db.query(sql);
    return next;
}

exports.insertList = async function(body) {
    let sql = `INSERT INTO TBL_TODO_LIST (TL_TITLE)
        VALUES ('${body.name}')`
        
    let result = await db.execute(sql);

    return result;
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
exports.insertCard = async function(body) {
    let sql = `INSERT INTO TBL_CARD_LIST (CL_PARENT_SEQ, CL_TITLE)
    VALUES (${body.id}, '${body.name}')`;
        
    let result = await db.execute(sql);
    return result;
}
exports.updateCardById = function(id, callback) {
    
}
exports.deleteCardByI = function(id, callback) {
    
}