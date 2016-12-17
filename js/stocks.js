var stocks = ["OPXAAA", "AAPL", "ZEN", "MSFT", "GOOG", "NFLX", "TSLA"];

$(document).ready(function () {
    for (var i = 0; i < stocks.length; i++) {
        var name = stocks[i];
        JSON.stringify(name);
        name.replace(/"/g, '');
        console.log(name);
        $.ajax({
            type: 'GET'
            , dataType: 'JSON'
            , url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + name
            , success: function (response, name) {
                loadStocks(response, name);
            }
            , error: function (response) {
                $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });
    }

    // Update stock prices every 7 seconds
    //setInterval(refreshStockPrices, 1000);
});

// Initial load of stocks data into table
function loadStocks(response, name) {
    if (response.Symbol == undefined) {
        $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
    } else {
        $('#stocks').append('<tr><td>' + response.Symbol + '</td><td>$' + response.LastPrice + '</td></tr>');
    }
}

// Update stock prices
function refreshStockPrices() {
    $('tr').remove();
    for (var i = 0; i < stocks.length; i++) {
        var name = stocks[i];
        JSON.stringify(name);
        name.replace(/"/g, '');
        console.log(name);
        $.ajax({
            type: 'GET'
            , dataType: 'JSON'
            , url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + name
            , success: function (response, name) {
                loadStocks(response, name);
            }
            , error: function (response) {
                $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });
    }
}

// Add stock names to stocks array
function addStockName(name) {
    stocks[stocks.length] = name;
};