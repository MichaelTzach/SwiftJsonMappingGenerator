"use strict";
var glossGen_1 = require("./glossGen");
var swiftGen_1 = require("./swiftGen");
function generateCodeWithOptions(propertyDefinitions) {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");
    var codeDefinitions = propertyDefinitions.map(function (propertyDefinition) {
        return glossGen_1.generateGlossProperty(propertyDefinition);
    });
    // console.log(codeDefinitions);
    var createObjectOptions = new swiftGen_1.CreateObjectOptions("Repo", "Decdable", "init?(json: JSON)", codeDefinitions, swiftGen_1.ObjectGeneratorType.Class, ["Gloss"]);
    swiftGen_1.createSwiftObjectWithCodeDefinitions(createObjectOptions);
    return propertyDefinitions.map(function (propertyDef) {
        return glossGen_1.generateGlossProperty(propertyDef).toString();
    }).join("\n");
}
exports.generateCodeWithOptions = generateCodeWithOptions;
