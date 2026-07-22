export const contest = {
  "id": "ibge",
  "priority": 2,
  "nome": "IBGE",
  "orgao": "Instituto Brasileiro de Geografia e Estatística",
  "banca": "Instituto Avalia",
  "status": "Em andamento",
  "edital": "PSS Censo Agropecuário, Florestal e Aquícola 2026",
  "editalUrl": "https://ftp.ibge.gov.br/edital/PSS_Censo_Agro/2026_02/Edital_2_2026_AC_ACQ_Edital_de_Abertura.pdf",
  "dataPublicacao": "2026-07-07",
  "dataProva": "2026-08-30",
  "nivel": "Ensino médio e superior",
  "cargoPrincipal": "Agente Censitário de Qualidade",
  "defaultRoleId": "ibge-acq",
  "formatos": [
    "multipla_escolha"
  ],
  "scoringDescription": "+1 por acerto, 0 por erro ou branco",
  "criterios": [
    "Prova objetiva com 60 questões de múltipla escolha.",
    "Critérios mínimos do edital devem ser acompanhados no PDF oficial.",
    "Perfis separados para ACQ e Analista em TI/Dados."
  ],
  "roles": [
    {
      "id": "ibge-acq",
      "nome": "Agente Censitário de Qualidade",
      "principal": true,
      "escolaridade": "Ensino médio",
      "exam": {
        "formato": "multipla_escolha",
        "totalQuestoes": 60,
        "duracaoMinutos": 240,
        "scoring": {
          "correct": 1,
          "wrong": 0,
          "blank": 0
        },
        "minima": {
          "totalPercent": 40,
          "disciplinaPercent": 30
        },
        "distribution": [
          {
            "kind": "materia",
            "id": "ibge-acq-portugues",
            "label": "Língua Portuguesa",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "ibge-acq-rlm",
            "label": "Raciocínio Lógico/Matemático",
            "count": 10
          },
          {
            "kind": "materia",
            "id": "ibge-acq-geografia",
            "label": "Geografia",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "ibge-acq-tecnicos",
            "label": "Conhecimentos técnicos",
            "count": 20
          }
        ]
      }
    },
    {
      "id": "ibge-analista-ti-dados",
      "nome": "Analista Censitário — TI, Desenvolvimento e Ciência de Dados",
      "principal": false,
      "escolaridade": "Ensino superior",
      "exam": {
        "formato": "multipla_escolha",
        "totalQuestoes": 60,
        "duracaoMinutos": 240,
        "scoring": {
          "correct": 1,
          "wrong": 0,
          "blank": 0
        },
        "minima": {
          "totalPercent": 40,
          "disciplinaPercent": 30
        },
        "distribution": [
          {
            "kind": "materia",
            "id": "ibge-ana-portugues",
            "label": "Língua Portuguesa",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "ibge-ana-rlm",
            "label": "Raciocínio Lógico/Matemático",
            "count": 10
          },
          {
            "kind": "materia",
            "id": "ibge-ana-especificos",
            "label": "Conhecimentos específicos de TI e Dados",
            "count": 35
          }
        ]
      }
    }
  ],
  "materias": [
    {
      "id": "ibge-acq-portugues",
      "roleIds": [
        "ibge-acq"
      ],
      "nome": "Língua Portuguesa",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Interpretação",
        "Gramática",
        "Coesão",
        "Pontuação"
      ]
    },
    {
      "id": "ibge-acq-rlm",
      "roleIds": [
        "ibge-acq"
      ],
      "nome": "Raciocínio Lógico/Matemático",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Porcentagem",
        "Razões",
        "Probabilidade",
        "Lógica"
      ]
    },
    {
      "id": "ibge-acq-geografia",
      "roleIds": [
        "ibge-acq"
      ],
      "nome": "Geografia",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Território",
        "População",
        "Cartografia",
        "Brasil regional"
      ]
    },
    {
      "id": "ibge-acq-tecnicos",
      "roleIds": [
        "ibge-acq"
      ],
      "nome": "Conhecimentos técnicos",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Censos",
        "Coleta",
        "Qualidade",
        "Sigilo estatístico"
      ]
    },
    {
      "id": "ibge-ana-portugues",
      "roleIds": [
        "ibge-analista-ti-dados"
      ],
      "nome": "Língua Portuguesa",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Interpretação",
        "Coesão",
        "Sintaxe",
        "Pontuação"
      ]
    },
    {
      "id": "ibge-ana-rlm",
      "roleIds": [
        "ibge-analista-ti-dados"
      ],
      "nome": "Raciocínio Lógico/Matemático",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Lógica",
        "Probabilidade",
        "Análise combinatória",
        "Estatística básica"
      ]
    },
    {
      "id": "ibge-ana-especificos",
      "roleIds": [
        "ibge-analista-ti-dados"
      ],
      "nome": "Conhecimentos específicos de TI e Dados",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Algoritmos",
        "Banco de dados",
        "Engenharia de software",
        "APIs",
        "Segurança",
        "Ciência de dados",
        "LGPD/LAI"
      ]
    }
  ],
  "studySuggestions": [
    "Para ACQ, alterne Geografia e Conhecimentos Técnicos: qualidade de coleta costuma exigir leitura atenta de contexto.",
    "Para Analista, faça blocos curtos de banco de dados, algoritmos e segurança, sempre com revisão de erros.",
    "Treine múltipla escolha eliminando alternativas: Instituto Avalia tende a cobrar precisão conceitual."
  ]
};
