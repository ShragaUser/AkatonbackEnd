var dbHandler ={};
var path = require('path');
var mongoose = require('mongoose');
var Promise = require('Promise');

dbHandler.init = function(){
    require('./Soldiers');
    require('./Incentives');
    var uri = "mongodb://192.168.1.49/AkaTon";
    dbHandler.akadb = mongoose.connect(uri,{server:{auto_reconnect:true, socketOptions:{socketTimeoutMS:0, connectiontimeout:0,socketTimeout:0,connectiontimeoutMS:0}}})
        .then( () => console.log("DB connected Succefully"),
            err=> {console.error("DB Could not connect")});
    var PassedIncentives = {};
}

function getmodel(modelName){
    return require('./'+modelName)
}
dbHandler.getSoldierData = function(pnumber){
    var model = getmodel("Soldiers");
    return new Promise(function(fulfill,reject){
        model.find({Pnumber:pnumber},function(err,docs){
            if(err) reject(err)
            else    fulfill(docs)
        });
    });
};

dbHandler.insertIntoCollection=function (collection, document){
    var model = getmodel(collection);
    var instance = new model(document);
    return new Promise(function(fulfill,reject){
        instance.save(function(err){ 
            if(err)
             reject(err)
            else fulfill() })});
    };

function LoadAvailableIncentives()

//dbHandler.insertIntoCollection("Soldiers",{Pnumber:8160868,Name:"אבי כהן",Is_Officer:true,Rank:1,Rank_heb:"סגם",Keva_Model:true,Corp_Ranking:1,Comission:2,Enter_Real_Keva_Date: new Date(),Hardening_End_Date:new Date(),Education:1,Education_Type:"Computers",Training_Level:8,Enter_Keva_Date:new Date(),Population_Type:"Tech",Highly_Remarked:false,Birth_Date:new Date("01/01/1994"),Age:24,Vetek:34});
//dbHandler.insertIntoCollection("Incentives",{Name:"מענק כוכבים",Plans:[{Code:123,Name:"NO KNOW",Signature:24,Amount:5000}],Conditions:[{Type:'String',Prop_Name:"Population_Type",Value:"Tech"},{Type:"Number",Prop_Name:"Corp_Ranking",Value:{min:1,max:1}},{Type:"Number",Prop_Name:"Vetek",Value:{min:24,max:999}}],Type:'הון'})

module.exports = dbHandler;

