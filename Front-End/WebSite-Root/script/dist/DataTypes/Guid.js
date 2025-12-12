export class Guid {
    constructor(Value) {
        this.Value = Value;
    }
    static Empty() {
        return new Guid("");
    }
    static CreateValid(value) {
        return !value
            ? undefined
            : Guid.IsGuid(value)
                ? new Guid(value)
                : null;
    }
    static IsGuid(value) {
        return this.uuidRegex.test(value);
    }
    static New() {
        return new Guid(crypto.randomUUID());
    }
}
Guid.uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
//# sourceMappingURL=Guid.js.map