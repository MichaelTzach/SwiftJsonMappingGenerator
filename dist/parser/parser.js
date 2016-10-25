"use strict";
var codeGen_1 = require("../code_gen/codeGen");
function jsonToParsingOptions(json) {
    if (!json.objectName || (typeof json.objectName !== "string")) {
        return null;
    }
    var jsonObjectName = json.objectName;
    if (!json.type || (typeof json.type !== "string")) {
        return null;
    }
    var jsonType = json.type;
    if (!json.properties || !(json.properties instanceof Array)) {
        return null;
    }
    var jsonProperties = json.properties;
    var prop = jsonProperties[0];
    var propDef = codeGen_1.createNonObjectProperty({
        varName: prop.varName,
        isOptional: prop.isOptional,
        propertyType: prop.propertyType,
        jsonKeyPath: prop.jsonKeyPath
    });
    if (!propDef) {
        return null;
    }
    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: [propDef]
    };
}
exports.jsonToParsingOptions = jsonToParsingOptions;
