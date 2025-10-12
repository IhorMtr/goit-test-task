import { Camper } from '@/lib/types/camper';
import css from './CamperCard.module.css';
import Image from 'next/image';
import { foramtPrice } from '@/lib/helpers/formatPrice';
import { capitalize } from '@/lib/helpers/capitalize';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Location from '../Location/Location';
import Reviews from '../Reviews/Reviews';

interface CamperCardProps {
  camper: Camper;
}

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
          priority
        />
      </div>
      <div className={css.infoBlockWrapper}>
        <div className={css.headerWrapper}>
          <div className={css.headerTop}>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.headerTopWrapper}>
              <p className={css.price}>{foramtPrice(camper.price)}</p>
              <FavouriteButton id={camper.id} />
            </div>
          </div>
          <div className={css.headerBottom}>
            <Reviews rating={camper.rating} reviewsCount={reviewsCount} />
            <Location location={camper.location} />
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
        <ShowMoreButton id={camper.id} />
      </div>
    </article>
  );
}
