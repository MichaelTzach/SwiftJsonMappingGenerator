import {
    PropertyDefinition, NonObjectProperty, BasicPropertyType, EnumProperty, ObjectProperty,
    EnumCase
} from "./propertyModel";
import {PropertyCode} from "./codeModel";

function legalVarName(checkedVarName: string) : string {
    return checkedVarName.replace(/ /g,'');
}

export function swiftLegalVarNameOfPropertyDefinition(propertyDefinition: PropertyDefinition) : string {
    return legalVarName(propertyDefinition.varName);
}

export function swiftTypeOfPropertyDefinition(propertyDefinition: PropertyDefinition) : string {
    if (propertyDefinition instanceof NonObjectProperty) {
        let nonObjectProperty = <NonObjectProperty>propertyDefinition;
        return BasicPropertyType[nonObjectProperty.propertyType];
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
        return addTabToEachNewLineInString(`case ${enumCase.caseName} = "${enumCase.caseString}"`);
    }).join("\n");

    return [`enum ${enumName}: String {`, casesCode, "}"].join("\n");
}

export enum ObjectGeneratorType {
    Struct = 1,
    Class
}

function addTabToEachNewLineInString(str: string, numberOfTabs?: number) : string {
    let tabsString = "\t";
    if (numberOfTabs) {
        tabsString = tabsString.repeat(numberOfTabs);
    }
    return str.replace(/^/gm, tabsString)
}

export interface CreateObjectOptions {
    objectName: string
    objectImplements: string
    initFunctionSigniture: string
    codeDefinitions: PropertyCode[]
    type: ObjectGeneratorType
    imports?: string[]
}

export function createSwiftObjectWithCodeDefinitions(options: CreateObjectOptions) : string {
    let importString = "\n";
    if (options.imports) {
        let importsWithImport = options.imports.map((importName) => {
            return `import ${importName}`;
        })
        importString = importsWithImport.join("\n");
    }

    let objectTypeString = ObjectGeneratorType[options.type].toLowerCase();

    let objectStartString = `${objectTypeString} ${options.objectName}: ${options.objectImplements} {`;

    let varsString = options.codeDefinitions.map((codeDefinition) => {
        return `\t${codeDefinition.variableCode}`;
    }).join("\n");

    let enumString = options.codeDefinitions.map((codeDefinition) => {
        return codeDefinition.enumCode && addTabToEachNewLineInString(codeDefinition.enumCode);
    }).filter((enumString) => {
        return enumString;
    }).join("\n");

    let beforeInitMark = addTabToEachNewLineInString("// MARK: -Deserialization");

    let initStart = addTabToEachNewLineInString(`${options.initFunctionSigniture} {`);

    let initSequenceString = options.codeDefinitions.map((codeDefinition) => {
        return addTabToEachNewLineInString(codeDefinition.deserializationCode, 2);
    }).join("\n");

    let initEnd = addTabToEachNewLineInString("}");

    let initString = [initStart,
                initSequenceString,
                initEnd].join("\n");

    let objectClose = "}\n";

    let objectCode = [  importString,
                        objectStartString,
                        varsString,
                        enumString,
                        beforeInitMark,
                        initString,
                        objectClose].join("\n\n");

    return objectCode;
}

