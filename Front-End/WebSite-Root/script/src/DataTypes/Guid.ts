export class Guid
{
    private static uuidRegex: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    private constructor(public Value: string) {}
    
    static Empty(): Guid { 
        return new Guid(""); 
    }
    
    //<b>return:</b> <b>undefined</b> If value <b>null</b> or <b>empty</b> or
    // return <b>null</b> if not Guid; otherwise return <b>new valid Guid</b>.
    static CreateValid(value: string): Guid | null | undefined {
        return !value 
            ? undefined
            : Guid.IsGuid(value)
                ? new Guid(value)
                : null;
    }
    
    static IsGuid(value: string): boolean {
        return this.uuidRegex.test(value);
    }
    
    static New() : Guid {
        return new Guid(crypto.randomUUID());
    }
}