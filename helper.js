// Helps you center a square.
function squCtr(x, y, size, num) {
    rect(size * ((floor(num / 2)) + x), size * ((floor(num / 2)) - y), size, size);
}

// Puts spaces in output.
function sp(n) {
    let htmlSpace = '&nbsp';
    let ss = "";
    for (i = 0; i < n; i++) {
        ss += htmlSpace
    }
    return ss;
}