import { CatalogSliderItemType } from "@/types/catalog";

import Image from "next/image";
import Link from "next/link";

import styles from "./catalogSliderItem.module.scss";

export const CatalogSliderItem = (props: CatalogSliderItemType) => {
  const inner = (
    <>
      <div className={styles.item__image}>
        <Image src={props.poster} alt="" fill sizes="(max-width: 768px) 50vw, 22vw" />
      </div>

      <h4 className={styles.item__title}>{props.title}</h4>

      <div className={styles.item__rating}>
        <span>{props.rating}</span>
      </div>
    </>
  );

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={styles.item}
        aria-label={`${props.title}, рейтинг ${props.rating}`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={styles.item}>{inner}</div>;
};
