
import isIdentifierStart = ts.isIdentifierStart;
enum PropertyType {
    String,
    Object,
    Enum,
    Int,
    URL
}

class EnumCase {
    constructor(public caseName,
                public caseString) {}
}

interface JsonProperty {
    varName: string
    jsonKeyPath: string
    isOptional: boolean
    propertyType: PropertyType
    enumOptions?: [EnumCase]
}

function legalVarName(checkedVarName: string) : string {
    return checkedVarName.replace(/ /g,'');
}

export class NonEnumProperty implements JsonProperty{
    varName: string
    jsonKeyPath: string
    isOptional: boolean
    propertyType: PropertyType

    constructor(varName: string, isOptional: boolean, jsonKeyPath?: string, propertyType: PropertyType) {
        this.varName = legalVarName(varName);
        this.isOptional = isOptional;
        this.jsonKeyPath = jsonKeyPath || varName;
        this.propertyType = propertyType;
    }
}

export class EnumProperty extends NonEnumProperty{
    enumOptions: [EnumCase]

    constructor(varName: string, isOptional: boolean, jsonKeyPath?: string, propertyType: PropertyType, enumOptions: [EnumCase]) {
        super(varName, isOptional, jsonKeyPath, propertyType);
        this.enumOptions = enumOptions;
    }
}


export function generateCodeWithOptions(codeDefenitions : JsonProperty[]) : string {
    // return codeDefenitions.map(function (propertyDefinition: JsonProperty) {
    //     return Object.keys(propertyDefinition).map(function(key: string) {
    //         return key.toString() + ": " + propertyDefinition[key].toString();
    //     }).join(", ");
    // }).join("\n");

    return codeDefenitions.map(function (propertyDef: JsonProperty) {
        return generateGlossProperty(propertyDef).toString();
    }).join("\n");
}


class PropertyCode {
    constructor(public variableCode: string,
                public deserializationCode: string,
                public enumCode?: string) {}

    toString() {
        return [this.variableCode, this.deserializationCode, this.enumCode].join(", ");
    }
}

function generateGlossProperty(propertyDefinition: JsonProperty) : PropertyCode {
    if (propertyDefinition instanceof NonEnumProperty) {
        let nonEnumPropertyDefinition = <NonEnumProperty>propertyDefinition;
        return generateGlossNonEnumProperty(nonEnumPropertyDefinition);
    }
    if (propertyDefinition instanceof EnumProperty) {
        let enumPropertyDefinition = <EnumProperty>propertyDefinition;
        return generateGlossEnumProperty(enumPropertyDefinition);
    }

    return new PropertyCode("fault", "something = something");
}

function swiftTypeOfPropertyType(propertyType: PropertyType, ) : string {
    switch propertyType {
        case PropertyType.String: return "String";
        case PropertyType.Enum: return null;
        case PropertyType.Int: return "Int";
        case PropertyType.Object
    }
    return null;
}

function generateGlossNonEnumProperty(propertyDefinition: NonEnumProperty) : PropertyCode {
    let optionalCode = propertyDefinition.isOptional ? "?" : "";
    let variableCode = `let ${propertyDefinition.varName}: ${propertyDefinition.}${optionalCode}`;
    let deserializationCode = `self.${propertyDefinition.varName} = "${propertyDefinition.jsonKeyPath} <~~ json"`
    return new PropertyCode(variableCode, deserializationCode);
}

function generateGlossEnumProperty(propertyDefinition: EnumProperty) : PropertyCode {
    let optionalCode = propertyDefinition.isOptional ? "?" : "";
    let variableCode = `let ${propertyDefinition.varName}: String${optionalCode}`;
    let deserializationCode = `self.${propertyDefinition.varName} = "${propertyDefinition.jsonKeyPath} <~~ json"`
    return new PropertyCode(variableCode, deserializationCode);
}

// console.log()