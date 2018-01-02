var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Soldier_data_Schema = Schema({
    Pnumber:Number,
    Name:String,
    Is_Officer:Boolean,
    Rank: Number,
    Rank_Heb: String,
    //true - new model || false - old model
    Keva_Model: Boolean,
    Corp_Ranking: Number,
    Comission: Number,
    Enter_Real_Keva_Date: Date,
    Hardening_End_Date: Date,
    Education: Number,
    Education_type: String,
    Training_Level: Number,
    Enter_Keva_Date: Date,
    Population_Type: String,
    Highly_Remarked: Boolean,
    Birth_Date: Date,
    Age: Number,
    Vetek: Number
});



module.exports = mongoose.model('Soldiers',Soldier_data_Schema);