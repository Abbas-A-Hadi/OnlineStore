export type Product = {
    id: number;
    name: string;
    price: number;
    currency: string;
    brand: string;
    reviews: number;
    stockStatus: string;
    category: string;
    shortDescription: string;
    longDescription: string;
    features: string[];
    imagesPaths: string[];
}