import { getFilteredCampers } from '@/lib/api/serverApi';
import { parseFilter } from '@/lib/helpers/parseFilter';
import { VehicleType } from '@/lib/types/vehicleType';
import FiltersFormClient from './FiltersFormClient';
import css from './FiltersForm.module.css';

export default function FiltersForm() {
  async function handleSubmit(formData: FormData) {
    'use server';

    const location = formData.get('location') as string;
    const equipment = formData.getAll('vehicle-equipment') as string[];
    const vehicleType = formData.get('vehicle-type') as VehicleType;
    const vehicleEquipment = parseFilter({ equipment });

    try {
      const campers = await getFilteredCampers({
        location,
        equipment,
        vehicleType,
      });
      return { location, vehicleEquipment, vehicleType, campers, error: null };
    } catch {
      return {
        location,
        vehicleEquipment,
        vehicleType,
        campers: [],
        error: true,
      };
    }
  }

  const equipmentFilters = [
    { name: 'AC', icon: 'wind', value: 'AC' },
    { name: 'Automatic', icon: 'automatic', value: 'automatic' },
    { name: 'Kitchen', icon: 'kitchen', value: 'kitchen' },
    { name: 'TV', icon: 'tv', value: 'TV' },
    { name: 'Bathroom', icon: 'shower', value: 'bathroom' },
  ];

  const typeFilters = [
    { name: 'Panel Truck', icon: 'bi-grid-1x2', value: 'panelTruck' },
    { name: 'Fully Integrated', icon: 'bi-grid', value: 'fullyIntegrated' },
    { name: 'Alcove', icon: 'bi-grid-3x3-gap', value: 'alcove' },
  ];

  return (
    <aside className={css.aside}>
      <FiltersFormClient
        action={handleSubmit}
        equipmentFilters={equipmentFilters}
        typeFilters={typeFilters}
      />
    </aside>
  );
}
