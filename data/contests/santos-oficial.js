export const contest = {
  "id": "santos-oficial",
  "priority": 3,
  "nome": "Prefeitura de Santos",
  "orgao": "Município de Santos",
  "banca": "IBAM",
  "status": "Em andamento",
  "edital": "Edital nº 71/2026",
  "editalUrl": "https://www.ibamsp-concursos.org.br/informacoes/176/",
  "dataPublicacao": "2026-07-17",
  "dataProva": "2026-09-27",
  "nivel": "Ensino médio",
  "cargoPrincipal": "Oficial de Administração",
  "defaultRoleId": "santos-oficial-administracao",
  "formatos": [
    "multipla_escolha",
    "redacao"
  ],
  "scoringDescription": "+1 por acerto na objetiva; redação avaliada separadamente",
  "criterios": [
    "Prova objetiva em múltipla escolha.",
    "Edital prevê redação de 20 a 30 linhas para cargos indicados; confira convocação e critérios no PDF.",
    "Banco focado em Oficial de Administração, com Legislação Municipal e rotinas administrativas."
  ],
  "roles": [
    {
      "id": "santos-oficial-administracao",
      "nome": "Oficial de Administração",
      "principal": true,
      "escolaridade": "Ensino médio",
      "exam": {
        "formato": "multipla_escolha",
        "totalQuestoes": 50,
        "duracaoMinutos": 240,
        "scoring": {
          "correct": 1,
          "wrong": 0,
          "blank": 0
        },
        "minima": {
          "redacao": 20
        },
        "distribution": [
          {
            "kind": "materia",
            "id": "santos-portugues",
            "label": "Língua Portuguesa",
            "count": 15
          },
          {
            "kind": "materia",
            "id": "santos-matematica",
            "label": "Matemática",
            "count": 10
          },
          {
            "kind": "materia",
            "id": "santos-legislacao",
            "label": "Legislação municipal e serviço público",
            "count": 10
          },
          {
            "kind": "materia",
            "id": "santos-especificos",
            "label": "Conhecimentos específicos administrativos",
            "count": 15
          }
        ],
        "writing": {
          "tipo": "redacao",
          "linhas": "20 a 30 linhas",
          "minima": 20,
          "propostas": [
            "Atendimento público eficiente e linguagem simples na administração municipal.",
            "Uso responsável de dados pessoais na prestação de serviços públicos locais.",
            "Organização documental como garantia de transparência e continuidade administrativa."
          ]
        }
      }
    }
  ],
  "materias": [
    {
      "id": "santos-portugues",
      "nome": "Língua Portuguesa",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Interpretação",
        "Ortografia",
        "Concordância",
        "Regência",
        "Pontuação"
      ]
    },
    {
      "id": "santos-matematica",
      "nome": "Matemática",
      "bloco": "Conhecimentos gerais",
      "assuntos": [
        "Porcentagem",
        "Razões",
        "Problemas",
        "Juros simples",
        "Noções de estatística"
      ]
    },
    {
      "id": "santos-legislacao",
      "nome": "Legislação municipal e serviço público",
      "bloco": "Legislação",
      "assuntos": [
        "Administração municipal",
        "Serviço público",
        "Ética",
        "Direitos e deveres"
      ]
    },
    {
      "id": "santos-especificos",
      "nome": "Conhecimentos específicos administrativos",
      "bloco": "Conhecimentos específicos",
      "assuntos": [
        "Protocolo",
        "Arquivo",
        "Atendimento",
        "Redação oficial",
        "Material e patrimônio"
      ]
    }
  ],
  "studySuggestions": [
    "No IBAM, leia a alternativa inteira: pequenas palavras mudam o sentido de afirmações administrativas.",
    "Treine Português com interpretação e gramática aplicada, porque a banca mistura regra com texto.",
    "Uma vez por semana, escreva redação de 20 a 30 linhas e corrija clareza, coesão e respeito ao tema."
  ]
};
