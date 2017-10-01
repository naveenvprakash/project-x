'use strict';

const config = require('../config');
const Promise = require('bluebird');
const key = config.youtube.key;

var HttpClient = require('../helpers/httpHelper');
const MediaDAO = require('../models/mediaDAO');
const mediaDAO = new MediaDAO();

function ServiceAPI() {}

// /**
//  * reqData{
//  *      nextpageToken:''
//  * }
//  * **/
// var reqData = function(nextToken){
//     let i =0;
//     console.log("calling function:", i);
//     let nextPageToken = nextToken!==undefined?nextToken:'';
//     const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=50&type=video&pageToken="+nextPageToken+"&key="+key;
//     var videosData = [];
//     let httpClient = new HttpClient(url)
//     httpClient.getJSON(url,null).then(function(err, res){
//         console.log("response body", res.body, "response body");
//         if(res && res.body && res.body.items.length >= 0){
//             videosRepo.insertMultiple(res.body.items).then(function(resp){
//                 if(resp){
//                     console.log("response body", resp, "response body")
//                     i++;
//                     reqData(res.body.nextPageToken); //recursive Call
//                 }
//              })
//             //.catch(function(err){
//             //     return {success: false, message:"something went wrong", error: err}
//             // })
//         }else{
//             console.log("iam in error way");
//             return {success: true, massage:"videoData scraped and saved into our DB"};
//         }
//     }).catch(function(err){
//         console.log("iam in error way");
//         return {success: false, message:"something went wrong", error: err}
//     })
// }


ServiceAPI.prototype.getMediaDataAndSave = function ( req, res ) {
    console.log("came to calling function getMediaDataAndSave");
    let token = req.body && req.body.token && req.body.token!==undefined? req.body.token : ''; 
    return handlePagination(token).then(function(dataResp){
        console.log("came to calling function handlePagination resp: " , dataResp );
        if(dataResp && dataResp.success){
            return {success: true, message: "Data scraping Successfully Done And saved in Db"}
        }else{
            return {success:"false", message:"somthing went Wrong please try later"};
        }
    }).catch(function(err){
        return err;
    })
}

ServiceAPI.prototype.getChannels = function(req, res){
    mediaDAO.getChannelsList(req).then(function(dbResp){
        if(dbResp) {
            return dbResp;
        }
    }).catch(function(err){
        return err;
    })
}

function handlePagination(token) {
    console.log("came into recursive function and calling recursively started");
    let data = {
        nextToken: token?token:''
    }
    let videosInfo = [];
    let videosData = getVideoList(data)
    console.log("api hit done")
    return videosData.then(function(mediaData){
        console.log("api hit done and data is: ", mediaData)
        if(mediaData && mediaData!==undefined && mediaData.items.length >=0 ){
            //

            //DB operation:
            // let insertResp = mediaDAO.insertMultiple(mediaData.items)
            // if(insertResp.success){
            //     handlePagination(mediaData.nextPageToken);
            // } else{
            //     return {success: false, error: err};
            // }

        }else if(mediaData == undefined){
            return {success: false};
        }else{
            return {success: true};
        }
    }).catch(function(err){
        return {success: false, error:err};
    })
}


function getVideoList(data) {
    console.log("api hitting happens here")
    var httpClient = new HttpClient("https://www.googleapis.com");
    var nextToken = data&&data!==undefined&&data.nextToken && data.nextToken!==undefined?data.nextToken:'';
    var urlPath = "/youtube/v3/search?part=snippet&regionCode=IN&maxResults=50&type=video&pageToken="+nextToken+"&key="+key;
    return httpClient.getJSON(urlPath).then(function (resp) {
        console.log("api hit gave response is:", resp)
        if (resp) {
            console.log(resp);
            return resp.body;
        }
    }).catch(function (err) {
        return err;
    })
}




module.exports = ServiceAPI;
