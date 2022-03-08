// 'use strict'
const express = require("express");
const router = express.Router();

const toDoController = require("../controllers/toDoController")
router.get("/api/getToDo", toDoController.getToDo)

// router.get('/', (req, res) => {
//     console.log(req);
//     res.send('404 . Not Found!')
//   })

module.exports = router;