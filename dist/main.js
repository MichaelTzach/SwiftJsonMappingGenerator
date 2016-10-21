"use strict";
var codeGen_1 = require('./code_gen/codeGen');
// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");
var testStringProperty1 = new codeGen_1.StringProperty("string test 1", true, "string test 12");
var testStringProperty2 = new codeGen_1.StringProperty("string test 2", false);
var jsonStringProp = [testStringProperty1, testStringProperty2];
var x = codeGen_1.generateCodeWithOptions(jsonStringProp);
console.log(x);
