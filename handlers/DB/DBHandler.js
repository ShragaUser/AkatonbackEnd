var dbHandler ={};
var path = require('path');
var mongoose = require('mongoose');
var Promise = require('Promise');

dbHandler.IncentivesToSoldier = {};


dbHandler.init = function(){
    require('./Soldiers');
    require('./Incentives');
    var uri = "mongodb://192.168.1.49/AkaTon";
    dbHandler.akadb = mongoose.connect(uri,{server:{auto_reconnect:true, socketOptions:{socketTimeoutMS:0, connectiontimeout:0,socketTimeout:0,connectiontimeoutMS:0}}})
        .then( () => {
                console.log("DB connected Succefully");
                LoadAvailableIncentives();
                console.log(dbHandler.IncentivesToSoldier);
            },
            err=> {console.error("DB Could not connect")});
    console.log("Loaded Incentives")
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

function getAllSoldiers(){
    var model = getmodel("Soldiers");
    return new Promise(function(fulfill,reject){
        model.find({},function(err, docs){
        if(err) reject(err);
        else fulfill(docs);
    })});
}

function getAllIncentives(){
    var model = getmodel("Incentives");
    return new Promise(function(fulfill,reject){
        model.find({},function(err, docs){
        if(err) reject(err);
        else fulfill(docs);
    })});
}

dbHandler.insertIntoCollection=function (collection, document){
    var model = getmodel(collection);
    var instance = new model(document);
    return new Promise(function(fulfill,reject){
        instance.save(function(err){ 
            if(err)
             reject(err)
            else fulfill() })});
    };

function LoadAvailableIncentives(){
    var soldiers = getAllSoldiers().then(soldiers => {
        if(soldiers){
            var incentives = getAllIncentives().then(incentives =>{
                if(incentives){
                    soldiers.forEach(function(soldier){
                        var saveData =[];
                        incentives.forEach(function(incentive){
                            var saveIncentive={};
                            saveIncentive.Name=incentive.Name;
                            saveIncentive.Type=incentive.Type;
                            saveIncentive.Plans=incentive.Plans;
                            saveIncentive.Conditions =[];
                            incentive.Conditions.forEach(function(condition){
                                saveCondition ={};
                                saveCondition.Type=condition.Type;
                                saveCondition.Prop_Name=condition.Prop_Name;
                                saveCondition.Value = condition.Value;

                                //Actual Cheks from this point
                                if(condition.Type==="Boolean" || condition.Type==="String" ){
                                    if(soldier[condition.Prop_Name]===condition.Value)
                                        saveCondition.Pass = true;
                                }
                                if(condition.Type==="Number"){
                                    if(soldier[condition.Prop_Name]>=condition.Value.min &&soldier[condition.Prop_Name]<=condition.Value.max)
                                        saveCondition.Pass = true;
                                }
                                if(condition.Prop_Name==="Corp_Ranking" && (soldier.Highly_Remarked===1 || soldier.Unit===8153)){
                                    saveCondition.Pass = true;
                                }
                                //checks if was ever true; if not than puts false
                                saveCondition.Pass = !!saveCondition.Pass;
                                saveIncentive.Conditions.push(saveCondition);
                            })
                        saveData.push(saveIncentive);
                        });
                    dbHandler.IncentivesToSoldier[soldier.Pnumber] = saveData;
                    });
                }
            })
        }
    })
    
}

//dbHandler.insertIntoCollection("Soldiers",{Pnumber:8160868,Name:"אבי כהן",Is_Officer:true,Rank:1,Rank_heb:"סגם",Keva_Model:true,Corp_Ranking:1,Comission:2,Enter_Real_Keva_Date: new Date(),Hardening_End_Date:new Date(),Education:1,Education_Type:"Computers",Training_Level:8,Enter_Keva_Date:new Date(),Population_Type:"Tech",Highly_Remarked:false,Birth_Date:new Date("01/01/1994"),Age:24,Vetek:34});
//dbHandler.insertIntoCollection("Incentives",{Name:"מענק כוכבים",Plans:[{Code:123,Name:"NO KNOW",Signature:24,Amount:5000}],Conditions:[{Type:'String',Prop_Name:"Population_Type",Value:"Tech"},{Type:"Number",Prop_Name:"Corp_Ranking",Value:{min:1,max:1}},{Type:"Number",Prop_Name:"Vetek",Value:{min:24,max:999}}],Type:'הון'})

module.exports = dbHandler;

