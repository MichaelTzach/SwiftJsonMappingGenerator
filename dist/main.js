"use strict";
var codeGen_1 = require('./code_gen/codeGen');
var propertyModel_1 = require("./code_gen/propertyModel");
// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");
var testStringProperty1 = new propertyModel_1.NonObjectProperty("variable with", true, propertyModel_1.BasicPropertyType.Int);
var enumCasesTest1 = [new propertyModel_1.EnumCase("caseName1", "caseName1String")];
var testEnumProperty1 = new propertyModel_1.EnumProperty("enumName", false, enumCasesTest1, "enumObjectName");
var jsonStringProp = [testStringProperty1, testEnumProperty1];
var x = codeGen_1.generateCodeWithOptions(jsonStringProp);
console.log(x);
