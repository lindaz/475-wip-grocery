var Database = require('../models/mymongo.js'),
	Pay = require('../models/pay.js'),
	this_user = require('../models/auth').this_user

exports.asgnExistingBill = function(req, res) {
	var newPay = {
		bill_name: req.body.bill_name,
		user_name: req.body.user_name,
		payer: req.body.payer,
		partial_amount: req.body.partial_amount
	};
	Database.insert(
		"housemates",
		"pays",
		newPay,
		function(model) {
			res.redirect('bills');
		}
	);
};

exports.getPays = function(req, res) {
	console.log("GETTING ALL PAYMENTS..");
	data = {
		pay_to_me : [],
        my_payments : [],
        their_payments : []
    };
	my_name = this_user.first_name + " " + this_user.last_name
	Database.find("housemates","pays","", function(model) {
		model.forEach(function(pay) {
			if (pay.payer == my_name || pay.user_name == my_name) {
				if(pay.payer == my_name){
					data["my_payments"].push(pay)
				}
				else{
					data["pay_to_me"].push(pay)
				}
			} else{
				data["their_payments"].push(pay)
			}
		})
		res.send(data)
	})
}