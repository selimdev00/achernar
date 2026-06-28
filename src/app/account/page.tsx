import { Metadata } from "next";
import PageShell from "@/components/common/PageShell";
import styles from "./account.module.scss";

export const metadata: Metadata = {
  title: "Аккаунт | Профиль",
  description: "Профиль и подписка.",
};

const stats = [
  { label: "В избранном", value: "12" },
  { label: "Просмотрено", value: "148" },
  { label: "Часов за месяц", value: "27" },
];

export default function AccountPage() {
  return (
    <PageShell title="Аккаунт" subtitle="Профиль и подписка">
      <div className={styles.card}>
        <div className={styles.avatar} aria-hidden="true">
          С
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>Селим</h2>
          <p className={styles.email}>selim@example.com</p>
          <span className={styles.plan}>Подписка Premium · 4K HDR</span>
        </div>
      </div>

      <ul className={styles.stats}>
        {stats.map((s) => (
          <li key={s.label} className={styles.stat}>
            <span className={styles.stat__value}>{s.value}</span>
            <span className={styles.stat__label}>{s.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.rows}>
        {[
          "Настройки профиля",
          "Управление подпиской",
          "Способы оплаты",
          "Язык и регион",
          "Выйти из аккаунта",
        ].map((r) => (
          <button key={r} type="button" className={styles.row}>
            {r}
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}
