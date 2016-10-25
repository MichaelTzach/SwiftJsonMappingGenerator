import {GenerateCodeOptions, createNonObjectProperty, createEnumProperty} from "../code_gen/codeGen";

export function jsonToParsingOptions(json: any) :GenerateCodeOptions {
    if (!json.objectName || (typeof json.objectName !== "string")) {
        return null;
    }
    let jsonObjectName = <string>json.objectName;

    if (!json.type|| (typeof json.type !== "string")) {
        return null;
    }
    let jsonType = <string>json.type;

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
        enumCases: ["case1", "case1value"],
        enumName: "EnumName"
    })

    if (!propDef) {
        return null;
    }

    return {
        objectName: jsonObjectName,
        type: jsonType,
        propertyDefinitions: [propDef]
    }
}