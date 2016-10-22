import {PropertyDefinition} from "./propertyModel";
import {generateGlossProperty} from "./glossGen";
import {createSwiftObjectWithCodeDefinitions, ObjectGeneratorType, CreateObjectOptions} from "./swiftGen";

export function generateCodeWithOptions(propertyDefinitions : PropertyDefinition[]) : string {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");

    let codeDefinitions = propertyDefinitions.map( (propertyDefinition) => {
        return generateGlossProperty(propertyDefinition);
    })

    // console.log(codeDefinitions);

    let createObjectOptions = new CreateObjectOptions("Repo", "Decdable", "init?(json: JSON)", codeDefinitions, ObjectGeneratorType.Class, ["Gloss"]);

    createSwiftObjectWithCodeDefinitions(createObjectOptions);

    return propertyDefinitions.map(function (propertyDef: PropertyDefinition) {
        return generateGlossProperty(propertyDef).toString();
    }).join("\n");
}




