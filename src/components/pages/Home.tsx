"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import Image from "next/legacy/image";
import { UIButton } from "@/components/ui";
import { CatalogSlider } from "@/components/catalog/CatalogSlider";
import TopRating from "@/components/topRating/TopRating";
import { CatalogSliderItemType } from "@/types/catalog";
import { movies, featuredMovie } from "@/data/movies";
import { ReactLenis } from "@studio-freight/react-lenis";

const catalogItems: CatalogSliderItemType[] = movies.slice(1, 6).map((m) => ({
  id: m.id,
  title: m.title,
  poster: m.poster,
  rating: m.rating,
  href: `/movie/${m.id}`,
}));

export default function HomePageComponent() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const content = (
    <div className={styles.main}>
      <div className={styles.main__banner}>
        <div className={styles.main__banner__block}>
          <div className={styles.main__banner__titleImage}>
            <Image
              src={featuredMovie.titleImage || "/images/1/title.png"}
              alt={featuredMovie.title}
              layout="fill"
              objectFit={"contain"}
            />
          </div>

          <p className={styles.main__banner__description}>
            Неувядающий авантюрист и пытливый археолог-исследователь
            по‑прежнему в седле.
          </p>

          <div className={styles.main__banner__buttons}>
            <UIButton
              href={`/watch/${featuredMovie.id}`}
              className={styles.main__banner__buttons__button}
              variant={"primary"}
            >
              Смотреть
            </UIButton>
            <UIButton
              href={`/movie/${featuredMovie.id}`}
              className={styles.main__banner__buttons__button}
              variant={"secondary"}
            >
              О фильме
            </UIButton>
          </div>
        </div>
      </div>

      <CatalogSlider id="catalog" items={catalogItems} title={"Новинки"} />

      <TopRating id="top-rating" />
    </div>
  );

  if (reduceMotion) return content;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.125,
        duration: 0.3,
      }}
    >
      {content}
    </ReactLenis>
  );
}
