// ui.js -- UI functions

function squawkCodeButton() {
    document.getElementById("squawkCode").textContent = generateSquawk();
}

function icaoButton() {
    const proxyUrl = "https://corsproxy.io/?"; // required for CORS, need a better solution
    const apiUrl = "https://aviationweather.gov/api/data/metar?taf=true&ids=";
    const regex = /\s+/g;
    let params = document.getElementById("icaoInput").value.replace(regex, ",");
    document.getElementById("icaoInput").value = params;
    fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}${params}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
    })
    .then((text) => {
        document.getElementById("metar").value = text;
    })
    .catch((error) => {
        document.getElementById("metar").value = error;
    });
}

function icaoInput() {
    document.getElementById("icaoInput").value = document.getElementById("icaoInput").value.toUpperCase();
}

function updateTOD() {
    let tod_values = {
        angle: Number(document.getElementById("todAngle").value),
        ground_speed: Number(document.getElementById("todGroundSpeed").value),
        current_altitude: Number(document.getElementById("todCurrentAlt").value),
        target_altitude: Number(document.getElementById("todTargetAlt").value)
    };
    let fpm = tod_calc_rate(tod_values.ground_speed, tod_values.angle);
    let distance = tod_calc_distance(tod_values.current_altitude, tod_values.target_altitude, tod_values.angle);
    fpm > 0 ? document.getElementById("todDescentRate").innerText = `${fpm.toFixed(0)} fpm` : document.getElementById("todDescentRate").innerHTML = "&nbsp;";
    distance > 0 ? document.getElementById("todDistanceReq").innerText = `${distance.toFixed(1)} nm` : document.getElementById("todDistanceReq").innerHTML = "&nbsp;";
}


squawkCodeButton(); // generate a random Squawk code immediately on load

// when enter is pressed in the icao code list, retrieve METAR
document.getElementById("icaoInput").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        icaoButton();
        document.getElementById("icaoButton").focus();
    }
})
