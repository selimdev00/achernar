import styles from "./topRating.module.scss";
import TopRatingSlider from "@/components/topRating/TopRatingSlider";
import { TopRatingSliderItem } from "@/types/topRating";

const items: TopRatingSliderItem[] = [
  {
    id: 1,
    poster: "/images/6/poster.png",
    title: "Моё прекрасное несчастье",
    href: "/movie/my-fault",
  },
  {
    id: 2,
    poster: "/images/7/poster.png",
    title: "Красное уведомление",
    href: "/movie/red-notice",
  },
  {
    id: 3,
    poster: "/images/8/poster.png",
    title: "Ведьмак",
    href: "/movie/the-witcher",
  },
  {
    id: 4,
    poster: "/images/2/poster.png",
    title: "Синий жук",
    href: "/movie/blue-beetle",
  },
  {
    id: 5,
    poster: "/images/4/poster.png",
    title: "Салют 7",
    href: "/movie/salyut-7",
  },
];

export default function TopRating({ id }: { id?: string }) {
  return (
    <div id={id} className={styles.topRating}>
      <div className={styles.topRating__header}>
        <h3 className={styles.topRating__header__highlight}>топ-10</h3>
        <p className={styles.topRating__header__text}>просмотров за неделю</p>
      </div>

      <TopRatingSlider items={items} />
    </div>
  );
}
