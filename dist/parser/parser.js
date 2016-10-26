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
    var prop2 = jsonProperties[1];
    var propDef2 = codeGen_1.createEnumProperty({
        varName: prop.varName,
        isOptional: prop.isOptional,
        enumCases: [["case1", "case1value"]],
        enumName: "EnumName"
    });
    if (!propDef) {
        return null;
    }
    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: [propDef2]
    };
}
exports.jsonToParsingOptions = jsonToParsingOptions;
