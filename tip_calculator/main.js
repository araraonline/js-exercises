var billInp = document.querySelector('.billInp');
var tippctInp = document.querySelector('.tippctInp');
var tipInp = document.querySelector('.tipInp');
var totalInp = document.querySelector('.totalInp');
var calculateBtn = document.querySelector('.calculateBtn');

calculateBtn.addEventListener('click', function() {
    bill = Number(billInp.value);
    tippct = Number(tippctInp.value);

    tip = tippct * bill / 100;
    total = tip + bill;

    tipInp.value = String(tip);
    totalInp.value = String(total);

    // defocus button
    window.focus()
});
