"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/icons";
import { isFavorite, toggleFavorite, onFavoritesChange } from "@/lib/favorites";
import styles from "./favoriteButton.module.scss";

export default function FavoriteButton({ id }: { id: string }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const sync = () => setFav(isFavorite(id));
    sync();
    return onFavoritesChange(sync);
  }, [id]);

  return (
    <button
      type="button"
      className={`${styles.btn} ${fav ? styles.active : ""}`}
      aria-pressed={fav}
      onClick={() => setFav(toggleFavorite(id))}
    >
      <HeartIcon />
      {fav ? "В избранном" : "В избранное"}
    </button>
  );
}
