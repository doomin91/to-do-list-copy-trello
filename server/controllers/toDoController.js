'use strict'

const ToDo = require("../models/toDoModel")

const findAll = async function (req, res) {
    let result = await ToDo.findAll();
    res.status(200).json(result);
}

const findListById = function (req, res) {
    ToDo.findListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

const insertList = async function (req, res) {
    let result = await ToDo.insertList(req.body);
    res.status(200).json(result);
}
const updateListById = function (req, res) {
    ToDo.updateListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const deleteListById = function (req, res) {
    ToDo.deleteListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const findCardById = function (req, res) {
    ToDo.findCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const insertCard = async function (req, res) {
    let result = await ToDo.insertCard(req.body)
    res.json(result);
}
const updateCardById = function (req, res) {
    ToDo.updateCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const deleteCardById = function (req, res) {
    ToDo.deleteCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

module.exports = {
    findAll,
    findListById,
    insertList,
    updateListById,
    deleteListById,
    findCardById,
    insertCard,
    updateCardById,
    deleteCardById
}