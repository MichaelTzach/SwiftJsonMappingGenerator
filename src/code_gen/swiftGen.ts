import {
    PropertyDefinition, NonObjectProperty, BasicPropertyType, EnumProperty, ObjectProperty,
    EnumCase
} from "./propertyModel";

function legalVarName(checkedVarName: string) : string {
    return checkedVarName.replace(/ /g,'');
}

export function swiftLegalVarNameOfPropertyDefinition(propertyDefinition: PropertyDefinition) : string {
    return legalVarName(propertyDefinition.varName);
}

export function swiftTypeOfPropertyDefinition(propertyDefinition: PropertyDefinition) : string {
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

export function swiftEnumCodeOfEnumNameAndEnumCases(enumName: string, enumCases: EnumCase[]) : string {
    var casesCode = enumCases.map(function (enumCase: EnumCase) {
        return `\tcase ${enumCase.caseName} = "${enumCase.caseString}"`;
    }).join("\n");
    return [`enum ${enumName}: String {`, casesCode, "}"].join("\n");
}