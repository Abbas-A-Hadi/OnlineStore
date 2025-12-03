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

export class Product implements IProduct {
    constructor(public id: string, public name: string, public sku: string, public price: number,
                public currency: string, public stockStatus: string, public reviews: number,
                public shortDescription: string, public longDescription: string,
                public features: string[], public imagesPaths: string[]) {}
}