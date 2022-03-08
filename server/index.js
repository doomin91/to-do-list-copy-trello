'use strict'
const express = require('express')

const app = express()
const routes_path = require("./controllers")
const cors = require('cors');

app.use("/", routes_path)

// request * 허용
const runType = "DEV"

if(runType == "DEV"){
    app.use(cors())
}
app.listen(5000, function(){
    console.log("start! express server on port 5000")
})

module.exports = app;