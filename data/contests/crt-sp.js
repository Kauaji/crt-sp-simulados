export const contest = {
  "id": "crt-sp",
  "priority": 1,
  "nome": "CRT-SP",
  "orgao": "Conselho Regional dos Técnicos Industriais do Estado de São Paulo",
  "banca": "Quadrix",
  "status": "Em andamento",
  "edital": "Edital nº 1/2026",
  "editalUrl": "https://quadrix.org.br/informacoes/3048/",
  "dataPublicacao": "2026-05-18",
  "dataProva": "2026-08-02",
  "nivel": "Ensino médio",
  "cargoPrincipal": "Técnico Administrativo — Baixada Santista",
  "defaultRoleId": "crt-tecnico-administrativo-bs",
  "formatos": [
    "certo_errado"
  ],
  "scoringDescription": "+1 por acerto, −1 por erro, 0 em branco",
  "criterios": [
    "Prova objetiva no padrão Certo/Errado da Quadrix.",
    "Pontuação líquida com penalização por erro.",
    "Sem redação/prova discursiva para Técnico Administrativo e Fiscal no recorte implementado."
  ],
  "roles": [
    {
      "id": "crt-tecnico-administrativo-bs",
      "nome": "Técnico Administrativo — Baixada Santista",
      "principal": true,
      "escolaridade": "Ensino médio",
      "exam": {
        "formato": "certo_errado",
        "totalQuestoes": 120,
        "duracaoMinutos": 180,
        "scoring": {
          "correct": 1,
          "wrong": -1,
          "blank": 0
        },
        "minima": {
          "total": 36,
          "Conhecimentos básicos": 10,
          "Conhecimentos complementares": 8,
          "Conhecimentos específicos": 17
        },
        "distribution": [
          {
            "kind": "bloco",
            "id": "Conhecimentos básicos",
            "label": "Conhecimentos básicos",
            "count": 40
          },
          {
            "kind": "bloco",
            "id": "Conhecimentos complementares",
            "label": "Conhecimentos complementares",
            "count": 30
          },
          {
            "kind": "bloco",
            "id": "Conhecimentos específicos",
            "label": "Conhecimentos específicos",
            "count": 50
          }
        ]
      }
    },
    {
      "id": "crt-fiscal-bs",
      "nome": "Fiscal — Baixada Santista",
      "principal": false,
      "escolaridade": "Ensino médio/técnico conforme edital",
      "exam": {
        "formato": "certo_errado",
        "totalQuestoes": 120,
        "duracaoMinutos": 180,
        "scoring": {
          "correct": 1,
          "wrong": -1,
          "blank": 0
        },
        "minima": {
          "total": 36,
          "Conhecimentos básicos": 10,
          "Conhecimentos complementares": 8,
          "Conhecimentos específicos": 17
        },
        "distribution": [
          {
            "kind": "bloco",
            "id": "Conhecimentos básicos",
            "label": "Conhecimentos básicos",
            "count": 40
          },
          {
            "kind": "bloco",
            "id": "Conhecimentos complementares",
            "label": "Conhecimentos complementares",
            "count": 30
          },
          {
            "kind": "bloco",
            "id": "Conhecimentos específicos",
            "label": "Conhecimentos específicos",
            "count": 50
          }
        ]
      }
    }
  ],
  "materias": [
    {
      "id": "crt-portugues",
      "nome": "Português",
      "bloco": "Conhecimentos básicos",
      "assuntos": [
        "Interpretação",
        "Crase",
        "Concordância",
        "Regência",
        "Pontuação",
        "Coesão"
      ]
    },
    {
      "id": "crt-rlm",
      "nome": "Raciocínio Lógico/Matemática",
      "bloco": "Conhecimentos básicos",
      "assuntos": [
        "Porcentagem",
        "Proposições",
        "Conjuntos",
        "Sequências",
        "Regra de três"
      ]
    },
    {
      "id": "crt-informatica",
      "nome": "Informática",
      "bloco": "Conhecimentos básicos",
      "assuntos": [
        "Segurança da informação",
        "Pacote Office",
        "Internet",
        "Nuvem",
        "LGPD aplicada"
      ]
    },
    {
      "id": "crt-etica",
      "nome": "Ética",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Ética no serviço",
        "Conduta",
        "Integridade"
      ]
    },
    {
      "id": "crt-adm-publica",
      "nome": "Administração Pública",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Princípios",
        "Organização administrativa",
        "Atos administrativos"
      ]
    },
    {
      "id": "crt-lai",
      "nome": "LAI",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Transparência ativa",
        "Transparência passiva",
        "Sigilo"
      ]
    },
    {
      "id": "crt-lgpd",
      "nome": "LGPD",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Princípios",
        "Bases legais",
        "Dados sensíveis",
        "Poder público"
      ]
    },
    {
      "id": "crt-improbidade",
      "nome": "Lei 8.429/1992",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Dolo",
        "Sanções",
        "Atos de improbidade"
      ]
    },
    {
      "id": "crt-processo-adm",
      "nome": "Lei 9.784/1999",
      "bloco": "Conhecimentos complementares",
      "assuntos": [
        "Princípios",
        "Motivação",
        "Competência",
        "Recursos"
      ]
    },
    {
      "id": "crt-adm-geral",
      "nome": "Administração Geral e Pública",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Funções administrativas",
        "Planejamento",
        "Controle",
        "Qualidade"
      ]
    },
    {
      "id": "crt-rotinas",
      "nome": "Rotinas administrativas",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Checklists",
        "Triagem",
        "Fluxos",
        "Rastreabilidade"
      ]
    },
    {
      "id": "crt-redacao",
      "nome": "Redação oficial",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Clareza",
        "Impessoalidade",
        "Concisão",
        "Padronização"
      ]
    },
    {
      "id": "crt-protocolo",
      "nome": "Protocolo e arquivo",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Autuação",
        "Temporalidade",
        "Arquivo corrente",
        "Tramitação"
      ]
    },
    {
      "id": "crt-atendimento",
      "nome": "Atendimento ao público",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Escuta ativa",
        "Linguagem simples",
        "Inclusão",
        "Encaminhamento"
      ]
    },
    {
      "id": "crt-materiais",
      "nome": "Materiais e estoques",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Curva ABC",
        "PEPS",
        "Inventário",
        "Estoque de segurança"
      ]
    },
    {
      "id": "crt-logistica",
      "nome": "Logística",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Armazenagem",
        "Lead time",
        "Distribuição"
      ]
    },
    {
      "id": "crt-licitacoes",
      "nome": "Licitações e contratos",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Lei 14.133/2021",
        "Pregão",
        "Dispensa",
        "Fiscalização contratual"
      ]
    },
    {
      "id": "crt-sistema",
      "nome": "Sistema CFT/CRT-SP",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Lei 13.639/2018",
        "Lei 5.524/1968",
        "Decretos",
        "Regimento",
        "Resoluções CFT"
      ]
    }
  ],
  "studySuggestions": [
    "Priorize lei seca do Sistema CFT/CRT-SP nos dias de baixa energia: é conteúdo de alta cobrança e baixo ruído.",
    "Faça 40 itens Certo/Errado por dia e revise os erros antes de abrir matéria nova.",
    "Em Português, corrija a justificativa: a Quadrix costuma cobrar a razão da regra, não só o resultado."
  ]
};
