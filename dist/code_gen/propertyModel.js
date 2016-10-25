"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (BasicPropertyType) {
    BasicPropertyType[BasicPropertyType["String"] = 1] = "String";
    BasicPropertyType[BasicPropertyType["Int"] = 2] = "Int";
    BasicPropertyType[BasicPropertyType["URL"] = 3] = "URL";
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
var BasicProperty = (function () {
    function BasicProperty(varName, isOptional, jsonKeyPath) {
        this.varName = varName;
        this.isOptional = isOptional;
        this.jsonKeyPath = jsonKeyPath;
        this.varName = varName;
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
