
'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const mongo = config.mongo

mongoose.Promise = require('bluebird');
mongoose.connect(mongo.uri);

const Schema = mongoose.Schema;
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Connection error'));

db.once('open',function(){
	console.log("mongo connected");
});

const MediaSchema = new mongoose.Schema({

},{
    strict: false,
    collection:mongo.mediaData
});



const MediaRepo = mongoose.model(mongo.mediaData, MediaSchema);

module.exports = {
  MediaRepo:MediaRepo
};
