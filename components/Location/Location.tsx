import css from './Location.module.css';

interface LocationProps {
  location: string;
  classNames?: {
    wrapper?: string;
    location?: string;
  };
}

export default function Location({ location, classNames = {} }: LocationProps) {
  return (
    <div className={`${css.locationWrapper} ${classNames.wrapper || ''}`}>
      <svg className={css.mapIcon}>
        <use href={`/icons.svg#icon-map`} />
      </svg>
      <p className={`${css.location} ${classNames.location || ''}`}>
        {location}
      </p>
    </div>
  );
}
