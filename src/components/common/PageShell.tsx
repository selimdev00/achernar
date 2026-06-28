import { ReactNode } from "react";
import styles from "./pageShell.module.scss";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.page}>
      <header className={styles.page__header}>
        <h1 className={styles.page__title}>{title}</h1>
        {subtitle && <p className={styles.page__subtitle}>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
