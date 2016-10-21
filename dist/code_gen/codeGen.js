"use strict";
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["String"] = 0] = "String";
})(PropertyType || (PropertyType = {}));
var StringProperty = (function () {
    function StringProperty(varName, jsonKeyPath) {
        this.varName = varName;
        this.jsonKeyPath = jsonKeyPath || varName;
        this.type = PropertyType.String;
    }
    return StringProperty;
}());
exports.StringProperty = StringProperty;
function generateCodeWithOptions(codeDefenitions) {
    return codeDefenitions.map(function (propertyDefinition) {
        return [propertyDefinition.varName, propertyDefinition.jsonKeyPath, propertyDefinition.type].join(", ");
    }).join(",");
}
exports.generateCodeWithOptions = generateCodeWithOptions;
