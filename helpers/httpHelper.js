var request = require('request-json');
var Promise = require('bluebird');
var _ = require('lodash');

var req = require('request');

function HttpClient(baseUrl){
    var client = request.createClient(baseUrl);

    this.getJSON = function(url,headers){
        return new Promise(function(resolve,reject){
            if(headers){
                client.headers = _.merge(client.headers,headers);
            }
            client.get(url,function(err,response,body){
                if(err){
                    reject(err);
                }else{
                    resolve({response:response,body:body});
                }
            });
        });
    };

    this.postJSON = function(url,data,headers){
        return new Promise(function(resolve,reject){
            if(headers){
                client.headers = _.merge(client.headers,headers);
            }
            client.post(url,data,function(err,response,body){
                if(err){
                    reject(err);
                }else{
                    resolve({response:response,body:body});
                }
            });
        });
    };

    this.postUrlEncoded = function(url,data,customHeaders){
        var headers = {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        };
        if(customHeaders){
            headers = _.merge(headers,customHeaders);
        }
        return new Promise(function(resolve,reject){
            var options = {
                method: 'POST',
                url: url,
                headers: headers,
                form: data
            };
            console.log(options.form);
            req(options,function(err,response,body){
                if(err){
                    reject(err);
                }else{
                    resolve({response:response,body:body});
                }
            });
        });
    }
}

module.exports = HttpClient;
