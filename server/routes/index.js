// 'use strict'
const express = require("express");
const router = express.Router();

/**
 * router 선언
 */
const toDoController = require("../controllers/toDoController")
    router.get("/api/getToDo", toDoController.getToDo)


router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;