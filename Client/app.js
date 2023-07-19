function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = document.getElementById("uiBHK")
    var bathrooms = document.getElementById("uiBathrooms")
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "/api/predict_price";
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk.value,
        bath: bathrooms.value,
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>The estimated price of the desired house is " + data.estimated_price.toString() + " Lakh Rupees.</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "/api/location_names";
    $.get(url, function (data, status) {
        console.log("got response for location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;