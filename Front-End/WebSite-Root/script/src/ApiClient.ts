export class ApiClient {
    private readonly baseUrl: string;
    private token: string = "";

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    SetToken(token: string) {
        this.token = token;
    }

    async Get<T>(path: string): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: "GET",
            headers: this.token ? { Authorization: `Bearer ${this.token}` } : {}
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    async Post<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    async Put<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    async Delete<T>(path: string): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: "DELETE",
            headers: {
                ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }
}
