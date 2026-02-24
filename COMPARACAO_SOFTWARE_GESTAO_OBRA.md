# Comparação de Funcionalidades: OfficeGest PRIMAVERA vs SIG Construção vs Nexus Obra

Este documento apresenta uma análise comparativa das principais funcionalidades entre o **OfficeGest PRIMAVERA**, o **SIG Construção** e o **Nexus Obra** (este repositório), com foco nas diferenças entre as soluções estabelecidas no mercado e o estado atual do projeto Nexus Obra.

> **Legenda:** ✅ Implementado · 🚧 Previsto / Placeholder · ❌ Não disponível · `Limitado` = funcionalidade parcial

---

## Visão Geral

| Critério                      | OfficeGest PRIMAVERA                          | SIG Construção                                          | **Nexus Obra** (este repo)                        |
|-------------------------------|-----------------------------------------------|----------------------------------------------------------|---------------------------------------------------|
| **Fabricante / Origem**       | PRIMAVERA BSS (Portugal)                      | Solvit / Tecnológica (Portugal)                          | Projeto open-source / privado (Portugal)          |
| **Tipo de solução**           | ERP modular integrado com foco em PME         | Software especializado em gestão de obra e projetos      | Aplicação web multi-tenant de gestão de obras     |
| **Modelo de licenciamento**   | Licença perpétua ou subscrição SaaS           | Licença perpétua ou SaaS                                 | A definir                                         |
| **Plataforma**                | Windows / Web (PRIMAVERA Cloud)               | Windows / Web                                            | Web (React + Vite, acesso por browser)            |
| **Stack tecnológica**         | Proprietária (.NET / PRIMAVERA Cloud)         | Proprietária                                             | React 19, TypeScript, Vite, Axios, Node.js        |
| **Multi-tenant**              | ✅ (por organização)                          | Limitado                                                 | ✅ (por `clientId`, isolamento por empresa)       |
| **Controlo de acesso por role** | ✅                                          | ✅                                                       | ✅ (masterAdmin, Admin, user, guest)              |
| **Setor alvo**                | PME de construção, empreiteiros, promotores   | Empreiteiros gerais, construtoras, promotores            | PME de construção (fase inicial)                  |
| **Maturidade**                | Produto comercial maduro                      | Produto comercial maduro                                 | Em desenvolvimento ativo                          |

---

## Funcionalidades por Área

### 1. Autenticação e Controlo de Acesso

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Login com username/password                       | ✅                   | ✅             | ✅             |
| Logout                                            | ✅                   | ✅             | ✅             |
| Reset / atualização de password                   | ✅                   | ✅             | ✅             |
| Controlo de acesso baseado em roles               | ✅                   | ✅             | ✅             |
| Rotas protegidas por role                         | ✅                   | ✅             | ✅             |
| Isolamento de dados por cliente (multi-tenant)    | ✅                   | Limitado       | ✅             |
| SSO (Single Sign-On)                              | ✅                   | Limitado       | ❌             |
| Autenticação 2FA                                  | ✅                   | Limitado       | ❌             |
| Gestão de sessões / expiração de token            | ✅                   | ✅             | ✅ (JWT)       |

---

### 2. Gestão de Clientes / Empresas

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Criação de clientes / empresas                    | ✅                   | ✅             | ✅             |
| Listagem e pesquisa de clientes                   | ✅                   | ✅             | ✅             |
| Edição de dados de clientes                       | ✅                   | ✅             | ✅             |
| Remoção de clientes                               | ✅                   | ✅             | ❌             |
| Logótipo / imagem do cliente                      | ✅                   | ✅             | ✅ (Cloudinary)|
| Estado de subscrição                              | ✅                   | ✅             | ✅             |
| Perfil detalhado do cliente (morada, NIF, etc.)   | ✅                   | ✅             | ❌ (nome, email, telefone apenas) |
| Dashboard dedicado por cliente                    | ✅                   | ✅             | ✅             |

---

