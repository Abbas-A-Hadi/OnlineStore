export declare class ApiClient {
    private readonly baseUrl;
    private token;
    constructor(baseUrl: string);
    SetToken(token: string): void;
    Get<T>(path: string): Promise<T>;
    Post<T>(path: string, body: unknown): Promise<T>;
    Put<T>(path: string, body: unknown): Promise<T>;
    Delete<T>(path: string): Promise<T>;
}
//# sourceMappingURL=ApiClient.d.ts.map