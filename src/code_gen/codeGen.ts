import {BasicProperty} from "./propertyModel";
import {generateGlossProperty} from "./glossGen";

export function generateCodeWithOptions(codeDefenitions : BasicProperty[]) : string {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");

    return codeDefenitions.map(function (propertyDef: BasicProperty) {
        return generateGlossProperty(propertyDef).toString();
    }).join("\n");
}




