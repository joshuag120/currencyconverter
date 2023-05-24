const API_KEY = 'iHIYv8/HkbrYZFQcdYNsmA==gl3FCZitoMnQhHak';

const CURRENCY_SYMBOLS = {
    'Choose a currency': '$',
    USD: '$',
    RUB: '₽',
    EUR: '€',
    JPY: '¥',
    GBP: '£',
    AUD: 'A$',
    CAD: 'CA$',
    CHF: '₣',
    CNY: '¥',
    HKD: 'HK$',
    NZD: 'NZ$',
    NIO: 'C$',
    SOS: 'Sh',
    INR: '₹',
    VES: 'Bs'
};

var amount = document.getElementById('amount-input');
var convert_from = document.getElementById('convert-from');
var convert_to = document.getElementById('convert-to');
var currency_symbol = document.getElementById('currency-symbol');
var current_currency_symbol = '$';

convert_from.addEventListener('change', function(event) {
    var selected = CURRENCY_SYMBOLS[event.target.value];
    currency_symbol.textContent = selected;
    
    // var selected = event.target.value;
    // console.log(selected);
    // if (selected !== 'Choose a currency') {
    //     console.log('not undef');
    //     current_currency_symbol = CURRENCY_SYMBOLS[selected];
        
    // } else { 
    //     console.log('undef, use dollar');
    //     current_currency_symbol = '$';
    // }
    // //BELOW DOESN'T WORK ONCE BUTTON IS PRESSED
    // let regex_str = Object.values(CURRENCY_SYMBOLS).map(symbol => "\\" + symbol).join('|');
    // let rg = new RegExp(`(${regex_str})`, 'g');
    // let n = amount.value;
    // amount.value = current_currency_symbol + n.replace(rg, '');
});

function get_currency_symbol(currency) {
    console.log(CURRENCY_SYMBOLS[currency]);
    return CURRENCY_SYMBOLS[currency];
}

function get_selected_value_to() {
    const dropdown = document.getElementById("convert-to");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedValue = selectedOption.value;
    return selectedValue;
}

function get_selected_value_from() {
    const dropdown = document.getElementById("convert-from");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedValue = selectedOption.value;
    return selectedValue;
}


function convert() {
    amount_val = amount.value;
    convert_from = get_selected_value_from(convert_from);
    convert_to = get_selected_value_to(convert_to);
    if (amount_val && convert_from !== 'Choose a currency' && convert_to !== 'Choose a currency') {
        let formatted_url = `https://api.api-ninjas.com/v1/convertcurrency?want=${convert_to}&have=${convert_from}&amount=${amount_val}`;
        console.log(formatted_url);
        fetch(formatted_url, {
            headers: {'X-Api-Key': API_KEY}
        }).then(response => {
            if (!response.ok) {
                throw new Error(`request failed with status ${response.status}`);
            }
            return response.json();
        }).then(data => {
            document.getElementById('converted-currency').textContent = get_currency_symbol(convert_to) + data['new_amount'];
        }).catch(error => {
            console.error('request failed:', error);
        })
    }
    
}