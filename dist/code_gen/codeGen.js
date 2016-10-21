"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (BasicPropertyType) {
    BasicPropertyType[BasicPropertyType["String"] = 0] = "String";
    BasicPropertyType[BasicPropertyType["Int"] = 1] = "Int";
    BasicPropertyType[BasicPropertyType["URL"] = 2] = "URL";
})(exports.BasicPropertyType || (exports.BasicPropertyType = {}));
var BasicPropertyType = exports.BasicPropertyType;
var EnumCase = (function () {
    function EnumCase(caseName, caseString) {
        this.caseName = caseName;
        this.caseString = caseString;
    }
    return EnumCase;
}());
exports.EnumCase = EnumCase;
function legalVarName(checkedVarName) {
    return checkedVarName.replace(/ /g, '');
}
var BasicProperty = (function () {
    function BasicProperty(varName, isOptional, jsonKeyPath) {
        this.varName = varName;
        this.isOptional = isOptional;
        this.jsonKeyPath = jsonKeyPath;
        this.varName = legalVarName(varName);
        this.isOptional = isOptional;
        this.jsonKeyPath = jsonKeyPath || varName;
    }
    return BasicProperty;
}());
var NonObjectProperty = (function (_super) {
    __extends(NonObjectProperty, _super);
    function NonObjectProperty(varName, isOptional, propertyType, jsonKeyPath) {
        _super.call(this, varName, isOptional, jsonKeyPath);
        this.propertyType = propertyType;
    }
    return NonObjectProperty;
}(BasicProperty));
exports.NonObjectProperty = NonObjectProperty;
var EnumProperty = (function (_super) {
    __extends(EnumProperty, _super);
    function EnumProperty(varName, isOptional, enumOptions, enumName, jsonKeyPath) {
        _super.call(this, varName, isOptional, jsonKeyPath);
        this.enumOptions = enumOptions;
        this.enumName = enumName;
    }
    return EnumProperty;
}(BasicProperty));
exports.EnumProperty = EnumProperty;
var ObjectProperty = (function (_super) {
    __extends(ObjectProperty, _super);
    function ObjectProperty(varName, isOptional, objectName, jsonKeyPath) {
        _super.call(this, varName, isOptional, jsonKeyPath);
        this.objectName = objectName;
    }
    return ObjectProperty;
}(BasicProperty));
exports.ObjectProperty = ObjectProperty;
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
        return [this.variableCode, this.deserializationCode, this.enumCode].join(", ");
    };
    return PropertyCode;
}());
function generateGlossProperty(propertyDefinition) {
    var optionalCode = propertyDefinition.isOptional ? "?" : "";
    var propertyTypeCode = swiftTypeOfPropertyDefinition(propertyDefinition);
    var variableCode = "let " + propertyDefinition.varName + ": " + propertyTypeCode + optionalCode;
    var deserializationCode = "self." + propertyDefinition.varName + " = \"" + propertyDefinition.jsonKeyPath + "\" <~~ json";
    var enumCode;
    if (propertyDefinition instanceof EnumProperty) {
        var enumProperty = propertyDefinition;
        enumCode = swiftEnumCodeOfEnumNameAndEnumCases(enumProperty.enumName, enumProperty.enumOptions);
    }
    return new PropertyCode(variableCode, deserializationCode, enumCode);
}
function swiftTypeOfPropertyDefinition(propertyDefinition) {
    if (propertyDefinition instanceof NonObjectProperty) {
        var nonObjectProperty = propertyDefinition;
        switch (nonObjectProperty.propertyType) {
            case BasicPropertyType.String: return "String";
            case BasicPropertyType.Int: return "Int";
            case BasicPropertyType.URL: return "URL";
        }
    }
    if (propertyDefinition instanceof EnumProperty) {
        var enumProperty = propertyDefinition;
        return enumProperty.enumName;
    }
    if (propertyDefinition instanceof ObjectProperty) {
        var objectProperty = propertyDefinition;
        return objectProperty.objectName;
    }
    return null;
}
function swiftEnumCodeOfEnumNameAndEnumCases(enumName, enumCases) {
    var casesCode = enumCases.map(function (enumCase) {
        return "\tcase " + enumCase.caseName + " = \"" + enumCase.caseString + "\"";
    }).join("\n");
    return [("enum " + enumName + ": String {"), casesCode, "}"].join("\n");
}
