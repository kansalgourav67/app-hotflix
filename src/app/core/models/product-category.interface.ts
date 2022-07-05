export interface MovieCategory {
  categoryId: number;
  categoryName: string;
  subCategory: MovieCategory[];
}
