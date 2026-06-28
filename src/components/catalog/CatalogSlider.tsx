"use client";

import { CatalogSliderItem } from "@/components/catalog/CatalogSliderItem";

import { CatalogSliderItemType } from "@/types/catalog";

import styles from "./catalogSlider.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";

export const CatalogSlider = ({
  items,
  title,
  id,
}: {
  items: CatalogSliderItemType[];
  title?: string;
  id?: string;
}) => {
  return (
    <div id={id} className={styles.slider}>
      {title && <h2 className={styles.slider__title}>{title}</h2>}

      <Swiper
        modules={[A11y, Keyboard]}
        keyboard={{ enabled: true }}
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          480: { slidesPerView: 1.6, spaceBetween: 20 },
          768: { slidesPerView: 2.5, spaceBetween: 28 },
          1024: { slidesPerView: 3.2, spaceBetween: 40 },
          1280: { slidesPerView: 3.9, spaceBetween: 50 },
        }}
        className={styles.slider__swiper}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <CatalogSliderItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
