import { generateCodeWithOptions, StringProperty } from './code_gen/codeGen';

// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");

let testStringProperty1 = new StringProperty("string test 1", true, "string test 12");
let testStringProperty2 = new StringProperty("string test 2", false);

let jsonStringProp = [testStringProperty1, testStringProperty2];

let x = generateCodeWithOptions(jsonStringProp);
console.log(x);