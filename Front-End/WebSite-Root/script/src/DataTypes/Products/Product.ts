export type Product = {
    id: number;
    name: string;
    price: number;
    currency: string;
    stockStatus: string;
    reviews: number;
    shortDescription: string;
    longDescription: string;
    features: string[];
    imagesPaths: string[];
}