import { Metadata } from "next";
import PageShell from "@/components/common/PageShell";
import { MovieGrid } from "@/components/common/MovieCard";
import { movies } from "@/data/movies";

export const metadata: Metadata = {
  title: "Каталог | Фильмы и сериалы",
  description: "Полный каталог фильмов и сериалов.",
};

export default function CatalogPage() {
  return (
    <PageShell
      title="Каталог"
      subtitle={`${movies.length} фильмов и сериалов в подборке`}
    >
      <MovieGrid movies={movies} />
    </PageShell>
  );
}
