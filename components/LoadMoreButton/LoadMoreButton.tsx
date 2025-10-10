'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import css from './LoadMoreButton.module.css';
import { Camper } from '@/lib/types/camper';
import CamperCard from '@/components/CamperCard/CamperCard';
import { useCampersStore } from '@/lib/store/campersStore';

interface LoadMoreButtonProps {
  initialItems: Camper[];
  total: number;
  fetchCampers: (
    page: number,
    filters?: {
      location?: string;
      equipment?: string[];
      vehicleType?: string | null;
    }
  ) => Promise<{ items: Camper[]; total: number }>;
}

export default function LoadMoreButton({
  initialItems,
  total,
  fetchCampers,
}: LoadMoreButtonProps) {
  const campers = useCampersStore(state => state.campers);
  const setCampers = useCampersStore(state => state.setCampers);
  const filters = useCampersStore(state => state.filters);
  const isGlobalLoading = useCampersStore(state => state.isGlobalLoading);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [overrideHasMore, setOverrideHasMore] = useState<boolean | null>(null);
  const [effectiveTotal, setEffectiveTotal] = useState(total);
  const [userSearched, setUserSearched] = useState(false);
  const prevGlobalLoading = useRef(isGlobalLoading);

  const activeEquipment = useMemo(
    () =>
      Object.entries(filters.vehicleEquipment || {})
        .filter(([, v]) => v)
        .map(([k]) => k),
    [filters.vehicleEquipment]
  );

  useEffect(() => {
    setIsLoading(true);
    setCampers(initialItems);
    setEffectiveTotal(total);
    setIsLoading(false);
  }, [initialItems, total, setCampers]);

  useEffect(() => {
    if (prevGlobalLoading.current && !isGlobalLoading) {
      setUserSearched(true);
      setPage(1);
      setOverrideHasMore(null);
    }
    prevGlobalLoading.current = isGlobalLoading;
  }, [isGlobalLoading]);

  const hasMore =
    overrideHasMore !== null
      ? overrideHasMore
      : userSearched
        ? true
        : campers.length < effectiveTotal;

  const handleClick = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;

      const queryFilters = userSearched
        ? {
            location: filters.location || '',
            equipment: activeEquipment,
            vehicleType: filters.vehicleType || null,
          }
        : undefined;

      const { items, total: newTotal } = await fetchCampers(
        nextPage,
        queryFilters
      );

      if (typeof newTotal === 'number') setEffectiveTotal(newTotal);

      if (!items || items.length === 0) {
        setOverrideHasMore(false);
        return;
      }

      const updated = Array.from(
        new Map([...campers, ...items].map(c => [c.id, c])).values()
      );
      setCampers(updated);
      setPage(nextPage);
    } finally {
      setIsLoading(false);
    }
  };

  if ((isLoading || isGlobalLoading) && (!campers || campers.length === 0)) {
    return (
      <div className={`${css.loaderWrapper} ${css.fullScreen}`}>
        <span className={css.loader}></span>
      </div>
    );
  }

  if (!campers || campers.length === 0) {
    return (
      <p className={css.emptyState}>Кемперів із таким фільтром не існує</p>
    );
  }

  return (
    <>
      {Array.isArray(campers) && campers.length > 0
        ? campers.map(camper => <CamperCard key={camper.id} camper={camper} />)
        : null}

      {isLoading || isGlobalLoading ? (
        <div className={css.loaderWrapper}>
          <span className={css.loaderSmall}></span>
        </div>
      ) : (
        hasMore && (
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={handleClick}
          >
            Load More
          </button>
        )
      )}
    </>
  );
}
