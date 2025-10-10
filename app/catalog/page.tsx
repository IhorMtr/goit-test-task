import FiltersForm from '@/components/FiltersForm/FiltersForm';
import css from './catalog.module.css';
import { getCampers, getFilteredCampers } from '@/lib/api/serverApi';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';

export default async function Catalog() {
  const { items, total } = await getCampers(1, 4);

  async function fetchCampers(
    page: number,
    filters?: {
      location?: string;
      equipment?: string[];
      vehicleType?: string | null;
    }
  ) {
    'use server';
    if (
      filters &&
      (filters.location ||
        (filters.equipment && filters.equipment.length) ||
        filters.vehicleType)
    ) {
      return getFilteredCampers(
        {
          location: filters.location || '',
          equipment: filters.equipment || [],
          vehicleType: filters.vehicleType || null,
        },
        page,
        4
      );
    }
    return getCampers(page, 4);
  }

  return (
    <div className={`container ${css.homeContainer}`}>
      <FiltersForm />
      <div className={css.cardsWrapper}>
        <LoadMoreButton
          initialItems={items}
          total={total}
          fetchCampers={fetchCampers}
        />
      </div>
    </div>
  );
}
