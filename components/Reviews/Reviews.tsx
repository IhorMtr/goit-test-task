import css from './Reviews.module.css';

interface ReviewsProps {
  rating: number;
  reviewsCount: number;
  classNames?: {
    wrapper?: string;
    reviews?: string;
  };
}

export default function Reviews({
  rating,
  reviewsCount,
  classNames = {},
}: ReviewsProps) {
  return (
    <div className={`${css.reviewsWrapper} ${classNames.wrapper || ''}`}>
      <svg className={css.reviewsIcon}>
        <use href={`/icons.svg#icon-star`} />
      </svg>
      <p className={`${css.reviews} ${classNames.reviews || ''}`}>
        {rating}({reviewsCount} Reviews)
      </p>
    </div>
  );
}