### 3. Gestão de Obras

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Criação de obras                                  | ✅                   | ✅             | ✅             |
| Listagem e pesquisa de obras                      | ✅                   | ✅             | ✅             |
| Edição de obras                                   | ✅                   | ✅             | ✅             |
| Eliminação de obras                               | ✅                   | ✅             | ✅             |
| Estado da obra (planeada / em progresso / concluída / cancelada) | ✅  | ✅    | ✅             |
| Localização da obra                               | ✅                   | ✅             | ✅             |
| Datas de início e fim                             | ✅                   | ✅             | ✅             |
| Descrição / notas da obra                         | ✅                   | ✅             | ✅             |
| Caderno de encargos (upload .xls/.xlsx)           | Limitado             | ✅             | ✅ (Cloudinary)|
| Planeamento de tarefas e fases de obra            | ✅                   | ✅             | ❌             |
| Diagrama de Gantt                                 | ✅                   | ✅             | ❌             |
| Gestão de subempreitadas                          | ✅                   | ✅             | ❌             |
| Diário de obra / registo de ocorrências           | ✅                   | ✅             | ❌             |
| Gestão de contratos de obra                       | ✅                   | ✅             | ❌             |
| Autos de medição                                  | ✅                   | ✅             | ❌             |
| Monitorização do avanço físico (%)                | ✅                   | ✅             | ❌             |
| Integração com Microsoft Project                  | Limitado             | ✅             | ❌             |

---

### 4. Gestão Financeira e Faturas

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Registo de faturas por obra                       | ✅                   | ✅             | ✅             |
| Categorização de faturas                          | ✅                   | ✅             | ✅             |
| Cálculo de despesas totais por obra               | ✅                   | ✅             | ✅             |
| Eliminação de faturas                             | ✅                   | ✅             | ✅             |
| Emissão de faturas a clientes (faturação)         | ✅                   | ✅             | ❌             |
| Conformidade com e-Fatura (AT Portugal)           | ✅                   | ✅             | ❌             |
| SAF-T (PT)                                        | ✅                   | ✅             | ❌             |
| Controlo orçamental vs. custos reais              | ✅                   | ✅             | ❌             |
| Controlo de desvios orçamentais                   | ✅                   | ✅             | ❌             |
| Gestão de adiantamentos e retenções               | ✅                   | ✅             | ❌             |
| Cash flow e projeções financeiras                 | ✅                   | ✅             | ❌             |
| Balancetes e demonstrações financeiras            | ✅                   | Limitado       | ❌             |
| Integração com contabilidade certificada          | ✅                   | Via integração | ❌             |
| Relatórios de rentabilidade por obra              | ✅                   | ✅             | ❌             |

---

### 5. Orçamentação e Estimativas

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Elaboração de orçamentos de obra                  | ✅                   | ✅             | 🚧 (placeholder) |
| Importação de mapas de quantidades (BOQ)          | ✅                   | ✅             | ❌             |
| Análise de preços unitários                       | ✅                   | ✅             | ❌             |
| Composição de preços / fichas de rendimento       | ✅                   | ✅             | ❌             |
| Versões e revisões de orçamento                   | ✅                   | ✅             | ❌             |
| Exportação para Excel / PDF                       | ✅                   | ✅             | ❌             |
| Integração com biblioteca de preços LNEC          | ❌                   | ✅             | ❌             |

---

### 6. Gestão de Recursos Humanos e Equipas

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Registo de colaboradores                          | ✅                   | ✅             | 🚧 (rota /team prevista) |
| Alocação de mão-de-obra a obras                   | ✅                   | ✅             | ❌             |
| Controlo de horas trabalhadas                     | ✅                   | ✅             | ❌             |
| Gestão de equipas e turnos                        | ✅                   | ✅             | ❌             |
| Processamento de salários                         | ✅ (via módulo RH)   | ❌ (externo)   | ❌             |
| Gestão de formação e certificações                | ✅                   | ✅             | ❌             |
| Controlo de EPI e segurança                       | ❌                   | ✅             | ❌             |
| Registo de acidentes de trabalho                  | ❌                   | ✅             | ❌             |

---

### 7. Gestão de Equipamentos e Materiais

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Gestão de stocks / armazém                        | ✅                   | ✅             | ❌             |
| Requisições de material                           | ✅                   | ✅             | ❌             |
| Gestão de compras e encomendas                    | ✅                   | ✅             | ❌             |
| Controlo de equipamentos e máquinas               | ✅                   | ✅             | ❌             |
| Manutenção de equipamentos                        | Limitado             | ✅             | ❌             |
| Custo de equipamento por obra                     | ✅                   | ✅             | ❌             |
| Rastreabilidade de materiais                      | ✅                   | ✅             | ❌             |

