var billInp = document.querySelector('.billInp');
var tippctInp = document.querySelector('.tippctInp');
var tipInp = document.querySelector('.tipInp');
var totalInp = document.querySelector('.totalInp');
var calculateBtn = document.querySelector('.calculateBtn');

calculateBtn.addEventListener('click', function() {
    bill = Number(billInp.value);
    tippct = Number(tippctInp.value);

    // values must be a finite number
    if (!Number.isFinite(bill) |
        !Number.isFinite(tippct)) {
        alert("Your inputs are not correct!");
    }

    tip = round((tippct / 100) * bill);
    total = round(bill + tip);

    tipInp.value = tip.toFixed(2);
    totalInp.value = total.toFixed(2);

    // defocus button
    window.focus()
});


// Rounding function
//
// Rounding is complicated in javascript, as many
// problems may arise from the floating-point approximations
//
// This function below is from an algorithm stolen from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Decimal_rounding
//
// It will round values to 2 decimal places
//
function round(value) {
    // 2 decimal places
    exp = -2;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
