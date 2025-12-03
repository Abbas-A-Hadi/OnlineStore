export interface IProduct {
    id: string;
    name: string;
    sku: string;
    price: number;
    currency: string;
    stockStatus: string;
    reviews: number;
    shortDescription: string;
    longDescription: string;
    features: string[];
    imagesPaths: string[];
}
export declare class Product implements IProduct {
    id: string;
    name: string;
    sku: string;
    price: number;
    currency: string;
    stockStatus: string;
    reviews: number;
    shortDescription: string;
    longDescription: string;
    features: string[];
    imagesPaths: string[];
    constructor(id: string, name: string, sku: string, price: number, currency: string, stockStatus: string, reviews: number, shortDescription: string, longDescription: string, features: string[], imagesPaths: string[]);
}
//# sourceMappingURL=Product.d.ts.map