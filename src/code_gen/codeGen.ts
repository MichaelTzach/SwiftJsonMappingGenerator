import {PropertyDefinition, BasicPropertyType, NonObjectProperty, EnumCase, EnumProperty} from "./propertyModel";
import {generateGlossProperty, GlossConsts} from "./glossGen";
import {createSwiftObjectWithCodeDefinitions, ObjectGeneratorType} from "./swiftGen";

function basicPropertyTypeFromString(str: string) : BasicPropertyType {
    switch (str.toLowerCase()) {
        case "nsstring":
        case "string":
            return BasicPropertyType.String

        case "double":
        case "float":
        case "cgfloat":
        case "integer":
        case "int":
            return BasicPropertyType.Int

        case "nsurl":
        case "url":
            return BasicPropertyType.URL
    }
}

interface CreatePropertyOptions {
    varName: string
    isOptional: boolean
    jsonKeyPath?: string
}

export interface CreateNonObjectPropertyOptions extends CreatePropertyOptions{
    propertyType: string
}

export function createNonObjectProperty(options: CreateNonObjectPropertyOptions) :PropertyDefinition {
    let propertyTypeEnum = basicPropertyTypeFromString(options.propertyType);
    if (!propertyTypeEnum) {
        return null;
    }

    return new NonObjectProperty(options.varName, options.isOptional, propertyTypeEnum, options.jsonKeyPath);
}

export interface CreateEnumObjectPropertyOptions extends CreatePropertyOptions {
    enumName: string
    enumCases: [string, string][]
}

function enumCaseFromEnumTuple(tuple: [string, string]) : EnumCase {
    return new EnumCase(tuple[0], tuple[1]);
}

export function createEnumProperty(options: CreateEnumObjectPropertyOptions) :PropertyDefinition {
    let enumCaseObjects = options.enumCases.map((enumTuple) => {
        return enumCaseFromEnumTuple(enumTuple);
    })
    return new EnumProperty(options.varName, options.isOptional, enumCaseObjects, options.enumName, options.jsonKeyPath);
}






function objectGeneratorTypeFromString(str: string) : ObjectGeneratorType {
    switch (str.toLowerCase()) {
        case "struct":
        case "s":
            return ObjectGeneratorType.Struct;
        case "class":
        case "c":
            return ObjectGeneratorType.Class;
    }
}

export interface GenerateCodeOptions {
    objectName: string
    type: string
    propertyDefinitions : PropertyDefinition[]
}

export function generateCodeWithOptions(options: GenerateCodeOptions) : string {

    let typeEnum = objectGeneratorTypeFromString(options.type);
    if (!typeEnum) {
        return null;
    }

    let codeDefinitions = options.propertyDefinitions.map( (propertyDefinition) => {
        return generateGlossProperty(propertyDefinition);
    })

    let createObjectOptions = {
        objectName: options.objectName,
        objectImplements: GlossConsts.objectImplements,
        initFunctionSigniture: GlossConsts.initFunctionSigniture,
        codeDefinitions: codeDefinitions,
        type: typeEnum,
        imports: GlossConsts.imports
    };

    return createSwiftObjectWithCodeDefinitions(createObjectOptions);
}




