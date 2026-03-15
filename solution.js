// Problem 1: The Strict Type Checker [NOVIO]
function checkVariable(input) {
    switch (typeof input) {
        case "string":
            return "This input is a string";
        case "number":
            return "This input is a number";
        case "boolean":
            return "This input is a boolean";
        case "bigint":
            return "This input is a bigint";
        case "undefined":
            return "This input is undefined";
        default:
            return "object";
    }
}