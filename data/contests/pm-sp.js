export const contest = {
  "id": "pm-sp",
  "priority": 4,
  "nome": "PM-SP",
  "orgao": "Polícia Militar do Estado de São Paulo",
  "banca": "VUNESP",
  "status": "Inscrições abertas",
  "edital": "Edital DP-3/321/26",
  "editalUrl": "https://www.vunesp.com.br/PMES2601",
  "dataPublicacao": "2026-06-03",
  "dataProva": "2026-09-20",
  "nivel": "Ensino médio",
  "cargoPrincipal": "Aluno-Soldado PM do Quadro de Praças",
  "defaultRoleId": "pmsp-aluno-soldado-qp",
  "formatos": [
    "multipla_escolha",
    "redacao"
  ],
  "scoringDescription": "+1 por acerto na objetiva; redação/dissertativa avaliada separadamente",
  "criterios": [
    "Prova objetiva de múltipla escolha no padrão VUNESP.",
    "Exames de Conhecimentos com Parte I objetiva e Parte II dissertativa/redação no mesmo dia.",
    "Duração total de 5 horas para objetiva e dissertativa, conforme divulgação oficial do Governo SP."
  ],
  "roles": [
    {
      "id": "pmsp-aluno-soldado-qp",
      "nome": "Aluno-Soldado PM do Quadro de Praças",
      "principal": true,
      "escolaridade": "Ensino médio completo",
      "exam": {
        "formato": "multipla_escolha",
        "totalQuestoes": 60,
        "duracaoMinutos": 300,
        "scoring": {
          "correct": 1,
          "wrong": 0,
          "blank": 0
        },
        "minima": {
          "objetiva": 30,
          "redacao": 20
        },
        "distribution": [
          {
            "kind": "materia",
            "id": "pmsp-portugues",
            "label": "Língua Portuguesa e Interpretação de Texto",
            "count": 20
          },
          {
            "kind": "materia",
            "id": "pmsp-matematica",
            "label": "Matemática",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "pmsp-conhecimentos-gerais",
            "label": "Conhecimentos Gerais",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "pmsp-informatica",
            "label": "Noções Básicas de Informática",
            "count": 5
          },
          {
            "kind": "materia",
            "id": "pmsp-administracao-publica",
            "label": "Noções de Administração Pública",
            "count": 5
          }
        ],
        "writing": {
          "tipo": "redacao",
          "linhas": "texto dissertativo em padrão VUNESP",
          "minima": 20,
          "propostas": [
            "O papel da Polícia Militar na proteção da vida e na preservação da ordem pública.",
            "Tecnologia, cidadania e limites éticos no policiamento ostensivo.",
            "Respeito aos direitos humanos como fundamento da atuação policial."
          ]
        }
      }
    }
  ],
  "materias": [
    {
      "id": "pmsp-portugues",
      "nome": "Língua Portuguesa e Interpretação de Texto",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Interpretação",
        "Coesão",
        "Concordância",
        "Regência",
        "Pontuação"
      ]
    },
    {
      "id": "pmsp-matematica",
      "nome": "Matemática",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Porcentagem",
        "Razão e proporção",
        "Equações",
        "Geometria",
        "Estatística"
      ]
    },
    {
      "id": "pmsp-conhecimentos-gerais",
      "nome": "Conhecimentos Gerais",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Atualidades",
        "História do Brasil",
        "Geografia do Brasil",
        "Cidadania",
        "Segurança pública"
      ]
    },
    {
      "id": "pmsp-informatica",
      "nome": "Noções Básicas de Informática",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Internet",
        "Segurança da informação",
        "Pacote Office",
        "Sistemas operacionais"
      ]
    },
    {
      "id": "pmsp-administracao-publica",
      "nome": "Noções de Administração Pública",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Constituição Federal",
        "Constituição do Estado de São Paulo",
        "Lei de Acesso à Informação",
        "Princípios administrativos"
      ]
    }
  ],
  "studySuggestions": [
    "Treine objetiva e redação no mesmo bloco de estudo para simular a gestão real das 5 horas.",
    "Em VUNESP, leia todas as alternativas antes de marcar: duas costumam parecer boas, mas uma é mais precisa.",
    "Intercale Português/Matemática com Conhecimentos Gerais para não deixar a parte de base roubar energia da redação."
  ]
};
