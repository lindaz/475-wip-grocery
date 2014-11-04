var mongoose = require('mongoose');


var billSchema = new mongoose.Schema({
	bill_name 		:String,
	description 	:String,
	amount 			:Number,
	date			:String,
	user_name		:String,
	active			:Boolean,
	obsolete		:String
});

module.exports = mongoose.model('Bill', billSchema);