import { generateCodeWithOptions, StringProperty } from './code_gen/codeGen';

// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");

let jsonStringProp = [new StringProperty("some", "other")];

let x = generateCodeWithOptions(jsonStringProp);
console.log(x);