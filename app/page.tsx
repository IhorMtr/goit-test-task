import Link from 'next/link';
import css from './page.module.css';

export default function Home() {
  return (
    <section className={css.homeSection}>
      <div className={`container ${css.homeContainer}`}>
        <div className={css.contentWrapper}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.text}>
            You can find everything you want in our catalog
          </p>
          <Link className={css.link} href={'/catalog'}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
