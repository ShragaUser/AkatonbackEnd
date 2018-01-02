var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Incentives_data_Schema = Schema({
    Name:String,
    Plans:[{Code:Number,Name:String,Signature:Number,Amount:Number}],
    Conditions:[{Type:String,Prop_Name:String,Value:Object}],
    Type:String
});



module.exports = mongoose.model('Incentives',Incentives_data_Schema);