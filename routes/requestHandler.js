'use strict';
var express = require('express');
var router = express.Router();

var ServiceAPI = require('../services/serviceAPI');
var serviceAPI = new ServiceAPI();



// Exposed APIS
router.get('/scraper', function ( req, res ) {
	console.log("calling started");
    return serviceAPI.getMediaDataAndSave(req,res).then(function (response) {
		console.log("function called and resp is:", response);
    	if(resopnse && response.success){
			res.json({
        		data: response,
        		info: {status: "SUCCESS", statusCode: 200, message: response.message}
    		});
    	} else{
    		res.json({
        		data: response,
        		info: {status: "FAILURE", statusCode: 500, message: response.message}
    		});

    	}
    }).catch(function(err) {
        return res.json({info: {message: err.message, status: "FAILURE", statusCode: err.statusCode}});
    })
})

router.get('/channels', function ( req, res ) {
	console.log("calling started");
	return serviceAPI.getChanells(req,res).then(function (response) {
		if(resopnse && response.success){
			res.json({
				data: response,
				info: {status: "SUCCESS", statusCode: 200, message: response.message}
			});
		} else{
			res.json({
				data: response,
				info: {status: "FAILURE", statusCode: 500, message: response.message}
			});

		}
	}).catch(function(err) {
		return res.json({info: {message: err.message, status: "FAILURE", statusCode: err.statusCode}});
	})
})




module.exports = router;
