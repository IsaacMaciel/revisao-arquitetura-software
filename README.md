# Revisão de Arquitetura de Software

Material de revisão para a prova final da pós-graduação em **Arquitetura de Software** — denso, escaneável e pensado para provas de múltipla escolha. Cada tópico é uma página própria com definições precisas, tabelas comparativas, quizzes no estilo da prova, flashcards e mnemônicos.

🔗 **Acesse o site:** https://isaacmaciel.github.io/revisao-arquitetura-software/

## Tópicos

| Nº | Tópico | Conteúdo |
|----|--------|----------|
| 01 | Domain-Driven Design | Linguagem ubíqua, bounded contexts, building blocks táticos, Event Storming, Domain Storytelling |
| 02 | Clean Architecture | Regra da Dependência, círculos concêntricos, SOLID, paradigmas, componentes |
| 03 | Terraform | IaC, providers/tfstate, módulos, count/for_each, infra AWS |
| 04 | Docker | Container × VM, imagens/Dockerfile, orquestração, multi-stage, ECS |
| 05 | DevOps · CI/CD | CALMS, CI × Delivery × Deployment, pipelines, GitHub Actions, deploy strategies |
| 06 | Microsserviços: Fundamentos & Comunicação | Monólito × micro, decomposição, sync × async, API Gateway/BFF |
| 07 | Microsserviços: Dados & Deploy | Database per Service, CQRS, Event Sourcing, consistência, testes de contrato |
| 08 | Microsserviços: Resiliência | Circuit Breaker, retry/timeout/bulkhead, observabilidade, Service Mesh, Chaos |
| 09 | Microsserviços: SAGA Pattern | Transação distribuída, orquestração × coreografia, compensação, ACID × BASE |
| 10 | LGPD · Comunicação · Gestão | Privacidade de dados, comunicação/negociação, gestão de times |
| 11 | Kubernetes & AWS EKS | Arquitetura, Pods/Services/ConfigMap, workloads, volumes, probes, HPA, EFK, Helm, EKS, RBAC |
| 12 | Segurança & OWASP Top 10 | Security by Design, normas, SQLi/XSS/buffer overflow, licenças e supply chain, SonarQube, OWASP Top 10 2017 × 2021, Well-Architected, Security Hub |

## Stack

Site 100% estático — HTML + CSS + JavaScript vanilla, sem build nem dependências (exceto Google Fonts via CDN). Funciona offline abrindo qualquer `.html` no navegador.

```
.
├── index.html              # Hub: lista todos os tópicos
├── <tópico>.html           # Uma página por tópico
└── assets/
    ├── theme.css           # Tema compartilhado (dark, editorial)
    └── study.js            # Quiz, flashcards, scrollspy, barra de progresso
```

## Créditos & contribuição

Idealizado e organizado por **Isaac Maciel** — [LinkedIn](https://www.linkedin.com/in/isaac-maciel-araujo/).

Projeto de estudo aberto. Encontrou um erro, quer revisar/aprofundar um tópico ou sugerir um novo? Abra uma issue ou me chame no LinkedIn.
