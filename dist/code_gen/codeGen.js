"use strict";
var glossGen_1 = require("./glossGen");
function generateCodeWithOptions(codeDefenitions) {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");
    return codeDefenitions.map(function (propertyDef) {
        return glossGen_1.generateGlossProperty(propertyDef).toString();
    }).join("\n");
}
exports.generateCodeWithOptions = generateCodeWithOptions;
