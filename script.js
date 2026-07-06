let transaction = 0;

document.getElementById('waterbill').addEventListener('submit', function(e) {
 e.preventDefault();

//VALIDATE INPUT FIELDS
let inputFields = ['name', 'consumption', 'customer'];
let isValid = true;

for(let field of inputFields) {
    let value = document.getElementById(field).value.trim();
    if(value === '') {
        alert(`All fields are required`);
        isValid = false;
        break;
    }
}

if(!isValid) return;


transaction++;


let consumption = document.getElementById('consumption').value;
let cubicMeter = 0;

if (!isNaN(consumption)){
    alert("Water Consumption input is invalid")
}

if(consumption >=  1 &&  consumption<= 20){
    cubicMeter = 25.00
}
else if (consumption >=  21 &&  consumption<=40){
    cubicMeter = 35.00
}else if (consumption >=  41 &&  consumption<= 60){
    cubicMeter = 45.00
}else if (consumption >= 60){
    cubicMeter = 60.00
}else {
    alert("Water Consumption input is invalid")
}





let total = consumption * cubicMeter;//TOTAL AMOUNT


let customer = document.getElementById('customer').value;

let discount = 0;

switch(customer){   
    case "Regular":
        discount = 0;
        break;
    case "Senior Citizen":
        discount = total * 0.25;
        break;
    case "Solo Parent":
        discount = total * 0.15;
        break;
    default:
        alert("Amount unknown");
        break;

}



//OUTPUT
document.getElementById('transactionCount').innerText = transaction;

let finalAmount = total - discount;
document.getElementById('totalAmount').innerText = total.toFixed(2);
document.getElementById('discountAmount').innerText = discount.toFixed(2);
document.getElementById('finalAmount').innerText = finalAmount.toFixed(2);



//RESET BUTTON
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('totalAmount').innerText = '0.00';
    document.getElementById('discountAmount').innerText = '0.00';
    document.getElementById('finalAmount').innerText = '0.00';
});




//RECORD SUBMISSION TO GOOGLE SHEETS
let customerName = document.getElementById('name').value;
let record = {
    name: customerName,
    consumption: consumption,
    customer: customer,
    finalAmount: finalAmount.toFixed(2),
    discountAmount: discount.toFixed(2)
};
recordSubmission(record);

});

function recordSubmission(record) {
 fetch('https://script.google.com/macros/s/AKfycbwhhvelKGyETI8zKkFOg3bPISsaqRZPoMuqbbge1HfT643zDL9vrITjDmORXraWbSY9cg/exec', {
 method: 'POST',
 body: JSON.stringify(record)
 }).catch(err => console.error('Could not record submission:', err));
}

