import { generateCodeWithOptions } from './code_gen/codeGen';
import {BasicPropertyType, NonObjectProperty, EnumCase, EnumProperty} from "./code_gen/propertyModel";

// function hello(compiler: string) {
//   console.log(`Hello from2 ${compiler}`);
// }
// hello("TypeScript");

let testStringProperty1 = new NonObjectProperty("variable with", true, BasicPropertyType.Int);

let enumCasesTest1 = [new EnumCase("caseName1", "caseName1String")];
let testEnumProperty1 = new EnumProperty("enumName", false, enumCasesTest1, "enumObjectName");

let jsonStringProp = [testStringProperty1, testEnumProperty1];

let x = generateCodeWithOptions(jsonStringProp);
console.log(x);