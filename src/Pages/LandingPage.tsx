import styles from "../styles/landing.module.css";
import appLogo from "../assets/Nexus_Obra_Logo_Only_Nobg.png";

interface ValueCard {
  title: string;
  detail: string;
  metric: string;
}

interface FeatureCard {
  area: string;
  title: string;
  detail: string;
}

interface WorkflowStep {
  title: string;
  detail: string;
}

interface PlanCard {
  name: string;
  price: string;
  target: string;
  featured?: boolean;
  bullets: string[];
}

const valueCards: ValueCard[] = [
  {
    title: "Controlo financeiro por obra",
    detail:
      "Compare orçamento vs. real em segundos e corrija desvios antes de se tornarem prejuízo.",
    metric: "Visibilidade diária",
  },
  {
    title: "Operação no terreno sem ruído",
    detail:
      "Registe progresso, incidentes e custos no mesmo fluxo de trabalho da equipa de obra.",
    metric: "Dados unificados",
  },
  {
    title: "Decisão executiva rápida",
    detail:
      "KPIs claros para direção, com alertas de risco para custos, prazo e conformidade.",
    metric: "Ação orientada",
  },
];

const featureCards: FeatureCard[] = [
  {
    area: "Planeamento",
    title: "Fases, tarefas e progresso",
    detail:
      "Estruture cada obra com fases e responsáveis para acompanhar o estado real de execução.",
  },
  {
    area: "Custos",
    title: "Orçamento vs. real em tempo útil",
    detail:
      "Detete desvios cedo com comparação por categoria e impacto direto na margem.",
  },
  {
    area: "Governança",
    title: "Histórico e rastreabilidade",
    detail:
      "Saiba quem alterou o quê, em que momento, em ações operacionais e financeiras.",
  },
  {
    area: "Colaboração",
    title: "Equipas, membros e papéis",
    detail:
      "Controlo de acessos por cliente para proteger dados sensíveis e reduzir erros.",
  },
  {
    area: "Direção",
    title: "Dashboard de decisão",
    detail:
      "Leitura rápida da saúde da carteira de obras para priorizar ações com mais retorno.",
  },
  {
    area: "Escalabilidade",
    title: "Arquitetura preparada para crescimento",
    detail:
      "Estruture Starter, Growth e Pro sem reescrever processos internos da operação.",
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    title: "1. Onboarding orientado",
    detail:
      "Configure clientes, equipa e obras com um roteiro inicial para arrancar em poucos dias.",
  },
  {
    title: "2. Execução com controlo",
    detail:
      "Acompanhe trabalho de campo, documentos e custos num painel operacional único.",
  },
  {
    title: "3. Revisão e decisão",
    detail:
      "Use indicadores de desempenho para corrigir rumo, proteger margem e escalar com confiança.",
  },
];

const plans: PlanCard[] = [
  {
    name: "Starter",
    price: "79 EUR/mês + 8 EUR/utilizador",
    target: "Equipas até 10 utilizadores",
    bullets: [
      "Obras, faturas e dashboard base",
      "Upload de documentos",
      "Suporte por email",
    ],
  },
  {
    name: "Growth",
    price: "249 EUR/mês + 12 EUR/utilizador",
    target: "Equipas 10-40 utilizadores",
    featured: true,
    bullets: [
      "Tudo do Starter",
      "Relatórios e exportações avançadas",
      "Prioridade de suporte",
    ],
  },
  {
    name: "Pro",
    price: "599 EUR/mês + 18 EUR/utilizador",
    target: "Operações mais maduras",
    bullets: [
      "Governança documental",
      "Controlos financeiros avançados",
      "Conectores e integrações",
    ],
  },
  {
    name: "Enterprise",
    price: "A partir de 1500 EUR/mês",
    target: "Grupos multi-entidade",
    bullets: [
      "SLA e onboarding dedicado",
      "Políticas de segurança avançadas",
      "Integrações customizadas",
    ],
  },
];

const LandingPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.noiseLayer} aria-hidden="true" />
      <div className={styles.gridLayer} aria-hidden="true" />

      <header className={styles.topBar}>
        <div className={styles.brandCluster}>
          <img
            src={appLogo}
            alt="Nexus Obra"
            className={styles.brandMark}
            loading="lazy"
          />
          <div>
            <p className={styles.brandName}>Nexus Obra</p>
            <p className={styles.brandTag}>Plataforma de gestão para PMEs</p>
          </div>
        </div>

        <nav className={styles.topNav} aria-label="Secções da landing page">
          <a href="#valor">Valor</a>
          <a href="#fluxo">Fluxo</a>
          <a href="#planos">Planos</a>
        </nav>

        <div className={styles.topActions}>
          <a href="#planos" className={styles.secondaryBtn}>
            Ver planos
          </a>
          <a href="#demo" className={styles.primaryBtn}>
            Pedir demonstração
          </a>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Gestão de obra | Portugal</p>
            <h1 className={styles.heroTitle}>
              Controle cada obra com rigor financeiro e visibilidade real da
              operação.
            </h1>
            <p className={styles.heroLead}>
              Nexus Obra ajuda equipas de construção a ligar planeamento,
              execução e decisão num único sistema web-first.
            </p>

            <div className={styles.heroActions}>
              <a href="#demo" className={styles.primaryBtn}>
                Iniciar teste de 14 dias
              </a>
              <a href="#valor" className={styles.secondaryBtn}>
                Explorar capacidades
              </a>
            </div>

            <div className={styles.signalRow}>
              <span>Teste de 14 dias</span>
              <span>Sem instalação local</span>
              <span>Focado em construção PME</span>
            </div>
          </div>

          <aside className={styles.heroPanel} aria-label="Resumo operacional">
            <p className={styles.panelHeading}>Pulso da operação</p>
            <h2 className={styles.panelTitle}>Quadro de controlo diário</h2>
            <ul className={styles.pulseList}>
              <li>
                <span>Obra Atlântico</span>
                <strong>Margem +4.2%</strong>
              </li>
              <li>
                <span>Obra Norte Hub</span>
                <strong>Risco de prazo moderado</strong>
              </li>
              <li>
                <span>Carteira ativa</span>
                <strong>12 obras em curso</strong>
              </li>
            </ul>
          </aside>
        </section>

        <section id="valor" className={styles.valueSection}>
          {valueCards.map((card) => (
            <article key={card.title} className={styles.valueCard}>
              <p className={styles.valueMetric}>{card.metric}</p>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </section>

        <section className={styles.featureSection}>
          <div className={styles.sectionHeading}>
            <p>Capacidades principais</p>
            <h2>Feito para operação de obra, não para folhas soltas.</h2>
          </div>

          <div className={styles.featureGrid}>
            {featureCards.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <span className={styles.featureArea}>{feature.area}</span>
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fluxo" className={styles.workflowSection}>
          <div className={styles.sectionHeading}>
            <p>Como funciona</p>
            <h2>Implementação progressiva sem parar a operação atual.</h2>
          </div>

          <div className={styles.workflowGrid}>
            {workflowSteps.map((step) => (
              <article key={step.title} className={styles.workflowCard}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className={styles.pricingSection}>
          <div className={styles.sectionHeading}>
            <p>Planos de crescimento</p>
            <h2>Modelo comercial alinhado com maturidade da sua equipa.</h2>
          </div>

          <div className={styles.pricingGrid}>
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`${styles.planCard} ${plan.featured ? styles.featuredPlan : ""}`.trim()}
              >
                {plan.featured ? (
                  <span className={styles.featuredBadge}>Mais escolhido</span>
                ) : null}
                <h3>{plan.name}</h3>
                <p className={styles.planPrice}>{plan.price}</p>
                <p className={styles.planTarget}>{plan.target}</p>
                <ul>
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="demo" className={styles.finalCta}>
          <p className={styles.finalLabel}>Próxima etapa</p>
          <h2>Veja Nexus Obra aplicado ao seu contexto de obra.</h2>
          <p>
            Uma demonstração orientada por perfil para mostrar impacto em
            custos, visibilidade e velocidade de decisão.
          </p>
          <div className={styles.finalActions}>
            <button type="button" className={styles.primaryBtn}>
              Agendar demonstração
            </button>
            <button type="button" className={styles.secondaryBtn}>
              Receber proposta comercial
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
