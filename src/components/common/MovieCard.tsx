import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/data/movies";
import styles from "./movieGrid.module.scss";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={styles.card}
      aria-label={`${movie.title}, ${movie.year}, ${movie.genre}, рейтинг ${movie.rating}`}
    >
      <div className={styles.card__image}>
        <Image
          src={movie.poster}
          alt=""
          fill
          sizes="(max-width: 768px) 45vw, 18vw"
        />
        <span className={styles.card__rating}>{movie.rating}</span>
      </div>
      <h3 className={styles.card__title}>{movie.title}</h3>
      <p className={styles.card__meta}>
        {movie.year} · {movie.genre}
      </p>
    </Link>
  );
}

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className={styles.grid}>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
