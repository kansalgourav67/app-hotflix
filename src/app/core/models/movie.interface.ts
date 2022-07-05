export interface Movie {
  id: number;
  name: string;
  title: string;
  description: string;
  duration: number;
  language: string;
  genre: string;
  categoryId: number[];
  imageUrl: string;
  rating: number;
  isPrime: boolean;
}
