"use strict";
function legalVarName(checkedVarName) {
    return checkedVarName.replace(/ /g, '');
}
var StringProperty = (function () {
    function StringProperty(varName, isOptional, jsonKeyPath) {
        this.isOptional = isOptional;
        this.varName = legalVarName(varName);
        this.jsonKeyPath = jsonKeyPath || varName;
    }
    return StringProperty;
}());
exports.StringProperty = StringProperty;
function generateCodeWithOptions(codeDefenitions) {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");
    return codeDefenitions.map(function (propertyDef) {
        return generateGlossProperty(propertyDef).toString();
    }).join("\n");
}
exports.generateCodeWithOptions = generateCodeWithOptions;
var PropertyCode = (function () {
    function PropertyCode(variableCode, deserializationCode, enumCode) {
        this.variableCode = variableCode;
        this.deserializationCode = deserializationCode;
        this.enumCode = enumCode;
    }
    PropertyCode.prototype.toString = function () {
        return [this.variableCode, this.deserializationCode].join(", ");
    };
    return PropertyCode;
}());
function generateGlossProperty(propertyDefinition) {
    if (propertyDefinition instanceof StringProperty) {
        var stringPropertyDefinition = propertyDefinition;
        return generateGlossStringProperty(stringPropertyDefinition);
    }
    return new PropertyCode("fault", "something = something");
}
function generateGlossStringProperty(propertyDefinition) {
    var optionalCode = propertyDefinition.isOptional ? "?" : "";
    var variableCode = "let " + propertyDefinition.varName + ": String" + optionalCode;
    var deserializationCode = "self." + propertyDefinition.varName + " = \"" + propertyDefinition.jsonKeyPath + " <~~ json\"";
    return new PropertyCode(variableCode, deserializationCode);
}
// console.log() 
