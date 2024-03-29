const db = require("../lib/database")

exports.findAll = async function(){
    let sql = `SELECT * FROM TBL_TODO_LIST WHERE TL_DEL_YN = 'N'`;
    let result = [];
    let [todoList, fields] = await db.query(sql);
    for (let todo of todoList){
        // sql = `SELECT * FROM TBL_CARD_LIST WHERE CL_DEL_YN = 'N' AND CL_PARENT_SEQ = ${todo.TL_SEQ}` ;
        let listData = {
            id: todo.TL_SEQ,
            mode: 0,            // 0: 기본 값, 1: 쓰기 모드
            addCardTitle: "",   // 입력된 데이터를 받을 변수 선언
            name: todo.TL_TITLE,
            rows: []
        }
        
        let cardList = await this.getAllNode(todo.TL_SEQ);
        // console.log(cardList);
        // let [cardList, cardFields] = await db.query(sql);
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

exports.getAllNode = async function(todoSeq){
    let sql, node, result=[], isNullTail=false;
    // Head Search
    sql = `SELECT * FROM TBL_CARD_LIST WHERE 
    CL_DEL_YN = 'N' AND CL_PARENT_SEQ = ${todoSeq} AND CL_PREV IS NULL`;
    let [head, field] = await db.query(sql);
    if(head[0]){
        node = head;
        result.push(node[0]);
        while(!isNullTail){
            // Tail Search # 다음 노드 값이 NULL이면 종료
            if(node[0].CL_NEXT == null){
                isNullTail = true;
            } else {
                sql = `SELECT * FROM TBL_CARD_LIST WHERE
                CL_DEL_YN = 'N' AND CL_PARENT_SEQ = ${todoSeq} AND CL_SEQ = ${node[0].CL_NEXT}`;
                [node, field] = await db.query(sql)
                result.push(node[0]);
            }
        }
        return result
    } else {
        return result;
    }
}

async function getNodeByIndex(todoSeq, idx){
    let sql, node, cnt=0, result, isNullTail=false;
    // Head Search
    sql = `SELECT * FROM TBL_CARD_LIST WHERE 
    CL_DEL_YN = 'N' AND CL_PARENT_SEQ = ${todoSeq} AND CL_PREV IS NULL`;
    let [head, field] = await db.query(sql);
    if(head[0]){
        node = head;
        while(!isNullTail){
            result = node[0];
            cnt++;
            if(cnt == idx){
                return result;
            }
            // Tail Search # 다음 노드 값이 NULL이면 종료
            if(node[0].CL_NEXT == null){
                isNullTail = true;
            } else {
                sql = `SELECT * FROM TBL_CARD_LIST WHERE
                CL_DEL_YN = 'N' AND CL_PARENT_SEQ = ${todoSeq} AND CL_SEQ = ${node[0].CL_NEXT}`;
                [node, field] = await db.query(sql)
            }
        }
    } else {
        return result;
    }
}

exports.getPrevNode = async function(cardSeq, todoSeq){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = ${todoSeq} AND CL_DEL_YN = 'N'
    AND CL_NEXT = ${cardSeq}`;
    let [prev, fields] = await db.query(sql);
    return prev;
}

exports.getNextNode = async function(cardSeq, todoSeq){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = ${todoSeq} AND CL_DEL_YN = 'N'
    AND CL_PREV = ${cardSeq}`;
    let [next, fields] = await db.query(sql);
    return next;
}

exports.getPrevNodeByIndex = async function(todoSeq, futureIndex){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = ${todoSeq} AND CL_DEL_YN = 'N'
    ORDER BY CL_PREV
    LIMIT ${futureIndex-1}, 1`;
    let [prev, fields] = await db.query(sql);
    return prev;
}

exports.getNextNodeByIndex = async function(todoSeq, futureIndex){
    let sql = `
    SELECT * FROM TBL_CARD_LIST 
    WHERE CL_PARENT_SEQ = ${todoSeq} AND CL_DEL_YN = 'N'
    ORDER BY CL_PREV
    LIMIT ${futureIndex}, 1`;
    let [next, fields] = await db.query(sql);
    return next;
}

exports.insertList = async function(body) {
    let sql = `INSERT INTO TBL_TODO_LIST (TL_TITLE)
        VALUES ('${body.name}')`
        
    let result = await db.execute(sql);

    return result;
}

exports.findCardById = async function(cardSeq) {
    let sql = `SELECT * FROM TBL_CARD_LIST WHERE CL_SEQ = ${cardSeq}`;
    let [result, fields] = await db.query(sql);
    return result;
}

exports.insertCard = async function(body) {
    // Linked List 추가
    let sql, result, prevSeq;
    // 이전 Row가 존재하는 경우, 해당 Row의 Seq 값을 PREV 값에 넣어준다.
    sql = `SELECT CL_SEQ FROM TBL_CARD_LIST WHERE CL_DEL_YN='N' AND CL_PARENT_SEQ = ${body.id} AND CL_NEXT IS NULL` 
    let [prev, fields] = await db.query(sql);
    if(prev[0]){
        prevSeq = prev[0].CL_SEQ;
    } else {
        prevSeq = null;
    }

    // PREV 값을 가진 새로운 Row를 추가해준다.
    sql = `INSERT INTO TBL_CARD_LIST (CL_PARENT_SEQ, CL_PREV, CL_NEXT, CL_TITLE)
    VALUES (${body.id}, ${prevSeq}, null,'${body.name}')`;
    [result, fields] = await db.execute(sql);
    
    // 새로 추가 된 카드가 가장 최근 값이 되었으므로, 이전 카드의 NEXT 값을 변경해준다.
    if(result.insertId && prev[0]){
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = ${result.insertId} WHERE CL_SEQ = ${prevSeq}`
        let update = await db.execute(sql);
    }

    return result;
}


exports.unlinkNode = async function(cardSeq, oldParentSeq){
    let sql, curRowUpt, prevRowUpt, nextRowUpt;
    let prev = await this.getPrevNode(cardSeq, oldParentSeq);
    let next = await this.getNextNode(cardSeq, oldParentSeq);
    if(prev[0] && next[0]){
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = ${next[0].CL_SEQ} WHERE CL_SEQ = ${prev[0].CL_SEQ}`
        prevRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_PREV = ${prev[0].CL_SEQ} WHERE CL_SEQ = ${next[0].CL_SEQ}`
        nextRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_DEL_YN = 'Y' WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    } else if(prev[0]){
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = null WHERE CL_SEQ = ${prev[0].CL_SEQ}`
        prevRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_DEL_YN = 'Y' WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    } else if(next[0]){
        sql = `UPDATE TBL_CARD_LIST SET CL_PREV = null WHERE CL_SEQ = ${next[0].CL_SEQ}`
        nextRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_DEL_YN = 'Y' WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    } else {
        sql = `UPDATE TBL_CARD_LIST SET CL_DEL_YN = 'Y' WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    }

    return [prevRowUpt, curRowUpt, nextRowUpt];
}

exports.linkNode = async function(cardSeq, newParentSeq, futureIndex){
    let sql, curRowUpt, prevRowUpt, nextRowUpt;

    // 옮기는 위치의 prev, next를 구한다.
    let prev = await getNodeByIndex(newParentSeq, futureIndex);
    let next = await getNodeByIndex(newParentSeq, futureIndex+1);

    if(prev && next){
        sql = `UPDATE TBL_CARD_LIST SET CL_PARENT_SEQ = ${newParentSeq}, CL_PREV = ${prev.CL_SEQ}, CL_NEXT = ${next.CL_SEQ}, CL_DEL_YN = 'N' WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = ${cardSeq} WHERE CL_SEQ = ${prev.CL_SEQ}`
        prevRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_PREV = ${cardSeq} WHERE CL_SEQ = ${next.CL_SEQ}`
        nextRowUpt = await db.execute(sql);
    } else if(prev){
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = ${cardSeq} WHERE CL_SEQ = ${prev.CL_SEQ}`
        prevRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_NEXT = null, CL_PREV = ${prev.CL_SEQ}, CL_DEL_YN = 'N', CL_PARENT_SEQ = ${newParentSeq} WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    } else if(next){
        sql = `UPDATE TBL_CARD_LIST SET CL_PREV = ${cardSeq} WHERE CL_SEQ = ${next.CL_SEQ}`
        nextRowUpt = await db.execute(sql);
        sql = `UPDATE TBL_CARD_LIST SET CL_PREV = null, CL_NEXT = ${next.CL_SEQ}, CL_DEL_YN = 'N', CL_PARENT_SEQ = ${newParentSeq} WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    } else {
        sql = `UPDATE TBL_CARD_LIST SET CL_DEL_YN = 'N', CL_PREV = null, CL_NEXT = null, CL_PARENT_SEQ = ${newParentSeq} WHERE CL_SEQ = ${cardSeq}`;
        curRowUpt = await db.execute(sql);
    }

    return [prevRowUpt, curRowUpt, nextRowUpt];
}