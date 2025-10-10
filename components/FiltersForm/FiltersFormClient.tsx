'use client';

import { useEffect, useState } from 'react';
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
  const [formState, setFormState] = useState({
    location: '',
    vehicleEquipment: {} as Record<string, boolean>,
    vehicleType: '',
  });

  const setGlobalLoading = useCampersStore(state => state.setGlobalLoading);
  const filters = useCampersStore(state => state.filters);
  const setFilters = useCampersStore(state => state.setFilters);
  const setCampers = useCampersStore(state => state.setCampers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormState({
      location: filters.location || '',
      vehicleEquipment: filters.vehicleEquipment || {},
      vehicleType: filters.vehicleType || '',
    });
  }, [filters.location, filters.vehicleEquipment, filters.vehicleType]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setGlobalLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await action(formData);
      setFilters({
        location: result.location,
        vehicleEquipment: result.vehicleEquipment,
        vehicleType: result.vehicleType as VehicleType,
      });
      setCampers(
        Array.isArray(result.campers?.items) ? result.campers.items : []
      );
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormState(prev => ({ ...prev, location: value }));
    setFilters({ ...filters, location: value });
  }

  function handleEquipmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    const updatedEquip = { ...formState.vehicleEquipment, [value]: checked };
    setFormState(prev => ({ ...prev, vehicleEquipment: updatedEquip }));
    setFilters({ ...filters, vehicleEquipment: updatedEquip });
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormState(prev => ({ ...prev, vehicleType: value }));
    setFilters({ ...filters, vehicleType: value as VehicleType });
  }

  return (
    <form onSubmit={handleSubmit}>
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
            value={formState.location}
            onChange={handleLocationChange}
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
                  checked={!!formState.vehicleEquipment[item.value]}
                  onChange={handleEquipmentChange}
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
                  checked={formState.vehicleType === type.value}
                  onChange={handleTypeChange}
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
