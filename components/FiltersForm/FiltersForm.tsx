import css from './FiltersForm.module.css';

export default function FiltersForm() {
  async function handleSubmit(formData: FormData) {
    'use server';
  }

  const equipmentFilters = [
    { name: 'AC', icon: 'wind', value: 'AC' },
    { name: 'Automatic', icon: 'automatic', value: 'automatic' },
    { name: 'Kitchen', icon: 'kitchen', value: 'kitchen' },
    { name: 'TV', icon: 'tv', value: 'TV' },
    { name: 'Bathroom', icon: 'shower', value: 'bathroom' },
  ];

  const typeFilters = [
    { name: 'Van', icon: 'bi-grid-1x2', value: 'van' },
    { name: 'Fully Integrated', icon: 'bi-grid', value: 'fullyIntegrated' },
    { name: 'Alcove', icon: 'bi-grid-3x3-gap', value: 'alcove' },
  ];

  return (
    <aside className={css.aside}>
      <form action={handleSubmit}>
        <fieldset className={css.fieldset}>
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

        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
    </aside>
  );
}
