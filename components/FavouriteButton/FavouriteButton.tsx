'use client';
import { useEffect, useState } from 'react';
import css from './FavouriteButton.module.css';
import { useCampersStore } from '@/lib/store/campersStore';

interface FavouriteButtonProps {
  id: string;
}

export default function FavouriteButton({ id }: FavouriteButtonProps) {
  const toggleFavourite = useCampersStore(state => state.toggleFavourite);
  const favourites = useCampersStore(state => state.favourites);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (favourites.includes(id)) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  }, [favourites, id]);

  function handleButtonClick() {
    if (isPressed === false) {
      setIsPressed(true);
      toggleFavourite(id);
    } else {
      setIsPressed(false);
      toggleFavourite(id);
    }
  }

  return (
    <button
      aria-pressed={isPressed}
      onClick={handleButtonClick}
      className={`${css.favButton} ${isPressed ? css.pressed : ''}`}
    >
      <svg className={css.heartIcon}>
        <use href={`/icons.svg#icon-heart`} />
      </svg>
    </button>
  );
}
