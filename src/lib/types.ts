// TypeScript types for recipes
export interface Recipe {
    id: number;
    slug: string;
    title: string;
    image: string;
    ingredients: string[];
    steps: string[];
  }