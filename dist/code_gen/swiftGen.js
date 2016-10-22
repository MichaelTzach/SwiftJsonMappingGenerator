"use strict";
var propertyModel_1 = require("./propertyModel");
function legalVarName(checkedVarName) {
    return checkedVarName.replace(/ /g, '');
}
function swiftLegalVarNameOfPropertyDefinition(propertyDefinition) {
    return legalVarName(propertyDefinition.varName);
}
exports.swiftLegalVarNameOfPropertyDefinition = swiftLegalVarNameOfPropertyDefinition;
function swiftTypeOfPropertyDefinition(propertyDefinition) {
    if (propertyDefinition instanceof propertyModel_1.NonObjectProperty) {
        var nonObjectProperty = propertyDefinition;
        switch (nonObjectProperty.propertyType) {
            case propertyModel_1.BasicPropertyType.String: return "String";
            case propertyModel_1.BasicPropertyType.Int: return "Int";
            case propertyModel_1.BasicPropertyType.URL: return "URL";
        }
    }
    if (propertyDefinition instanceof propertyModel_1.EnumProperty) {
        var enumProperty = propertyDefinition;
        return enumProperty.enumName;
    }
    if (propertyDefinition instanceof propertyModel_1.ObjectProperty) {
        var objectProperty = propertyDefinition;
        return objectProperty.objectName;
    }
    return null;
}
exports.swiftTypeOfPropertyDefinition = swiftTypeOfPropertyDefinition;
function swiftEnumCodeOfEnumNameAndEnumCases(enumName, enumCases) {
    var casesCode = enumCases.map(function (enumCase) {
        return "\tcase " + enumCase.caseName + " = \"" + enumCase.caseString + "\"";
    }).join("\n");
    return [("enum " + enumName + ": String {"), casesCode, "}"].join("\n");
}
exports.swiftEnumCodeOfEnumNameAndEnumCases = swiftEnumCodeOfEnumNameAndEnumCases;