---

### 8. Qualidade, Segurança e Ambiente (QSA)

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Plano de qualidade de obra                        | ❌                   | ✅             | ❌             |
| Fichas de inspeção e ensaio (FIE)                 | ❌                   | ✅             | ❌             |
| Plano de segurança e saúde (PSS)                  | ❌                   | ✅             | ❌             |
| Registo de não conformidades                      | ❌                   | ✅             | ❌             |
| Gestão de ações corretivas                        | ❌                   | ✅             | ❌             |
| Documentação ambiental                            | ❌                   | ✅             | ❌             |
| Integração com normas ISO 9001 / 14001            | ❌                   | ✅             | ❌             |

---

### 9. Gestão Documental

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Upload de documentos por obra                     | ✅                   | ✅             | ✅ (caderno de encargos .xls/.xlsx) |
| Repositório central de documentos                 | ✅                   | ✅             | ❌             |
| Controlo de versões de documentos                 | ✅                   | ✅             | ❌             |
| Gestão de telas finais                            | ❌                   | ✅             | ❌             |
| Arquivo de projetos (peças desenhadas)            | Limitado             | ✅             | ❌             |
| Workflow de aprovação documental                  | ✅                   | ✅             | ❌             |
| Assinatura digital de documentos                  | ✅                   | Limitado       | ❌             |

---

### 10. Relatórios e Business Intelligence

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Dashboard por obra / por cliente                  | ✅                   | ✅             | ✅ (básico)    |
| Dashboard administrativo global                   | ✅                   | ✅             | ✅ (Master Dashboard) |
| Relatórios standard de obra                       | ✅                   | ✅             | ❌             |
| Relatórios personalizados / ad-hoc                | ✅                   | ✅             | ❌             |
| Exportação para Excel / PDF                       | ✅                   | ✅             | ❌             |
| Integração com Power BI                           | ✅                   | Limitado       | ❌             |
| KPIs de gestão de obra                            | ✅                   | ✅             | ❌             |
| Total de despesas por obra (financeiro básico)    | ✅                   | ✅             | ✅             |

---

### 11. Mobilidade e Acesso Remoto

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| Acesso web (browser)                              | ✅                   | ✅             | ✅             |
| Aplicação móvel nativa (iOS / Android)            | ✅ (PRIMAVERA Go)    | ✅             | ❌             |
| Design responsivo (mobile-first)                  | ✅                   | ✅             | ❌ (não verificado) |
| Trabalho offline (sincronização posterior)        | Limitado             | ✅             | ❌             |

---

### 12. Integração e Interoperabilidade

| Funcionalidade                                    | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|---------------------------------------------------|:--------------------:|:--------------:|:--------------:|
| API REST (backend)                                | ✅                   | ✅             | ✅ (Axios + JWT) |
| Upload de ficheiros para cloud                    | ✅                   | ✅             | ✅ (Cloudinary) |
| Integração nativa com contabilidade               | ✅ (PRIMAVERA ERP)   | Via API        | ❌             |
| Integração com plataformas BIM                    | Limitado             | ✅             | ❌             |
| Importação/Exportação XML / CSV                   | ✅                   | ✅             | ❌             |
| Integração com portais de e-Procurement           | ✅                   | ✅             | ❌             |
| Integração com Microsoft 365                      | ✅                   | Limitado       | ❌             |

---

## Resumo Executivo

| Área                              | OfficeGest PRIMAVERA | SIG Construção | **Nexus Obra** |
|-----------------------------------|:--------------------:|:--------------:|:--------------:|
| Autenticação e Controlo de Acesso | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐        |
| Gestão de Clientes                | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐        | ⭐⭐⭐          |
| Gestão de Obras                   | ⭐⭐⭐⭐            | ⭐⭐⭐⭐⭐      | ⭐⭐            |
| Gestão Financeira                 | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐        | ⭐             |
| Orçamentação                      | ⭐⭐⭐⭐            | ⭐⭐⭐⭐⭐      | 🚧             |
| Recursos Humanos                  | ⭐⭐⭐⭐            | ⭐⭐⭐⭐        | 🚧             |
| Equipamentos e Materiais          | ⭐⭐⭐⭐            | ⭐⭐⭐⭐⭐      | ❌             |
| QSA                               | ⭐⭐                 | ⭐⭐⭐⭐⭐      | ❌             |
| Gestão Documental                 | ⭐⭐⭐⭐            | ⭐⭐⭐⭐⭐      | ⭐             |
| Relatórios e BI                   | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐        | ⭐             |
| Mobilidade                        | ⭐⭐⭐⭐            | ⭐⭐⭐⭐⭐      | ⭐⭐            |
| Integração / Interoperabilidade   | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐        | ⭐⭐            |

