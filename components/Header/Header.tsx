import css from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Image
          src={'/logo.png'}
          alt={'Website logo'}
          width={136}
          height={16}
          unoptimized={true}
          priority
          className={css.logo}
        ></Image>
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navListItem}>
              <Link href={'/'} className={css.navListLink}>
                Home
              </Link>
            </li>
            <li className={css.navListItem}>
              <Link href={'/catalog'} className={css.navListLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
