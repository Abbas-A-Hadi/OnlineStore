var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiClient {
    constructor(baseUrl) {
        this.token = null;
        this.baseUrl = baseUrl;
    }
    SetToken(token) {
        this.token = token;
    }
    Get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl + path, {
                method: "GET",
                headers: this.token ? { Authorization: `Bearer ${this.token}` } : {}
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
    Post(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl + path, {
                method: "POST",
                headers: Object.assign({ "Content-Type": "application/json" }, (this.token ? { Authorization: `Bearer ${this.token}` } : {})),
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
    Put(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl + path, {
                method: "PUT",
                headers: Object.assign({ "Content-Type": "application/json" }, (this.token ? { Authorization: `Bearer ${this.token}` } : {})),
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
    Delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl + path, {
                method: "DELETE",
                headers: Object.assign({}, (this.token ? { Authorization: `Bearer ${this.token}` } : {}))
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
}
//# sourceMappingURL=ApiClient.js.map