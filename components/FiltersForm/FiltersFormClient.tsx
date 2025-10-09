'use client';

import { useState, useTransition } from 'react';
import { useCampersStore } from '@/lib/store/campersStore';
import css from './FiltersForm.module.css';
import { VehicleType } from '@/lib/types/vehicleType';

interface Props {
  action: (formData: FormData) => Promise<any>;
  equipmentFilters: { name: string; icon: string; value: string }[];
  typeFilters: { name: string; icon: string; value: string }[];
}

export default function FiltersFormClient({
  action,
  equipmentFilters,
  typeFilters,
}: Props) {
  const { setFilters } = useCampersStore.getState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await action(formData);
      setFilters({
        location: result.location,
        vehicleEquipment: result.vehicleEquipment,
        vehicleType: result.vehicleType as VehicleType,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit}>
      <fieldset className={css.locationFieldset}>
        <legend className={css.locationLegend}>Location</legend>
        <label className={css.locationLabel}>
          <svg className={css.locationIcon}>
            <use href="/icons.svg#icon-map" />
          </svg>
          <input
            type="text"
            name="location"
            placeholder="City"
            className={css.locationInput}
          />
        </label>
      </fieldset>

      <p className={css.filtersTitle}>Filters</p>

      <fieldset className={css.fieldset}>
        <legend className={css.legend}>Vehicle Equipment</legend>
        <ul className={css.list}>
          {equipmentFilters.map(item => (
            <li key={item.name} className={css.listItem}>
              <label className={css.checkbox}>
                <input
                  type="checkbox"
                  name="vehicle-equipment"
                  value={item.value}
                  className={css.realCheckbox}
                />
                <svg className={css.icon}>
                  <use href={`/icons.svg#icon-${item.icon}`} />
                </svg>
                <span className={css.checkboxText}>{item.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={css.fieldset}>
        <legend className={css.legend}>Vehicle Type</legend>
        <ul className={css.list}>
          {typeFilters.map(type => (
            <li key={type.name} className={css.listItem}>
              <label className={css.checkbox}>
                <input
                  type="radio"
                  name="vehicle-type"
                  value={type.value}
                  className={css.realCheckbox}
                />
                <svg className={css.icon}>
                  <use href={`/icons.svg#icon-${type.icon}`} />
                </svg>
                <span className={css.checkboxText}>{type.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <button type="submit" className={css.searchButton} disabled={loading}>
        Search
      </button>
    </form>
  );
}
