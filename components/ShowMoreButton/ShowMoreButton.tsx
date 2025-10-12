'use client';
import { useRouter } from 'next/navigation';
import css from './ShowMoreButton.module.css';

interface ShowMoreButtonProps {
  id: string;
}

export default function ShowMoreButton({ id }: ShowMoreButtonProps) {
  const router = useRouter();
  function handleButtonClick() {
    router.push(`/catalog/${id}`);
  }

  return (
    <button className={css.showMoreButton} onClick={handleButtonClick}>
      Show more
    </button>
  );
}
