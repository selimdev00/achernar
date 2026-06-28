"use client";

import styles from "./sidebar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpIcon,
  LogoIcon,
  SearchIcon,
  HomeIcon,
  HeartIcon,
  VideoIcon,
  TVIcon,
  AccountIcon,
} from "@/components/icons";

import { useEffect, useState } from "react";

const nav = [
  { id: "search", title: "Поиск", link: "/search", icon: <SearchIcon /> },
  { id: "main", title: "Главная", link: "/", icon: <HomeIcon /> },
  { id: "catalog", title: "Каталог", link: "/catalog", icon: <VideoIcon /> },
  { id: "tv", title: "ТВ каналы", link: "/tv", icon: <TVIcon /> },
  { id: "favorites", title: "Моё", link: "/favorites", icon: <HeartIcon /> },
  { id: "account", title: "Аккаунт", link: "/account", icon: <AccountIcon /> },
];

export default function LayoutSidebar() {
  const pathname = usePathname();
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (link: string) =>
    link === "/" ? pathname === "/" : pathname.startsWith(link);

  return (
    <div className={styles.layoutSidebar}>
      <div>
        <Link href="/" aria-label="На главную" className={styles.layoutSidebar__logo}>
          <LogoIcon />
        </Link>

        <nav
          aria-label="Основная навигация"
          className={styles.layoutSidebar__nav}
        >
          <ul className={styles.layoutSidebar__nav__list}>
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  aria-current={isActive(item.link) ? "page" : undefined}
                  className={`${styles.layoutSidebar__nav__list__item} ${
                    isActive(item.link) ? styles.active : ""
                  }`}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.label}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        type="button"
        aria-label="Наверх"
        tabIndex={showUp ? 0 : -1}
        className={`${styles.layoutSidebar__up} ${showUp ? styles.active : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}
