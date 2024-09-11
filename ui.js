// ui.js -- UI functions

function squawkCodeButton() {
    document.getElementById("squawkCode").textContent = generateSquawk();
}

squawkCodeButton();

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
