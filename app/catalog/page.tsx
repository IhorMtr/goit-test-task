import FiltersForm from '@/components/FiltersForm/FiltersForm';
import css from './catalog.module.css';

export default function Catalog() {
  return (
    <div className={`container ${css.homeContainer}`}>
      <FiltersForm />
    </div>
  );
}
