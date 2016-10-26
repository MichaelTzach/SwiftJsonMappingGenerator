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


    let prop = jsonProperties[0];
    let propDef = createNonObjectProperty({
        varName: prop.varName,
        isOptional: prop.isOptional,
        propertyType: prop.propertyType,
        jsonKeyPath: prop.jsonKeyPath
    })

    let prop2 = jsonProperties[1];
    let propDef2 = createEnumProperty({
        varName: prop.varName,
        isOptional: prop.isOptional,
        enumCases: [["case1", "case1value"]],
        enumName: "EnumName"
    })

    if (!propDef) {
        return null;
    }

    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: [propDef2]
    }
}

function propertyJsonToPropertyDefinition(json: any) :PropertyDefinition {
    if (!json.hasOwnProperty("varName") || (typeof json.isOptional !== "string")) { return null; }
    let varName = <string>json.varName;
    if (!json.hasOwnProperty("isOptional") || (typeof json.isOptional !== "boolean")) { return null; }
    let isOptional = <boolean>json.isOptional;
    if (json.hasOwnProperty("jsonKeyPath") || (typeof json.isOptional !== "string")) { return null; }
    let jsonKeyPath = <string>json.jsonKeyPath;

    let propertyCreateOptions = { varName, isOptional, jsonKeyPath };

    if (json.hasOwnProperty("objectName") && (typeof json.objectName === "string")) {
        propertyCreateOptions["objectName"] = <string>json.objectName;
        return createObjectProperty({
            varName: json.varName,
            isOptional: json.isOptional,
            jsonKeyPath: json.jsonKeyPath,
            objectName: json.objectName
        })
    }

    return null;
}