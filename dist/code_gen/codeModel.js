"use strict";
var PropertyCode = (function () {
    function PropertyCode(variableCode, deserializationCode, enumCode) {
        this.variableCode = variableCode;
        this.deserializationCode = deserializationCode;
        this.enumCode = enumCode;
    }
    PropertyCode.prototype.toString = function () {
        return [this.variableCode, this.deserializationCode, this.enumCode].join(", ");
    };
    return PropertyCode;
}());
exports.PropertyCode = PropertyCode;
