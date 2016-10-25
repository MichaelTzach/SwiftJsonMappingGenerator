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
        return propertyModel_1.BasicPropertyType[nonObjectProperty.propertyType];
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
        return addTabToEachNewLineInString("case " + enumCase.caseName + " = \"" + enumCase.caseString + "\"");
    }).join("\n");
    return [("enum " + enumName + ": String {"), casesCode, "}"].join("\n");
}
exports.swiftEnumCodeOfEnumNameAndEnumCases = swiftEnumCodeOfEnumNameAndEnumCases;
(function (ObjectGeneratorType) {
    ObjectGeneratorType[ObjectGeneratorType["Struct"] = 1] = "Struct";
    ObjectGeneratorType[ObjectGeneratorType["Class"] = 2] = "Class";
})(exports.ObjectGeneratorType || (exports.ObjectGeneratorType = {}));
var ObjectGeneratorType = exports.ObjectGeneratorType;
function addTabToEachNewLineInString(str, numberOfTabs) {
    var tabsString = "\t";
    if (numberOfTabs) {
        tabsString = tabsString.repeat(numberOfTabs);
    }
    return str.replace(/^/gm, tabsString);
}
function createSwiftObjectWithCodeDefinitions(options) {
    var importString = "\n";
    if (options.imports) {
        var importsWithImport = options.imports.map(function (importName) {
            return "import " + importName;
        });
        importString = importsWithImport.join("\n");
    }
    var objectTypeString = ObjectGeneratorType[options.type].toLowerCase();
    var objectStartString = objectTypeString + " " + options.objectName + ": " + options.objectImplements + " {";
    var varsString = options.codeDefinitions.map(function (codeDefinition) {
        return "\t" + codeDefinition.variableCode;
    }).join("\n");
    var enumString = options.codeDefinitions.map(function (codeDefinition) {
        return codeDefinition.enumCode && addTabToEachNewLineInString(codeDefinition.enumCode);
    }).filter(function (enumString) {
        return enumString;
    }).join("\n");
    var beforeInitMark = addTabToEachNewLineInString("// MARK: -Deserialization");
    var initStart = addTabToEachNewLineInString(options.initFunctionSigniture + " {");
    var initSequenceString = options.codeDefinitions.map(function (codeDefinition) {
        return addTabToEachNewLineInString(codeDefinition.deserializationCode, 2);
    }).join("\n");
    var initEnd = addTabToEachNewLineInString("}");
    var initString = [initStart,
        initSequenceString,
        initEnd].join("\n");
    var objectClose = "}\n";
    var objectCode = [importString,
        objectStartString,
        varsString,
        enumString,
        beforeInitMark,
        initString,
        objectClose].join("\n\n");
    return objectCode;
}
exports.createSwiftObjectWithCodeDefinitions = createSwiftObjectWithCodeDefinitions;
