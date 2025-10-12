import { getCamperById } from '@/lib/api/serverApi';
import css from './page.module.css';
import Image from 'next/image';
import Reviews from '@/components/Reviews/Reviews';
import Location from '@/components/Location/Location';
import { foramtPrice } from '@/lib/helpers/formatPrice';
import CamperTabs from '@/components/CamperTabs/CamperTabs';

interface CamperPageProps {
  params: { id: string };
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { id } = await params;
  const camper = await getCamperById(id);
  const reviewsCount = camper.reviews.length;

  return (
    <div className={`container ${css.container}`}>
      <article className={css.article}>
        <h1 className={css.title}>{camper.name}</h1>
        <div className={css.meta}>
          <Reviews
            rating={camper.rating}
            reviewsCount={reviewsCount}
            classNames={{
              wrapper: css.reviewsWrapper,
              reviews: css.reiews,
            }}
          />
          <Location
            location={camper.location}
            classNames={{
              wrapper: css.locationWrapper,
              location: css.location,
            }}
          />
        </div>

        <p className={css.price}>{foramtPrice(camper.price)}</p>

        <section className={css.gallery}>
          <ul className={css.imageList}>
            {camper.gallery.map((image, i) => (
              <li className={css.imageListitem} key={`${camper.id}-photo-${i}`}>
                <Image
                  src={image.thumb}
                  alt={`${camper.name} photo ${i + 1}`}
                  className={css.image}
                  fill
                  unoptimized
                  priority
                />
              </li>
            ))}
          </ul>
        </section>

        <p className={css.description}>{camper.description}</p>

        <CamperTabs camper={camper} />
      </article>
    </div>
  );
}
