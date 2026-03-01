// ui.js -- UI functions

const elements = {
    icaoButton: document.getElementById("icaoButton"),
    icaoInput: document.getElementById("icaoInput"),
    metar: document.getElementById("metar"),
    squawkCode: document.getElementById("squawkCode"),
    todAngle: document.getElementById("todAngle"),
    todCurrentAlt: document.getElementById("todCurrentAlt"),
    todDescentRate: document.getElementById("todDescentRate"),
    todDistanceReq: document.getElementById("todDistanceReq"),
    todGroundSpeed: document.getElementById("todGroundSpeed"),
    todTargetAlt: document.getElementById("todTargetAlt"),
};

function squawkCodeButton() {
    elements.squawkCode.textContent = generateSquawk();
}

function icaoButton() {
    const proxyUrl = "https://corsproxy.io/?"; // required for CORS, need a better solution
    const apiUrl = "https://aviationweather.gov/api/data/metar?taf=true&ids=";
    const regex = /\s+/g;
    let params = elements.icaoInput.value.replace(regex, ",");
    elements.icaoInput.value = params;
    fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text();
        })
        .then((text) => {
            elements.metar.value = text;
        })
        .catch((error) => {
            elements.metar.value = error;
        });
}

function icaoInput() {
    elements.icaoInput.value = elements.icaoInput.value.toUpperCase();
}

function updateTOD() {
    let tod_values = {
        angle: Number(elements.todAngle.value),
        ground_speed: Number(elements.todGroundSpeed.value),
        current_altitude: Number(elements.todCurrentAlt.value),
        target_altitude: Number(elements.todTargetAlt.value),
    };
    let fpm = tod_calc_rate(tod_values.ground_speed, tod_values.angle);
    let distance = tod_calc_distance(tod_values.current_altitude, tod_values.target_altitude, tod_values.angle);
    fpm > 0
        ? (elements.todDescentRate.innerText = `${fpm.toFixed(0)} fpm`)
        : (elements.todDescentRate.innerHTML = "&nbsp;");
    distance > 0
        ? (elements.todDistanceReq.innerText = `${distance.toFixed(1)} nm`)
        : (elements.todDistanceReq.innerHTML = "&nbsp;");
}

squawkCodeButton(); // generate a random Squawk code immediately on load

// when enter is pressed in the icao code list, retrieve METAR
elements.icaoInput.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        icaoButton();
        elements.icaoButton.focus();
    }
});
