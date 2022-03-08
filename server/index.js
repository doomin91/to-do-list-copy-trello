'use strict'
const express = require('express')

const app = express()
const cors = require('cors');

// request * 허용
const runType = "DEV"

if(runType == "DEV"){
    app.use(cors())
}
app.listen(5000, function(){
    console.log("start! express server on port 5000")
})

module.exports = app;