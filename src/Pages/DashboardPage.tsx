import styles from "../styles/dashboard.module.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const nav = useNavigate();

  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.heroCard}>
        <div>
          <p className={styles.eyebrow}>Operação diária</p>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Acesso rápido às áreas críticas para controlar execução e custos da
            obra.
          </p>
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => nav("/obras")}
          >
            Abrir Obras
          </button>
          <button
            type="button"
            className={styles.actionBtnSecondary}
            onClick={() => nav("/quotations")}
          >
            Abrir Orçamentos
          </button>
        </div>
      </section>

      <section className={styles.quickGrid}>
        <article className={styles.quickCard}>
          <h2>Planeamento e execução</h2>
          <p>Consulte estados de obra e acompanhe progresso por fase.</p>
          <button
            type="button"
            className={styles.quickCardAction}
            onClick={() => nav("/obras")}
          >
            Gerir Obras
          </button>
        </article>

        <article className={styles.quickCard}>
          <h2>Controlo de orçamentos</h2>
          <p>Centralize os orçamentos e melhore previsibilidade de custo.</p>
          <button
            type="button"
            className={styles.quickCardAction}
            onClick={() => nav("/quotations")}
          >
            Ver Orçamentos
          </button>
        </article>
      </section>
    </div>
  );
};
export default DashboardPage;
