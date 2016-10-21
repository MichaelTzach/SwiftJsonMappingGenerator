"use strict";
var codeGen_1 = require('./code_gen/codeGen');
// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");
var testStringProperty1 = new codeGen_1.NonObjectProperty("variable with", true, codeGen_1.BasicPropertyType.Int);
var enumCasesTest1 = [new codeGen_1.EnumCase("caseName1", "caseName1String")];
var testEnumProperty1 = new codeGen_1.EnumProperty("enumName", false, enumCasesTest1, "enumObjectName");
var jsonStringProp = [testStringProperty1, testEnumProperty1];
var x = codeGen_1.generateCodeWithOptions(jsonStringProp);
console.log(x);
