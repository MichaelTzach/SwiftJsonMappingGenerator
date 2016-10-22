import {PropertyCode} from "./codeModel";
import {EnumProperty, PropertyDefinition} from "./propertyModel";
import { swiftLegalVarNameOfPropertyDefinition, swiftTypeOfPropertyDefinition, swiftEnumCodeOfEnumNameAndEnumCases } from "./swiftGen";

export function generateGlossProperty(propertyDefinition: PropertyDefinition) : PropertyCode {
    let optionalCode = propertyDefinition.isOptional ? "?" : "";
    let propertyTypeCode = swiftTypeOfPropertyDefinition(propertyDefinition);
    let legalVariableName = swiftLegalVarNameOfPropertyDefinition(propertyDefinition);

    //Create code
    let variableCode = `let ${legalVariableName}: ${propertyTypeCode}${optionalCode}`;
    let deserializationCode = `self.${propertyDefinition.varName} = "${propertyDefinition.jsonKeyPath}" <~~ json`

    let enumCode: string;
    if (propertyDefinition instanceof EnumProperty) {
        let enumProperty = <EnumProperty>propertyDefinition;
        enumCode = swiftEnumCodeOfEnumNameAndEnumCases(enumProperty.enumName, enumProperty.enumOptions);
    }

    return new PropertyCode(variableCode, deserializationCode, enumCode);
}
