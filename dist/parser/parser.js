"use strict";
var codeGen_1 = require("../code_gen/codeGen");
function jsonToParsingOptions(json) {
    //Get json object name
    if (!json.objectName || (typeof json.objectName !== "string")) {
        return null;
    }
    var jsonObjectName = json.objectName;
    //Get json object type
    if (!json.type || (typeof json.type !== "string")) {
        return null;
    }
    var jsonType = json.type;
    //Get json property definitions
    if (!json.properties || !(json.properties instanceof Array)) {
        return null;
    }
    var jsonProperties = json.properties;
    var propertyDefinitions = jsonProperties.map(propertyJsonToPropertyDefinition);
    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: propertyDefinitions
    };
}
exports.jsonToParsingOptions = jsonToParsingOptions;
function propertyJsonToPropertyDefinition(json) {
    if (!json.hasOwnProperty("varName") || (typeof json.varName !== "string")) {
        return null;
    }
    var varName = json.varName;
    if (!json.hasOwnProperty("isOptional") || (typeof json.isOptional !== "boolean")) {
        return null;
    }
    var isOptional = json.isOptional;
    if (!json.hasOwnProperty("jsonKeyPath") || (typeof json.jsonKeyPath !== "string")) {
        return null;
    }
    var jsonKeyPath = json.jsonKeyPath;
    if (json.hasOwnProperty("objectName") && (typeof json.objectName === "string")) {
        var jsonObjectName = json.objectName;
        return codeGen_1.createObjectProperty({
            varName: varName,
            isOptional: isOptional,
            jsonKeyPath: jsonKeyPath,
            objectName: jsonObjectName
        });
    }
    if (json.hasOwnProperty("enumName") && (typeof json.enumName === "string") &&
        json.hasOwnProperty("enumCases") && (typeof json.enumCases === "object")) {
        var enumName = json.enumName;
        var enumCasesKeys = Object.keys(json.enumCases);
        var enumCasesObjects = enumCasesKeys.reduce(function (preiousObjectArray, currentKey) {
            //todo: check if value is string, else throw
            return preiousObjectArray.concat([[currentKey, json.enumCases[currentKey]]]);
        }, []);
        return codeGen_1.createEnumProperty({
            varName: varName,
            isOptional: isOptional,
            jsonKeyPath: jsonKeyPath,
            enumName: enumName,
            enumCases: enumCasesObjects
        });
    }
    return null;
}
