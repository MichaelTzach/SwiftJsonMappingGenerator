
enum PropertyType {
    String
}

interface JsonProperty {
    varName: string,
    jsonKeyPath: string,
    type: PropertyType
}

export class StringProperty implements JsonProperty{
    jsonKeyPath: string;
    type: PropertyType;

    constructor(public varName: string, jsonKeyPath?: string) {
        this.jsonKeyPath = jsonKeyPath || varName;
        this.type = PropertyType.String;
    }
}


export function generateCodeWithOptions(codeDefenitions : JsonProperty[]) : string {
    return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
        return [propertyDefinition.varName, propertyDefinition.jsonKeyPath, propertyDefinition.type].join(", ")
    }).join(",");
}