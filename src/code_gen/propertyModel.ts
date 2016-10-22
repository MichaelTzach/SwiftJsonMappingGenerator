export enum BasicPropertyType {
    String,
    Int,
    URL
}

export class EnumCase {
    constructor(public caseName: string,
                public caseString: string) {}
}

export abstract class BasicProperty {
    constructor(public varName: string,
                public isOptional: boolean,
                public jsonKeyPath?: string) {
        this.varName = varName;
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