import {PropertyCode} from "./codeModel";
import {EnumProperty, BasicProperty} from "./propertyModel";
import { swiftLegalVarNameOfPropertyDefinition, swiftTypeOfPropertyDefinition, swiftEnumCodeOfEnumNameAndEnumCases } from "./swiftGen";

export function generateGlossProperty(propertyDefinition: BasicProperty) : PropertyCode {
    let optionalCode = propertyDefinition.isOptional ? "?" : "";
    let propertyTypeCode = swiftTypeOfPropertyDefinition(propertyDefinition);
    let legalVariableName = swiftLegalVarNameOfPropertyDefinition(propertyDefinition);
    let variableCode = `let ${propertyDefinition.varName}: ${propertyTypeCode}${optionalCode}`;
    let deserializationCode = `self.${propertyDefinition.varName} = "${propertyDefinition.jsonKeyPath}" <~~ json`

    let enumCode: string;
    if (propertyDefinition instanceof EnumProperty) {
        let enumProperty = <EnumProperty>propertyDefinition;
        enumCode = swiftEnumCodeOfEnumNameAndEnumCases(enumProperty.enumName, enumProperty.enumOptions);
    }

    return new PropertyCode(variableCode, deserializationCode, enumCode);
}



