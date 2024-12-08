export interface IBook {
  isbn13: number;
  authors: string;
  publication: number;
  title: string;
  ratings: {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
  };
  icons: {
    large: string;
    small: string;
  };
  series_info?: {
    name: string;
    position: number;
  };
}
