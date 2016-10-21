"use strict";
var codeGen_1 = require('./code_gen/codeGen');
// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");
var jsonStringProp = [new codeGen_1.StringProperty("some", "other")];
var x = codeGen_1.generateCodeWithOptions(jsonStringProp);
console.log(x);
