// squawk.js -- functions for squawk codes

function generateSquawk() {
    // generates a valid squawk code, excluding reserved codes
    let code = "1200";
    while (!isValidSquawk(code)) {
        code = Math.ceil(Math.random() * 7).toString();
        code += Math.ceil(Math.random() * 7).toString();
        code += Math.ceil(Math.random() * 7).toString();
        code += Math.ceil(Math.random() * 7).toString();
    }
    return code;
}

function isValidSquawk(code) {
    // checks if a squawk code is valid by comparing it to a list of reserved codes
    if (typeof code != "string" || code.slice(-2) == "00") {
        // all codes ending in 00 are reserved
        return false;
    }
    const RESERVED_CODES = [21, 22, 25, 33, 500, 600, 700, 1200, 5061, 5062, 7001, 7004, 7615];
    let code_as_int = Number(code);
    if (code_as_int < 0 || code_as_int > 7777) {
        // range check
        return false;
    }
    if (RESERVED_CODES.includes(code_as_int)) {
        return false;
    }
    if ((41 <= code_as_int && code_as_int <= 57)
        || (100 <= code_as_int && code_as_int <= 700)
        || (1200 <= code_as_int && code_as_int <= 1277)
        || (4400 <= code_as_int && code_as_int <= 4477)
        || (7501 <= code_as_int && code_as_int <= 7577))
    {
        return false;
    }
    return true;
}
