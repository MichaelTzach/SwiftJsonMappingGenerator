import {PropertyDefinition} from "./propertyModel";
import {generateGlossProperty} from "./glossGen";

export function generateCodeWithOptions(codeDefenitions : PropertyDefinition[]) : string {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");

    return codeDefenitions.map(function (propertyDef: PropertyDefinition) {
        return generateGlossProperty(propertyDef).toString();
    }).join("\n");
}




