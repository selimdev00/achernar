"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/common/PageShell";
import { MovieGrid } from "@/components/common/MovieCard";
import { movies } from "@/data/movies";
import { SearchIcon } from "@/components/icons";
import styles from "./search.module.scss";

export default function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return movies;
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(term) ||
        m.genre.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <PageShell title="Поиск" subtitle="Фильмы, сериалы и жанры">
      <label className={styles.field}>
        <span className={styles.field__icon} aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          type="search"
          className={styles.field__input}
          placeholder="Название или жанр"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск по фильмам и жанрам"
          autoFocus
        />
      </label>

      {results.length > 0 ? (
        <>
          <p className={styles.count}>Найдено: {results.length}</p>
          <MovieGrid movies={results} />
        </>
      ) : (
        <p className={styles.empty}>
          Ничего не найдено по запросу «{q}». Попробуйте другое название или
          жанр.
        </p>
      )}
    </PageShell>
  );
}