---

## Análise de Diferenças: Nexus Obra vs. Concorrentes

### O que o Nexus Obra já implementa (disponível neste repositório)

| Funcionalidade                                          | Detalhe técnico                                            |
|---------------------------------------------------------|------------------------------------------------------------|
| Autenticação JWT com roles                              | `authProvider.tsx`, `useAuth.ts`, `ProtectedRoute.tsx`     |
| 4 níveis de acesso (masterAdmin, Admin, user, guest)    | `roleConfig.ts`                                            |
| Reset de password obrigatório no primeiro login         | `PasswordUpdatePage.tsx`, flag `resetPassword` no user     |
| Rotas protegidas com verificação de role e clientId     | `ProtectedRoute.tsx`, `App.tsx`                            |
| Multi-tenant por `clientId`                             | Toda a autenticação e navegação                            |
| CRUD completo de clientes                               | `ClientList`, `CreateClient`, `EditClient`                 |
| Upload de logótipo do cliente (Cloudinary)              | `CreateClient.tsx`                                         |
| Listagem/pesquisa de clientes por nome, email, telefone | `ClientList.tsx`                                           |
| Estado de subscrição do cliente (ativo/inativo)         | Modelo `Client` em `auth.ts`                               |
| CRUD completo de obras                                  | `ObraList`, `CreateObra`, `EditObra`, `ManageObra`         |
| Pesquisa de obras por nome, localização, estado         | `ObraList.tsx`                                             |
| Estados de obra (planeada, em progresso, concluída, cancelada) | `CreateObra.tsx`, `EditObra.tsx`                   |
| Upload de Caderno de Encargos (.xls/.xlsx, Cloudinary)  | `CreateObra.tsx`, `EditObra.tsx`                           |
| Registo de faturas por obra (descrição, valor, data, categoria) | `ManageObra.tsx`                               |
| Eliminação de faturas                                   | `ManageObra.tsx`                                           |
| Cálculo automático de total de despesas por obra        | `ManageObra.tsx`, modelo `Obra` (`totalExpenses`)          |
| Dashboard por cliente                                   | `DashboardPage.tsx`                                        |
| Master Dashboard (visão global para masterAdmin)        | `MasterDashboard.tsx`                                      |
| Navbar dinâmica baseada no role do utilizador           | `Navbar.tsx`, `roleConfig.ts`                              |
| Logótipo do cliente exibido na navbar                   | `Navbar.tsx`                                               |
| Notificações toast (sucesso/erro)                       | `react-toastify` em todos os componentes                   |

---

### O que falta no Nexus Obra em comparação com OfficeGest PRIMAVERA e SIG Construção

| Área                       | Funcionalidades em falta no Nexus Obra                                                                      | Prioridade sugerida |
|----------------------------|-------------------------------------------------------------------------------------------------------------|---------------------|
| **Gestão de Obras**        | Planeamento de tarefas, Gantt, subempreitadas, diário de obra, autos de medição, % de avanço físico         | 🔴 Alta             |
| **Orçamentação**           | Criação de orçamentos, BOQ, análise de preços, exportação para Excel/PDF                                    | 🔴 Alta (placeholder presente) |
| **Gestão Financeira**      | Faturação a clientes, e-Fatura, SAF-T, controlo orçamental, cash flow, desvios                              | 🔴 Alta             |
| **Perfil de Cliente**      | Morada, NIF, outros dados fiscais e de contacto                                                             | 🟡 Média            |
| **Recursos Humanos**       | Registo de colaboradores, horas trabalhadas, alocação a obras (rota /team prevista mas não implementada)    | 🟡 Média            |
| **Equipamentos/Materiais** | Stocks, compras, equipamentos, manutenção                                                                   | 🟡 Média            |
| **Relatórios e BI**        | Relatórios de obra, exportação, KPIs, dashboard financeiro                                                  | 🟡 Média            |
| **Gestão Documental**      | Repositório de documentos, controlo de versões, telas finais (além do caderno de encargos)                  | 🟡 Média            |
| **QSA**                    | Qualidade, segurança, ambiente — nenhuma funcionalidade presente                                            | 🟢 Baixa (fase futura) |
| **Mobilidade**             | App nativa iOS/Android, design responsivo                                                                   | 🟢 Baixa            |
| **Integração**             | BIM, Microsoft 365, e-Procurement, importação/exportação XML/CSV                                            | 🟢 Baixa            |
| **Segurança**              | 2FA, SSO                                                                                                    | 🟢 Baixa            |
| **Eliminação de clientes** | Funcionalidade de apagar cliente não implementada (apenas edição)                                          | 🟡 Média            |

