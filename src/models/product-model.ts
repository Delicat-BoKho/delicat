export type ProductModel = {
  id: string;
  name: string;
  price: number;
  imgURL: string;
  describe: string;
  tag: string;
  size: string[];
  color: string[];
  reviews: Reviews;
};

type Reviews = {
  ratingStar: number;
  countReviews: number;
};
