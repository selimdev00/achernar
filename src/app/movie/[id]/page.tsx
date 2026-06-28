import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { movies, getMovie } from "@/data/movies";
import { MovieGrid } from "@/components/common/MovieCard";
import FavoriteButton from "@/components/common/FavoriteButton";
import styles from "./movie.module.scss";

export function generateStaticParams() {
  return movies.map((m) => ({ id: m.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const movie = getMovie(params.id);
  if (!movie) return { title: "Фильм не найден" };
  return {
    title: `${movie.title} (${movie.year})`,
    description: movie.description,
  };
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const movie = getMovie(params.id);
  if (!movie) notFound();

  const similar = movies.filter((m) => m.id !== movie.id).slice(0, 5);
  const meta = [movie.year, movie.genre, movie.age, movie.duration].filter(
    Boolean,
  );

  return (
    <article className={styles.movie}>
      <div className={styles.backdrop}>
        <Image
          src={movie.backdrop || movie.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.backdrop__shade} />
      </div>

      <div className={styles.head}>
        <div className={styles.poster}>
          <Image
            src={movie.poster}
            alt={`Постер: ${movie.title}`}
            fill
            sizes="200px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.head__body}>
          <h1 className={styles.title}>{movie.title}</h1>

          <ul className={styles.meta}>
            <li className={styles.meta__rating}>★ {movie.rating}</li>
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <p className={styles.description}>{movie.description}</p>

          <div className={styles.actions}>
            <Link href={`/watch/${movie.id}`} className={styles.play}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
              </svg>
              Смотреть
            </Link>
            <FavoriteButton id={movie.id} />
          </div>
        </div>
      </div>

      <section className={styles.similar}>
        <h2 className={styles.similar__title}>Похожее</h2>
        <MovieGrid movies={similar} />
      </section>
    </article>
  );
}
