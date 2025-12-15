export declare class Guid {
    Value: string;
    private static uuidRegex;
    private constructor();
    static Empty(): Guid;
    private static CreateValid;
    static Restore(value: string): Guid | null | undefined;
    static New(): Guid;
    static IsGuid(value: string): boolean;
}
//# sourceMappingURL=Guid.d.ts.map