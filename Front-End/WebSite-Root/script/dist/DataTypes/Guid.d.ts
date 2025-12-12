export declare class Guid {
    Value: string;
    private static uuidRegex;
    private constructor();
    static Empty(): Guid;
    static CreateValid(value: string): Guid | null | undefined;
    static IsGuid(value: string): boolean;
    static New(): Guid;
}
//# sourceMappingURL=Guid.d.ts.map