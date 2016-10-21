
export enum BasicPropertyType {
    String,
    Int,
    URL
}

export class EnumCase {
    constructor(public caseName: string,
                public caseString: string) {}
}

function legalVarName(checkedVarName: string) : string {
    return checkedVarName.replace(/ /g,'');
}

abstract class BasicProperty {
    constructor(public varName: string,
                public isOptional: boolean,
                public jsonKeyPath?: string) {
        this.varName = legalVarName(varName);
        this.isOptional = isOptional;
        this.jsonKeyPath = jsonKeyPath || varName;
    }
}

export class NonObjectProperty extends BasicProperty {
    propertyType: BasicPropertyType;

    constructor(varName: string, isOptional: boolean, propertyType: BasicPropertyType, jsonKeyPath?: string) {
        super(varName, isOptional, jsonKeyPath);
        this.propertyType = propertyType;
    }
}

export class EnumProperty extends BasicProperty {
    enumOptions: EnumCase[]
    enumName: string

    constructor(varName: string, isOptional: boolean, enumOptions: EnumCase[], enumName: string, jsonKeyPath?: string) {
        super(varName, isOptional, jsonKeyPath);
        this.enumOptions = enumOptions;
        this.enumName = enumName;
    }
}

export class ObjectProperty extends BasicProperty {
    objectName: string

    constructor(varName: string, isOptional: boolean, objectName: string, jsonKeyPath?: string) {
        super(varName, isOptional, jsonKeyPath);
        this.objectName = objectName;
    }
}


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


class PropertyCode {
    constructor(public variableCode: string,
                public deserializationCode: string,
                public enumCode?: string) {}

    toString() {
        return [this.variableCode, this.deserializationCode, this.enumCode].join(", ");
    }
}

function generateGlossProperty(propertyDefinition: BasicProperty) : PropertyCode {
    let optionalCode = propertyDefinition.isOptional ? "?" : "";
    let propertyTypeCode = swiftTypeOfPropertyDefinition(propertyDefinition);
    let variableCode = `let ${propertyDefinition.varName}: ${propertyTypeCode}${optionalCode}`;
    let deserializationCode = `self.${propertyDefinition.varName} = "${propertyDefinition.jsonKeyPath}" <~~ json`

    let enumCode: string;
    if (propertyDefinition instanceof EnumProperty) {
        let enumProperty = <EnumProperty>propertyDefinition;
        enumCode = swiftEnumCodeOfEnumNameAndEnumCases(enumProperty.enumName, enumProperty.enumOptions);
    }

    return new PropertyCode(variableCode, deserializationCode, enumCode);
}

function swiftTypeOfPropertyDefinition(propertyDefinition: BasicProperty) : string {
    if (propertyDefinition instanceof NonObjectProperty) {
        let nonObjectProperty = <NonObjectProperty>propertyDefinition;
        switch (nonObjectProperty.propertyType) {
            case BasicPropertyType.String: return "String";
            case BasicPropertyType.Int: return "Int";
            case BasicPropertyType.URL: return "URL";
        }
    }



    if (propertyDefinition instanceof EnumProperty) {
        let enumProperty = <EnumProperty>propertyDefinition;
        return enumProperty.enumName;
    }

    if (propertyDefinition instanceof ObjectProperty) {
        let objectProperty = <ObjectProperty>propertyDefinition;
        return objectProperty.objectName;
    }

    return null;
}

function swiftEnumCodeOfEnumNameAndEnumCases(enumName: string, enumCases: EnumCase[]) : string {
    var casesCode = enumCases.map(function (enumCase: EnumCase) {
        return `\tcase ${enumCase.caseName} = "${enumCase.caseString}"`;
    }).join("\n");
    return [`enum ${enumName}: String {`, casesCode, "}"].join("\n");
}