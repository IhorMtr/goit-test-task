import { Camper } from '@/lib/types/camper';
import css from './CamperCard.module.css';
import Image from 'next/image';
import { foramtPrice } from '@/lib/helpers/formatPrice';
import { capitalize } from '@/lib/helpers/capitalize';

interface CamperCardProps {
  camper: Camper;
}

// const categories = [
//   { name: 'automatic', icon: 'icon-automatic' },
//   { name: 'fridge', icon: 'icon-fridge' },
//   { name: 'gas', icon: 'icon-gas' },
//   { name: 'kitchen', icon: 'icon-kitchen' },
//   { name: 'microwave', icon: 'icon-microwave' },
//   { name: 'petrol', icon: 'icon-petrol' },
//   { name: 'radio', icon: 'icon-radio' },
//   { name: 'shower', icon: 'icon-shower' },
//   { name: 'water', icon: 'icon-water' },
//   { name: 'wind', icon: 'icon-wind' },
// ];

export default function CamperCard({ camper }: CamperCardProps) {
  const reviewsCount = camper.reviews.length;
  const camperFeatures = [];

  if (camper.transmission) {
    camperFeatures.push({
      name: capitalize(camper.transmission),
      icon: 'icon-automatic',
    });
  }

  if (camper.engine) {
    camperFeatures.push({
      name: capitalize(camper.engine),
      icon: 'icon-petrol',
    });
  }

  if (camper.kitchen) {
    camperFeatures.push({
      name: 'Kitchen',
      icon: 'icon-kitchen',
    });
  }

  if (camper.AC) {
    camperFeatures.push({
      name: 'AC',
      icon: 'icon-wind',
    });
  }

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={camper.gallery[0].thumb}
          alt={camper.name}
          fill
          className={css.image}
          unoptimized
        />
      </div>
      <div className={css.infoBlockWrapper}>
        <div className={css.headerWrapper}>
          <div className={css.headerTop}>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.headerTopWrapper}>
              <p className={css.price}>{foramtPrice(camper.price)}</p>
              <button className={css.favButton}>
                <svg className={css.heartIcon}>
                  <use href={`/icons.svg#icon-heart`} />
                </svg>
              </button>
            </div>
          </div>
          <div className={css.headerBottom}>
            <div className={css.reviewsWrapper}>
              <svg className={css.reviewsIcon}>
                <use href={`/icons.svg#icon-star`} />
              </svg>
              <p className={css.reviews}>
                {camper.rating}({reviewsCount} Reviews)
              </p>
            </div>
            <div className={css.locationWrapper}>
              <svg className={css.mapIcon}>
                <use href={`/icons.svg#icon-map`} />
              </svg>
              <p className={css.location}>{camper.location}</p>
            </div>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.features}>
          {camperFeatures.map(feature => (
            <li key={feature.name} className={css.feature}>
              <svg className={css.icon}>
                <use href={`/icons.svg#${feature.icon}`} />
              </svg>
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
        <button className={css.showMoreButton}>Show more</button>
      </div>
    </article>
  );
}