---

## Pontos Fortes e Fracos

### OfficeGest PRIMAVERA

**✅ Pontos Fortes**
- Integração nativa e robusta com o ecossistema PRIMAVERA (contabilidade, RH, compras)
- Conformidade total com legislação fiscal portuguesa (e-Fatura, SAF-T)
- Forte componente financeira e de gestão empresarial
- Integração com Power BI e Microsoft 365
- Solução amplamente adotada em Portugal, com grande rede de parceiros

**❌ Pontos Fracos**
- Funcionalidades de QSA (Qualidade, Segurança, Ambiente) limitadas
- Menor especialização em processos específicos de obra (BIM, telas finais)
- Trabalho offline na aplicação móvel limitado
- Custo de implementação elevado para PME de menor dimensão

---

### SIG Construção

**✅ Pontos Fortes**
- Elevada especialização no setor da construção
- Módulo de QSA completo (qualidade, segurança, ambiente)
- Melhor integração com plataformas BIM
- Gestão documental avançada (telas finais, peças desenhadas)
- Capacidade de trabalho offline em campo

**❌ Pontos Fracos**
- Módulo financeiro menos completo comparado com PRIMAVERA
- Integração com ecossistemas externos (Microsoft 365, Power BI) mais limitada
- Processamento de salários requer solução externa
- Menor adoção em segmentos fora da construção

---

### Nexus Obra (este repositório)

**✅ Pontos Fortes**
- Arquitetura web moderna (React 19 + TypeScript + Vite), sem instalação local
- Multi-tenant nativo com isolamento por `clientId`
- Controlo de acesso granular por role (masterAdmin, Admin, user, guest)
- CRUD completo de obras com upload de caderno de encargos (Cloudinary)
- Registo básico de faturas e cálculo de despesas por obra
- Codebase aberta e extensível, com design system documentado
- Integração com Cloudinary para armazenamento de ficheiros e imagens

**❌ Pontos Fracos / Lacunas face à concorrência**
- Módulos de orçamentação e faturação fiscal ainda não implementados
- Sem planeamento de obra (Gantt, tarefas, fases)
- Sem gestão de RH, equipamentos, materiais ou QSA
- Sem relatórios ou exportação de dados
- Sem aplicação móvel nativa
- Funcionalidade de eliminação de clientes em falta
- Design responsivo não confirmado para dispositivos móveis

---

## Conclusão

O **Nexus Obra** encontra-se numa fase inicial de desenvolvimento, com as fundações de autenticação, multi-tenancy e gestão básica de obras e faturas já implementadas. Comparativamente com o **OfficeGest PRIMAVERA** e o **SIG Construção** — produtos comerciais maduros com décadas de evolução — o Nexus Obra cobre atualmente uma fração das funcionalidades disponíveis.

As áreas de maior gap são a **orçamentação**, a **gestão financeira fiscal** (e-Fatura, SAF-T), o **planeamento de obra** (Gantt, tarefas) e a **gestão de recursos** (RH, equipamentos, materiais). Estas são também as funcionalidades de maior valor para o mercado de construção português e devem ser priorizadas nas próximas iterações do projeto.

O modelo **multi-tenant web-first** e a arquitetura moderna do Nexus Obra representam uma vantagem diferenciadora face às soluções tradicionais, especialmente para PME que procuram uma solução acessível por browser sem infraestrutura local.

---

*Documento elaborado para efeitos de análise competitiva no contexto do projeto Nexus Obra.*
*Funcionalidades do Nexus Obra baseadas na análise do código-fonte do repositório `hcs-silva/Nexus-Obra-Client`.*
