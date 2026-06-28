import { Metadata } from "next";
import PageShell from "@/components/common/PageShell";
import styles from "./tv.module.scss";

export const metadata: Metadata = {
  title: "ТВ каналы | Прямой эфир",
  description: "Прямой эфир телеканалов.",
};

const channels = [
  { id: 1, name: "Кино 1", now: "Поймай меня, если сможешь", cat: "Кино" },
  { id: 2, name: "Боевик HD", now: "Красное уведомление", cat: "Боевик" },
  { id: 3, name: "Семейный", now: "Домашняя игра", cat: "Семья" },
  { id: 4, name: "Фантастика", now: "Синий жук", cat: "Фантастика" },
  { id: 5, name: "Драма", now: "Салют 7", cat: "Драма" },
  { id: 6, name: "Сериалы 24", now: "Ведьмак", cat: "Сериалы" },
  { id: 7, name: "Премьера", now: "Индиана Джонс", cat: "Премьеры" },
  { id: 8, name: "Мелодрама", now: "Моё прекрасное несчастье", cat: "Мелодрама" },
];

export default function TVPage() {
  return (
    <PageShell title="ТВ каналы" subtitle="Прямой эфир, сейчас в эфире">
      <ul className={styles.channels}>
        {channels.map((c) => (
          <li key={c.id} className={styles.channel}>
            <div className={styles.channel__logo} aria-hidden="true">
              {c.id}
            </div>
            <div className={styles.channel__body}>
              <div className={styles.channel__top}>
                <span className={styles.channel__name}>{c.name}</span>
                <span className={styles.channel__live}>В эфире</span>
              </div>
              <p className={styles.channel__now}>Сейчас: {c.now}</p>
            </div>
            <span className={styles.channel__cat}>{c.cat}</span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
