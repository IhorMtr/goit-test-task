'use client';
import { useState } from 'react';
import css from './LoadMoreButton.module.css';
import { Camper } from '@/lib/types/camper';
import CamperCard from '@/components/CamperCard/CamperCard';

interface LoadMoreButtonProps {
  initialItems: Camper[];
  total: number;
  fetchCampers: (page: number) => Promise<{ items: Camper[]; total: number }>;
}

export default function LoadMoreButton({
  initialItems,
  total,
  fetchCampers,
}: LoadMoreButtonProps) {
  const [page, setPage] = useState(1);
  const [campers, setCampers] = useState<Camper[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const { items } = await fetchCampers(nextPage);
    setCampers(prev => [...prev, ...items]);
    setPage(nextPage);
    setIsLoading(false);
  };

  const hasMore = campers.length < total;

  return (
    <>
      {campers.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasMore && (
        <button
          type="button"
          className={css.loadMoreBtn}
          onClick={handleClick}
          disabled={isLoading}
        >
          Load More
        </button>
      )}
    </>
  );
}
