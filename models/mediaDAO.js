
'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const mongooseFactory = require('./mongooseFactory');
const MediaRepo = mongooseFactory.MediaRepo;


class MediaDAO {

    insertMultiple(dataItems){
        for(var i = 0; i<= dataItems.length; i++){
            var record = new MediaRepo(dataItems[i]);
            record.save(function (err) {
                if (err) {
                    console.log("Bad = " + err);
                    return {success:false};
                }
            });
        }
        return {success: true};
    }

    //group data by channelId.
    getChannelsList(){
        let query = {
            $group:{_id:"$channelId", "records":{$push:"$$ROOT"},"count":{$sum:1}}
        }
        return MediaRepo.aggregate(query);
    }
    
    insertItem(item) {
        return MediaRepo.insert(item);
    };

    getAllItems() {
        return MediaRepo.find();
    };

    getByChannelId(ChannelId) {
        let query = {
            channelId: ChannelId
        }
        return MediaRepo.find(query);
    };

}



module.exports = MediaDAO;
