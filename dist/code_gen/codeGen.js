"use strict";
var propertyModel_1 = require("./propertyModel");
var glossGen_1 = require("./glossGen");
var swiftGen_1 = require("./swiftGen");
function basicPropertyTypeFromString(str) {
    switch (str.toLowerCase()) {
        case "nsstring":
        case "string":
            return propertyModel_1.BasicPropertyType.String;
        case "double":
        case "float":
        case "cgfloat":
        case "integer":
        case "int":
            return propertyModel_1.BasicPropertyType.Int;
        case "nsurl":
        case "url":
            return propertyModel_1.BasicPropertyType.URL;
    }
}
function createNonObjectProperty(options) {
    var propertyTypeEnum = basicPropertyTypeFromString(options.propertyType);
    if (!propertyTypeEnum) {
        return null;
    }
    return new propertyModel_1.NonObjectProperty(options.varName, options.isOptional, propertyTypeEnum, options.jsonKeyPath);
}
exports.createNonObjectProperty = createNonObjectProperty;
function objectGeneratorTypeFromString(str) {
    switch (str.toLowerCase()) {
        case "struct":
        case "s":
            return swiftGen_1.ObjectGeneratorType.Struct;
        case "class":
        case "c":
            return swiftGen_1.ObjectGeneratorType.Class;
    }
}
function generateCodeWithOptions(options) {
    var typeEnum = objectGeneratorTypeFromString(options.type);
    if (!typeEnum) {
        return null;
    }
    var codeDefinitions = options.propertyDefinitions.map(function (propertyDefinition) {
        return glossGen_1.generateGlossProperty(propertyDefinition);
    });
    var createObjectOptions = {
        objectName: options.objectName,
        objectImplements: glossGen_1.GlossConsts.objectImplements,
        initFunctionSigniture: glossGen_1.GlossConsts.initFunctionSigniture,
        codeDefinitions: codeDefinitions,
        type: typeEnum,
        imports: glossGen_1.GlossConsts.imports
    };
    return swiftGen_1.createSwiftObjectWithCodeDefinitions(createObjectOptions);
}
exports.generateCodeWithOptions = generateCodeWithOptions;
