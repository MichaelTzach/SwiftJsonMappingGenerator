import {GenerateCodeOptions, createNonObjectProperty, createEnumProperty, createObjectProperty} from "../code_gen/codeGen";
import {PropertyDefinition} from "../code_gen/propertyModel";

export function jsonToParsingOptions(json: any) :GenerateCodeOptions {
    //Get json object name
    if (!json.objectName || (typeof json.objectName !== "string")) {
        return null;
    }
    let jsonObjectName = <string>json.objectName;

    //Get json object type
    if (!json.type|| (typeof json.type !== "string")) {
        return null;
    }
    let jsonType = <string>json.type;

    //Get json property definitions
    if (!json.properties || !(json.properties instanceof Array)) {
        return null;
    }
    let jsonProperties = <any[]>json.properties;

    let propertyDefinitions = jsonProperties.map(propertyJsonToPropertyDefinition);

    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: propertyDefinitions
    }
}

function propertyJsonToPropertyDefinition(json: any) :PropertyDefinition {
    if (!json.hasOwnProperty("varName") || (typeof json.varName !== "string")) { return null; }
    let varName = <string>json.varName;

    if (!json.hasOwnProperty("isOptional") || (typeof json.isOptional !== "boolean")) { return null; }
    let isOptional = <boolean>json.isOptional;

    if (!json.hasOwnProperty("jsonKeyPath") || (typeof json.jsonKeyPath !== "string")) { return null; }
    let jsonKeyPath = <string>json.jsonKeyPath;

    if (json.hasOwnProperty("objectName") && (typeof json.objectName === "string")) {
        let jsonObjectName = <string>json.objectName;
        return createObjectProperty({
            varName: varName,
            isOptional: isOptional,
            jsonKeyPath: jsonKeyPath,
            objectName: jsonObjectName
        })
    }

    if (json.hasOwnProperty("enumName") && (typeof json.enumName === "string") &&
        json.hasOwnProperty("enumCases") && (typeof json.enumCases === "object")) {
        let enumName = <string>json.enumName;
        let enumCasesKeys = Object.keys(json.enumCases);
        let enumCasesObjects = enumCasesKeys.reduce( (preiousObjectArray, currentKey) => {
            //todo: check if value is string, else throw
            return preiousObjectArray.concat([[currentKey, json.enumCases[currentKey]]]);
        }, []);
        return createEnumProperty({
            varName: varName,
            isOptional: isOptional,
            jsonKeyPath: jsonKeyPath,
            enumName: enumName,
            enumCases: enumCasesObjects
        });
    }



    return null;
}