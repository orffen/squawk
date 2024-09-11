// tod.js -- functions for top of descent calculations

function tod_calc_distance(current, target, angle) {
    // Calculate the distance required for a given descent angle from a current to a target altitude.
    if (typeof current != "number" || typeof target != "number" || typeof angle != "number") {
        return 0;
    }
    const ft_in_nm = 6076;
    // work with both '000s of feet or FLs
    current = current > 1000 ? current : current * 1000;
    target = target > 1000 ? target : target * 1000;
    if (target >= current) {
        return 0;
    }
    return (current - target) / (Math.tan(angle * (Math.PI / 180)) * ft_in_nm);
}

function tod_calc_rate(ground_speed, angle) {
    // Calculate the required descent rate in feet-per-minute for a given angle of descent.
    if (typeof ground_speed != "number" || typeof angle != "number" || ground_speed < 0) {
        return 0;
    }
    return ground_speed * Math.tan(angle * (Math.PI / 180)) * 60;
}
