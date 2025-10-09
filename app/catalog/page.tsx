import FiltersForm from '@/components/FiltersForm/FiltersForm';
import css from './catalog.module.css';
import CamperCard from '@/components/CamperCard/CamperCard';
import { getCampers } from '@/lib/api/serverApi';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';

export default async function Catalog() {
  const { items, total } = await getCampers(1, 4);

  async function fetchCampers(page: number) {
    'use server';
    const res = await getCampers(page, 4);
    return res;
  }

  return (
    <div className={`container ${css.homeContainer}`}>
      <FiltersForm />

      <div className={css.cardsWrapper}>
        {items.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}

        <LoadMoreButton
          initialItems={items}
          total={total}
          fetchCampers={fetchCampers}
        />
      </div>
    </div>
  );
}
