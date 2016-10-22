export class PropertyCode {
    constructor(public variableCode: string,
                public deserializationCode: string,
                public enumCode?: string) {}

    toString() {
        return [this.variableCode, this.deserializationCode, this.enumCode].join(", ");
    }
}