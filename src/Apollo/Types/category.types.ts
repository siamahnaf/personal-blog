export interface CategoriesData {
    name: string;
    image: {
        url: string;
    };
    slug: string;
    description: string;
}

export interface GetCategoriesData {
    categories: CategoriesData[];
}