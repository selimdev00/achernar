"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import { MovieGrid } from "@/components/common/MovieCard";
import { movies } from "@/data/movies";
import { getFavorites, onFavoritesChange } from "@/lib/favorites";
import styles from "./favorites.module.scss";

export default function FavoritesPage() {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    const sync = () => setIds(getFavorites());
    sync();
    return onFavoritesChange(sync);
  }, []);

  if (ids === null) return <PageShell title="Моё">{null}</PageShell>;

  const list = movies.filter((m) => ids.includes(m.id));

  return (
    <PageShell title="Моё" subtitle="Сохранённые фильмы и сериалы">
      {list.length > 0 ? (
        <MovieGrid movies={list} />
      ) : (
        <div className={styles.empty}>
          <p className={styles.empty__title}>Здесь пока пусто</p>
          <p className={styles.empty__text}>
            Добавляйте фильмы в избранное кнопкой «В избранное» на странице
            фильма, чтобы вернуться к ним позже.
          </p>
          <Link href="/catalog" className={styles.empty__btn}>
            Открыть каталог
          </Link>
        </div>
      )}
    </PageShell>
  );
}
