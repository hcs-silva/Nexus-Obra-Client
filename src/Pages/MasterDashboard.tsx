import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/dashboard.module.css";

const MasterDashboard = () => {
  const nav = useNavigate();
  const { user } = useAuth();

  function toClientList() {
    nav("/allclients");
  }

  function toObraList() {
    if (!user?.clientId) {
      nav("/masterdash");
      return;
    }

    nav(`/${user.clientId}/allobras`);
  }

  return (
    <div className={styles.masterDashboardContainer}>
      <section className={styles.heroCard}>
        <div>
          <p className={styles.eyebrow}>Área administrativa</p>
          <h1 className={styles.pageTitle}>Master Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Gestão central de clientes, equipas e operações globais da
            plataforma.
          </p>
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => nav("/addclient")}
          >
            Adicionar Cliente
          </button>
          <button
            type="button"
            className={styles.actionBtnSecondary}
            onClick={toClientList}
          >
            Lista de Clientes
          </button>
        </div>
      </section>

      <section className={styles.quickGrid}>
        <article className={styles.quickCard}>
          <h2>Gestão de clientes</h2>
          <p>Crie contas de cliente e mantenha a estrutura organizacional.</p>
          <button
            type="button"
            className={styles.quickCardAction}
            onClick={() => nav("/addclient")}
          >
            Novo Cliente
          </button>
        </article>

        <article className={styles.quickCard}>
          <h2>Base instalada</h2>
          <p>Revise clientes ativos, estado de subscrição e configurações.</p>
          <button
            type="button"
            className={styles.quickCardAction}
            onClick={toClientList}
          >
            Ver Clientes
          </button>
        </article>

        <article className={styles.quickCard}>
          <h2>Operação por obra</h2>
          <p>Abra rapidamente a lista de obras do cliente em contexto.</p>
          <button
            type="button"
            className={styles.quickCardAction}
            onClick={toObraList}
          >
            Ver Obras
          </button>
        </article>
      </section>
    </div>
  );
};
export default MasterDashboard;
