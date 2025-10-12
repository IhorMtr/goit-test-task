'use client';
import { useState } from 'react';
import css from './CamperTabs.module.css';
import { Camper } from '@/lib/types/camper';
import { capitalize } from '@/lib/helpers/capitalize';
import toast from 'react-hot-toast';
import BookForm from '../BookForm/BookForm';
import { addSpaceBeforeUnit } from '@/lib/helpers/addSpaceBeforeUnit';

interface CamperTabsProps {
  camper: Camper;
}

export default function CamperTabs({ camper }: CamperTabsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features'
  );

  function handleSubmit() {
    toast.success('Кемпер успішно заброньований!');
  }

  const camperFeatures: { name: string; icon: string }[] = [];

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

  const featureIcons = [
    { key: 'bathroom', name: 'Bathroom', icon: 'icon-shower' },
    { key: 'radio', name: 'Radio', icon: 'icon-radio' },
    { key: 'water', name: 'Water', icon: 'icon-water' },
    { key: 'microwave', name: 'Microwave', icon: 'icon-microwave' },
    { key: 'fridge', name: 'Fridge', icon: 'icon-fridge' },
    { key: 'gas', name: 'Gas', icon: 'icon-gas' },
  ] as const;

  featureIcons.forEach(f => {
    if (camper[f.key as keyof Camper]) {
      camperFeatures.push({ name: f.name, icon: f.icon });
    }
  });

  const formattedForm =
    camper.form === 'fullyIntegrated'
      ? 'Fully Integrated'
      : capitalize(camper.form);

  const details = [
    { label: 'Form', value: formattedForm },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ].filter(detail => detail.value);

  const reviews = camper.reviews || [];

  return (
    <section className={css.section}>
      <div className={css.buttonsWrapper}>
        <button
          className={`${css.tab} ${activeTab === 'features' ? css.active : ''}`}
          onClick={() => setActiveTab('features')}
          type="button"
        >
          Features
        </button>
        <button
          className={`${css.tab} ${activeTab === 'reviews' ? css.active : ''}`}
          onClick={() => setActiveTab('reviews')}
          type="button"
        >
          Reviews
        </button>
      </div>

      {activeTab === 'features' && (
        <div className={css.featuresWrapper}>
          <div className={css.features}>
            <ul className={css.featuresList}>
              {camperFeatures.map((feature, index) => {
                const specialClass =
                  feature.icon === 'icon-water' ||
                  feature.icon === 'icon-microwave' ||
                  feature.icon === 'icon-gas'
                    ? css.strokeIcon
                    : '';

                return (
                  <li
                    key={`${feature.name}-${index}`}
                    className={css.featureItem}
                  >
                    <svg className={`${css.icon} ${specialClass}`}>
                      <use href={`/icons.svg#${feature.icon}`} />
                    </svg>
                    <span>{feature.name}</span>
                  </li>
                );
              })}
            </ul>

            <div className={css.featuresDetailsWrapper}>
              <h2 className={css.featuresTitle}>Vehicle details</h2>
              <div className={css.featuresContentWrapper}>
                <ul className={css.detailsList}>
                  {details.map((detail, i) => (
                    <li key={i} className={css.detailsItem}>
                      <span className={css.detailLabel}>{detail.label}</span>
                      <span className={css.detailValue}>
                        {addSpaceBeforeUnit(capitalize(detail.value))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <BookForm handleSubmit={handleSubmit} />
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className={css.reviews}>
          <ul className={css.reviewsList}>
            {reviews.map((review, index) => {
              const firstLetter = review.reviewer_name.charAt(0).toUpperCase();

              return (
                <li key={index} className={css.reviewItem}>
                  <div className={css.reviewContent}>
                    <div className={css.reviewHeader}>
                      <div className={css.avatar}>{firstLetter}</div>
                      <div className={css.reviewContentWrapper}>
                        <h3 className={css.name}>{review.reviewer_name}</h3>
                        <div className={css.stars}>
                          {Array.from(
                            { length: review.reviewer_rating },
                            (_, i) => (
                              <svg key={i} className={css.starIcon}>
                                <use href="/icons.svg#icon-star" />
                              </svg>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <p className={css.comment}>{review.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <BookForm handleSubmit={handleSubmit} />
        </div>
      )}
    </section>
  );
}
