'use client';
import { useEffect } from 'react';
import CamperCard from '@/components/CamperCard/CamperCard';
import { useCampersStore } from '@/lib/store/campersStore';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';
import { Camper } from '@/lib/types/camper';

interface Props {
  initialItems: Camper[];
  total: number;
  fetchCampers: (page: number) => Promise<{ items: Camper[]; total: number }>;
}

export default function CampersListClient({
  initialItems,
  total,
  fetchCampers,
}: Props) {
  const campers = useCampersStore(state => state.campers);
  const setCampers = useCampersStore(state => state.setCampers);

  useEffect(() => {
    if (campers.length === 0) setCampers(initialItems);
  }, [initialItems, campers.length, setCampers]);

  return (
    <div>
      {campers.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      <LoadMoreButton
        initialItems={campers}
        total={total}
        fetchCampers={fetchCampers}
      />
    </div>
  );
}
