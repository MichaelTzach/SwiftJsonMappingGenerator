"use strict";
var codeGen_1 = require('./code_gen/codeGen');
var parser_1 = require("./parser/parser");
// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");
// let testStringProperty1 = new NonObjectProperty("variable with", true, BasicPropertyType.Int);
// let enumCasesTest1 = [new EnumCase("caseName1", "caseName1String")];
// let testEnumProperty1 = new EnumProperty("enumName", false, enumCasesTest1, "enumObjectName");
// let jsonStringProp = [testStringProperty1, testEnumProperty1];
// let stringProperty1 = createNonObjectProperty({
//     varName: "variable1",
//     isOptional: true,
//     propertyType: "int",
//     jsonKeyPath: "variable1KeyPath"
// });
//
// let jsonStringProp = [stringProperty1];
//
// let x = generateCodeWithOptions("ObjectName1", "c", jsonStringProp);
// console.log(x);
var genOptions = parser_1.jsonToParsingOptions({
    objectName: "Object1",
    type: "struct",
    properties: [
        {
            varName: "var 1",
            isOptional: true,
            propertyType: "string",
            jsonKeyPath: "jsonKeyPath"
        }
    ]
});
// console.log(genOptions)
var x = codeGen_1.generateCodeWithOptions(genOptions);
console.log(x);
