import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { movies, getMovie } from "@/data/movies";
import VideoPlayer from "@/components/player/VideoPlayer";
import styles from "./watch.module.scss";

export function generateStaticParams() {
  return movies.map((m) => ({ id: m.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const movie = getMovie(params.id);
  if (!movie) return { title: "Видео не найдено" };
  return { title: `Смотреть: ${movie.title}` };
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const movie = getMovie(params.id);
  if (!movie) notFound();

  return (
    <div className={styles.watch}>
      <Link href={`/movie/${movie.id}`} className={styles.back}>
        ‹ Назад к фильму
      </Link>

      <VideoPlayer
        src={movie.video}
        poster={movie.backdrop || movie.poster}
        title={movie.title}
      />

      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <ul className={styles.meta}>
          <li className={styles.meta__rating}>★ {movie.rating}</li>
          <li>{movie.year}</li>
          <li>{movie.genre}</li>
          <li>{movie.age}</li>
        </ul>
        <p className={styles.description}>{movie.description}</p>
      </div>
    </div>
  );
}
