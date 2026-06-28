"use client";

import { TopRatingSliderItem } from "@/types/topRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import styles from "./topRatingSlider.module.scss";

export default function TopRatingSlider({
  items,
}: {
  items: TopRatingSliderItem[];
}) {
  return (
    <Swiper
      modules={[A11y, Keyboard]}
      keyboard={{ enabled: true }}
      slidesPerView={1.1}
      spaceBetween={32}
      breakpoints={{
        480: { slidesPerView: 1.4, spaceBetween: 48 },
        768: { slidesPerView: 1.8, spaceBetween: 70 },
        1280: { slidesPerView: 2.75, spaceBetween: 110 },
      }}
      className={styles.slider}
    >
      {items.map((item, index) => {
        const body = (
          <>
            <div className={styles.slider__item__index}>
              <span>{index + 1}</span>
            </div>

            <div className={styles.slider__item__image}>
              <Image
                src={item.poster}
                alt={`${index + 1}. ${item.title}`}
                fill
                sizes="(max-width: 768px) 80vw, 30vw"
              />
            </div>
          </>
        );

        return (
          <SwiperSlide key={item.id}>
            {item.href ? (
              <Link
                href={item.href}
                className={styles.slider__item}
                aria-label={`${index + 1} место: ${item.title}`}
              >
                {body}
              </Link>
            ) : (
              <div className={styles.slider__item}>{body}</div>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
