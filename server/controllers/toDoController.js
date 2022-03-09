'use strict'

const ToDo = require("../models/toDoModel")

const findAll = function (req, res) {
    let result = [];
    let data = {};
    ToDo.findAll( function (err, todoRows) {
        if (err) res.send(err);
        for(const element of todoRows){
            data = {
                TL_SEQ: element.TL_SEQ, 
                TL_TITLE: element.TL_TITLE,
                CARDS: []
            }

            let promise = ToDo.findCardById(element.TL_SEQ, function (err, card){
                if (err) res.send(err);
                data.CARDS.push(card);
            })
            await Promise.all(promise);
            result.push(data);
        }
        res.json(result);
    });
}

const findListById = function (req, res) {
    ToDo.findListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const insertList = function (req, res) {
    ToDo.insertList( function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
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
const insertCard = function (req, res) {
    ToDo.insertCard( function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
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