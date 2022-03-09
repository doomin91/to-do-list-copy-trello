// 'use strict'
const express = require("express");
const router = express.Router();

/**
 * router 선언
 */
const toDoController = require("../controllers/toDoController")
    router.get("/api/getToDo",        toDoController.findAll);
    router.get("/api/findListById",   toDoController.findListById);
    router.get("/api/insertList",     toDoController.insertList);
    router.get("/api/updateListById", toDoController.updateListById);
    router.get("/api/deleteListById", toDoController.deleteListById);
    router.get("/api/findCardById",   toDoController.findCardById);
    router.get("/api/insertCard",     toDoController.insertCard);
    router.get("/api/updateCardById", toDoController.updateCardById);
    router.get("/api/deleteCardById", toDoController.deleteCardById);

router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;