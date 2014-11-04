$(function() {
	getBills()
})

function getBills() {
	console.log("running getBills in script_bill.js");
	$.ajax({
		url: "getBills",
		type: "get",
		data: {},
		success: function(bills) {
			if (bills.length == 0){
				message = "There are currently no bills in the system."
				$("#all-bills").html(message)
			} else {
				$.ajax({
					url: "getPays",
					type: "get",
					data: {},
					success: function(pays){
						console.log(pays)
						pay_to_me = pays["pay_to_me"]
						my_payments = pays["my_payments"]
						their_payments = pays["their_payments"]
						// console.log("Parsing My ") 
						pay_me_message = parsePayments(pay_to_me, bills)
						my_message = parsePayments(my_payments, bills)
						their_message = parsePayments(their_payments, bills)
						
						if (pay_me_message.length != "") {
							$("#pay-to-me").html(pay_me_message)
						} else{ 
							$("#pay-to-me").html("You don't have any payments.")
						}
						if (my_message.length != "") {
							$("#my-payments").html(my_message)
						} else{ 
							$("#my-payments").html("You don't have any bills assigned to you.")
						}
						if (their_message.length != ""){
							$("#their-payments").html(their_message)
						} else{
							$("#their-payments").html("No on else has to pay any bills.")
						}
					} 
				})
			}
		}
	}); 
	return false;
}

function parsePayments( pays, bills) {
	message = ""
	pays.forEach(function(p) {
		bill_name = p.bill_name
		console.log(p)
		bills.forEach(function(bill) {
			if (bill.bill_name == bill_name) {
				date = new Date(bill.date).toDateString()
				message += p.payer + " owes " + p.user_name + " $" + p.partial_amount + " for " + bill.bill_name + " bill <br>"
			}
		})
	})
	return message
}