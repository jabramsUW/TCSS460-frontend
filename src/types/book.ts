export interface IBook {
  isbn: number;
  authors: string;
  title: string;
  publication: number;
  ratings: {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
  };
  series_info?: {
    name: string;
    position: number;
  };
}
