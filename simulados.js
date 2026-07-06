// Banco autoral usado pelo sorteio determinístico diário.
// gabarito: "C" para Certo ou "E" para Errado.
const BANCO_QUESTOES = [
    {
      id: 1,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "No aviso “Os documentos enviados pelo candidato foram conferidos pela equipe”, a substituição de “pela equipe” por “a equipe” preservaria a correção gramatical e o sentido original.",
      gabarito: "E",
      comentario: "Na voz passiva, “pela equipe” é agente da passiva. A troca direta por “a equipe” deixa a oração sem estrutura sintática adequada e não preserva o sentido."
    },
    {
      id: 2,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Na frase “O atendimento foi suspenso porque o sistema estava indisponível”, a conjunção “porque” introduz a causa da suspensão.",
      gabarito: "C",
      comentario: "A oração iniciada por “porque” apresenta a causa de o atendimento ter sido suspenso."
    },
    {
      id: 3,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Em “Informamos aos profissionais que o prazo foi prorrogado”, o emprego de vírgula imediatamente após “profissionais” é obrigatório.",
      gabarito: "E",
      comentario: "A oração “que o prazo foi prorrogado” completa o sentido de “informamos”. Não se deve separar por vírgula o verbo de seus complementos."
    },
    {
      id: 4,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "No trecho “A servidora referiu-se à nova resolução”, o acento indicativo de crase resulta da união da preposição exigida por “referir-se” com o artigo feminino que antecede “nova resolução”.",
      gabarito: "C",
      comentario: "O verbo pronominal “referir-se” rege a preposição “a”, e o substantivo feminino determinado admite o artigo “a”: a + a = à."
    },
    {
      id: 5,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "A forma “Houveram muitas solicitações no protocolo” está de acordo com a norma-padrão, pois o verbo concorda com “muitas solicitações”.",
      gabarito: "E",
      comentario: "Com sentido de existir, “haver” é impessoal e fica na terceira pessoa do singular: “Houve muitas solicitações”."
    },
    {
      id: 6,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Se todo processo urgente recebe uma etiqueta vermelha e o processo 248 não recebeu etiqueta vermelha, então é válido concluir que o processo 248 não é urgente.",
      gabarito: "C",
      comentario: "É uma aplicação de modus tollens: se urgente implica etiqueta vermelha, a ausência da etiqueta permite negar que o processo seja urgente."
    },
    {
      id: 7,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Uma equipe analisou 80 processos na segunda-feira e 100 na terça-feira. Logo, a produção de terça foi 20% maior que a de segunda.",
      gabarito: "E",
      comentario: "O aumento foi de 20 sobre uma base de 80: 20/80 = 25%. Portanto, a produção foi 25% maior."
    },
    {
      id: 8,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "A negação de “Todos os requerimentos foram respondidos” pode ser expressa por “Pelo menos um requerimento não foi respondido”.",
      gabarito: "C",
      comentario: "A negação de uma proposição universal afirmativa é uma proposição existencial negativa."
    },
    {
      id: 9,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Se 3 servidores, com a mesma produtividade, cadastram 180 documentos em 2 horas, então 5 servidores cadastrarão 300 documentos no mesmo período.",
      gabarito: "C",
      comentario: "Cada servidor cadastra 30 documentos por hora. Em 2 horas, 5 servidores cadastram 5 × 2 × 30 = 300."
    },
    {
      id: 10,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "Em uma planilha, a fórmula =SOMA(B2:B6) adiciona os valores das células B2, B3, B4, B5 e B6.",
      gabarito: "C",
      comentario: "Os dois-pontos indicam um intervalo contínuo, incluindo as duas extremidades."
    },
    {
      id: 11,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "Manter cópias de segurança apenas no mesmo disco físico dos arquivos originais protege os dados contra a falha total desse disco.",
      gabarito: "E",
      comentario: "Se o disco falhar, originais e cópias podem ser perdidos juntos. Backups devem incluir mídia ou localização separada."
    },
    {
      id: 12,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "O uso de autenticação em dois fatores reduz o risco de acesso indevido mesmo quando a senha do usuário é descoberta por terceiro.",
      gabarito: "C",
      comentario: "O segundo fator cria uma barreira adicional; conhecer apenas a senha tende a não ser suficiente para concluir o acesso."
    },
    {
      id: 13,
      bloco: "Conhecimentos complementares",
      assunto: "Ética no serviço público",
      enunciado: "Um atendente que favoreça conhecido na fila, ainda que não receba vantagem financeira, viola a impessoalidade esperada na atuação pública.",
      gabarito: "C",
      comentario: "O favorecimento pessoal contraria o tratamento isonômico e impessoal, independentemente de haver ganho financeiro."
    },
    {
      id: 14,
      bloco: "Conhecimentos complementares",
      assunto: "Administração Pública",
      enunciado: "Pelo princípio da publicidade, todos os documentos administrativos devem ser divulgados integralmente, sem qualquer hipótese de restrição de acesso.",
      gabarito: "E",
      comentario: "A publicidade não é absoluta. A Constituição e as leis admitem restrição, por exemplo, para proteger dados pessoais e informações legalmente sigilosas."
    },
    {
      id: 15,
      bloco: "Conhecimentos complementares",
      assunto: "Lei de Acesso à Informação (LAI)",
      enunciado: "A LAI adota como diretriz a publicidade como preceito geral e o sigilo como exceção.",
      gabarito: "C",
      comentario: "Essa é uma diretriz expressa da Lei nº 12.527/2011, que privilegia o acesso e exige fundamento legal para restringi-lo."
    },
    {
      id: 16,
      bloco: "Conhecimentos complementares",
      assunto: "Lei Geral de Proteção de Dados (LGPD)",
      enunciado: "Para a LGPD, dado anonimizado é sempre considerado dado pessoal, ainda que a anonimização não possa ser revertida por meios razoáveis.",
      gabarito: "E",
      comentario: "Em regra, dado efetivamente anonimizado não é dado pessoal para fins da LGPD, salvo quando o processo puder ser revertido com meios próprios ou esforços razoáveis."
    },
    {
      id: 17,
      bloco: "Conhecimentos complementares",
      assunto: "Lei nº 8.429/1992",
      enunciado: "Após as alterações da Lei de Improbidade Administrativa, a configuração dos atos tipificados nos artigos 9º, 10 e 11 exige conduta dolosa.",
      gabarito: "C",
      comentario: "A Lei nº 8.429/1992, na redação vigente, considera atos de improbidade as condutas dolosas tipificadas nesses artigos."
    },
    {
      id: 18,
      bloco: "Conhecimentos complementares",
      assunto: "Lei nº 9.784/1999",
      enunciado: "Nos processos administrativos, a Administração deve observar, entre outros, os princípios da motivação, razoabilidade, proporcionalidade, ampla defesa e contraditório.",
      gabarito: "C",
      comentario: "Esses princípios constam expressamente do artigo 2º da Lei nº 9.784/1999."
    },
    {
      id: 19,
      bloco: "Conhecimentos complementares",
      assunto: "Lei nº 9.784/1999",
      enunciado: "A competência administrativa pode ser renunciada pelo órgão sempre que o agente considerar conveniente.",
      gabarito: "E",
      comentario: "A competência é irrenunciável e deve ser exercida pelo órgão a que foi atribuída, ressalvadas as hipóteses legais de delegação e avocação."
    },
    {
      id: 20,
      bloco: "Conhecimentos complementares",
      assunto: "Administração Pública",
      enunciado: "O CRT-SP, criado no sistema instituído pela Lei nº 13.639/2018, possui natureza de autarquia com autonomia administrativa e financeira.",
      gabarito: "C",
      comentario: "A Lei nº 13.639/2018 criou os conselhos federais e regionais como autarquias, dotadas de autonomia administrativa e financeira e estrutura federativa."
    },
    {
      id: 21,
      bloco: "Conhecimentos específicos",
      assunto: "Administração Geral",
      enunciado: "Na função administrativa de controle, comparam-se os resultados alcançados com padrões definidos, permitindo a adoção de medidas corretivas.",
      gabarito: "C",
      comentario: "Controle envolve estabelecer ou utilizar padrões, medir o desempenho, comparar resultados e corrigir desvios."
    },
    {
      id: 22,
      bloco: "Conhecimentos específicos",
      assunto: "Administração Geral",
      enunciado: "A descentralização decisória elimina a necessidade de coordenação entre unidades organizacionais.",
      gabarito: "E",
      comentario: "Distribuir decisões pode aumentar agilidade, mas continua exigindo coordenação para alinhar objetivos, fluxos e responsabilidades."
    },
    {
      id: 23,
      bloco: "Conhecimentos específicos",
      assunto: "Rotinas administrativas",
      enunciado: "Em uma rotina padronizada, registrar responsáveis, prazos e pontos de conferência favorece a rastreabilidade das tarefas.",
      gabarito: "C",
      comentario: "Esses registros permitem saber quem fez o quê, quando e sob quais verificações, reduzindo falhas e facilitando auditoria."
    },
    {
      id: 24,
      bloco: "Conhecimentos específicos",
      assunto: "Redação oficial",
      enunciado: "A redação oficial deve privilegiar clareza, precisão, objetividade, concisão, coesão, coerência, impessoalidade, formalidade e padronização.",
      gabarito: "C",
      comentario: "Esses atributos orientam a comunicação oficial, permitindo compreensão uniforme e adequada dos atos administrativos."
    },
    {
      id: 25,
      bloco: "Conhecimentos específicos",
      assunto: "Redação oficial",
      enunciado: "Para tornar um ofício mais cordial, recomenda-se empregar linguagem rebuscada e opiniões pessoais do redator.",
      gabarito: "E",
      comentario: "Comunicação oficial pede clareza, objetividade e impessoalidade. Rebuscamento e opiniões pessoais prejudicam esses atributos."
    },
    {
      id: 26,
      bloco: "Conhecimentos específicos",
      assunto: "Protocolo e arquivo",
      enunciado: "A autuação de um processo administrativo reúne e formaliza documentos relacionados a um assunto, com identificação própria para sua tramitação e controle.",
      gabarito: "C",
      comentario: "Autuar é constituir formalmente o processo, organizando suas peças e atribuindo identificação que possibilite acompanhar sua tramitação."
    },
    {
      id: 27,
      bloco: "Conhecimentos específicos",
      assunto: "Protocolo e arquivo",
      enunciado: "Documentos de uso frequente pela unidade produtora, necessários às atividades em andamento, integram tipicamente o arquivo permanente.",
      gabarito: "E",
      comentario: "Documentos em uso frequente e ligados a atividades correntes pertencem ao arquivo corrente, não ao permanente."
    },
    {
      id: 28,
      bloco: "Conhecimentos específicos",
      assunto: "Atendimento ao público",
      enunciado: "Diante de uma reclamação, a escuta ativa inclui confirmar o entendimento da demanda antes de orientar o usuário.",
      gabarito: "C",
      comentario: "Confirmar o que foi compreendido reduz ruídos, demonstra atenção e permite oferecer orientação mais adequada."
    },
    {
      id: 29,
      bloco: "Conhecimentos específicos",
      assunto: "Atendimento ao público",
      enunciado: "No atendimento inclusivo, o servidor deve falar exclusivamente com o acompanhante de uma pessoa com deficiência, ainda que ela possa se comunicar diretamente.",
      gabarito: "E",
      comentario: "O atendimento deve dirigir-se à própria pessoa, respeitando sua autonomia; o acompanhante auxilia quando necessário ou solicitado."
    },
    {
      id: 30,
      bloco: "Conhecimentos específicos",
      assunto: "Materiais e estoques",
      enunciado: "O estoque de segurança busca reduzir o risco de falta de material diante de oscilações de consumo ou atrasos de reposição.",
      gabarito: "C",
      comentario: "Ele funciona como uma reserva para absorver incertezas de demanda e de prazo de entrega."
    },
    {
      id: 31,
      bloco: "Conhecimentos específicos",
      assunto: "Materiais e estoques",
      enunciado: "Pelo método PEPS, os itens que entraram mais recentemente no estoque são os primeiros a sair.",
      gabarito: "E",
      comentario: "PEPS significa “primeiro que entra, primeiro que sai”; portanto, saem antes os itens mais antigos."
    },
    {
      id: 32,
      bloco: "Conhecimentos específicos",
      assunto: "Logística",
      enunciado: "O prazo de reposição, ou lead time, deve ser considerado na definição do momento de emitir um novo pedido de material.",
      gabarito: "C",
      comentario: "O ponto de pedido precisa considerar o consumo durante o período entre a solicitação e a efetiva disponibilidade do item."
    },
    {
      id: 33,
      bloco: "Conhecimentos específicos",
      assunto: "Licitações e contratos",
      enunciado: "Na Lei nº 14.133/2021, o pregão é modalidade obrigatória para aquisição de bens e serviços comuns, cujo critério pode ser o de menor preço ou maior desconto.",
      gabarito: "C",
      comentario: "A nova Lei de Licitações define o pregão para bens e serviços comuns e admite menor preço ou maior desconto."
    },
    {
      id: 34,
      bloco: "Conhecimentos específicos",
      assunto: "Licitações e contratos",
      enunciado: "A inexigibilidade de licitação ocorre quando há competição viável entre diversos fornecedores, mas a Administração prefere contratar diretamente.",
      gabarito: "E",
      comentario: "A inexigibilidade pressupõe inviabilidade de competição. Preferência administrativa, isoladamente, não autoriza contratação direta."
    },
    {
      id: 35,
      bloco: "Conhecimentos específicos",
      assunto: "Lei nº 13.639/2018",
      enunciado: "A função dos conselhos criados pela Lei nº 13.639/2018 inclui orientar, disciplinar e fiscalizar o exercício profissional das respectivas categorias.",
      gabarito: "C",
      comentario: "Essa tríade de funções está prevista no artigo 3º da Lei nº 13.639/2018."
    },
    {
      id: 36,
      bloco: "Conhecimentos específicos",
      assunto: "Lei nº 5.524/1968",
      enunciado: "A Lei nº 5.524/1968 inclui, no campo de atuação do técnico industrial de nível médio, a assistência técnica na compra, venda e utilização de produtos e equipamentos especializados.",
      gabarito: "C",
      comentario: "A atividade consta expressamente do artigo 2º, inciso IV, da Lei nº 5.524/1968."
    },
    {
      id: 37,
      bloco: "Conhecimentos específicos",
      assunto: "Decreto nº 90.922/1985",
      enunciado: "O Decreto nº 90.922/1985 regulamenta a Lei nº 5.524/1968 quanto ao exercício das profissões de técnico industrial e técnico agrícola de nível médio.",
      gabarito: "C",
      comentario: "Esse é o objeto central do decreto, que detalha atribuições e condições do exercício profissional."
    },
    {
      id: 38,
      bloco: "Conhecimentos específicos",
      assunto: "Decreto nº 4.560/2002",
      enunciado: "O Decreto nº 4.560/2002 alterou o Decreto nº 90.922/1985, incluindo previsões relacionadas às atribuições dos técnicos agrícolas.",
      gabarito: "C",
      comentario: "O Decreto nº 4.560/2002 promoveu alterações no regulamento, especialmente em dispositivos referentes aos técnicos agrícolas."
    },
    {
      id: 39,
      bloco: "Conhecimentos específicos",
      assunto: "Regimento Interno do CRT-SP",
      enunciado: "Conforme a estrutura legal dos conselhos regionais e o Regimento Interno do CRT-SP, o Plenário é órgão deliberativo, não mero setor de execução de rotinas administrativas.",
      gabarito: "C",
      comentario: "O Plenário exerce função deliberativa. A execução administrativa cabe à estrutura executiva e às unidades organizacionais competentes."
    },
    {
      id: 40,
      bloco: "Conhecimentos específicos",
      assunto: "Resoluções CFT",
      enunciado: "As resoluções do CFT podem disciplinar atribuições profissionais e o funcionamento do Sistema CFT/CRTs, desde que observados os limites da legislação aplicável.",
      gabarito: "C",
      comentario: "O poder normativo do CFT permite detalhar matérias do sistema, mas os atos infralegais permanecem subordinados às leis e aos demais atos superiores."
    },
    {
      id: 41,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Na comunicação “Seguem anexos os comprovantes solicitados”, a forma “anexos” concorda corretamente com “comprovantes”.",
      gabarito: "C",
      comentario: "Quando empregado como adjetivo, “anexo” varia em gênero e número para concordar com o substantivo a que se refere."
    },
    {
      id: 42,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Em “Faz dois meses que o setor adotou o novo procedimento”, substituir “Faz” por “Fazem” manteria a correção gramatical.",
      gabarito: "E",
      comentario: "Ao indicar tempo decorrido, o verbo fazer é impessoal e permanece na terceira pessoa do singular."
    },
    {
      id: 43,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "No período “Embora o sistema estivesse lento, a equipe concluiu os registros”, a oração iniciada por “Embora” expressa concessão.",
      gabarito: "C",
      comentario: "A lentidão poderia impedir a conclusão, mas não a impediu; por isso, a relação semântica é concessiva."
    },
    {
      id: 44,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Na frase “É necessária a conferência dos dados”, a concordância de “necessária” com o substantivo determinado por artigo está adequada.",
      gabarito: "C",
      comentario: "Com o substantivo determinado por artigo, a expressão adjetiva concorda com ele: “é necessária a conferência”."
    },
    {
      id: 45,
      bloco: "Conhecimentos básicos",
      assunto: "Português",
      enunciado: "Em “O processo cujo o prazo venceu será revisado”, o emprego simultâneo de “cujo” e do artigo “o” segue a norma-padrão.",
      gabarito: "E",
      comentario: "O pronome relativo “cujo” não admite artigo depois dele. A forma adequada é “cujo prazo venceu”."
    },
    {
      id: 46,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Se a afirmação “O protocolo está aberto e o sistema está disponível” é verdadeira, então cada uma das duas proposições simples também é verdadeira.",
      gabarito: "C",
      comentario: "Uma conjunção só é verdadeira quando ambas as proposições que a compõem são verdadeiras."
    },
    {
      id: 47,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Um material que custava R$ 200 recebeu desconto de 10% e, depois, acréscimo de 10% sobre o novo valor, retornando a R$ 200.",
      gabarito: "E",
      comentario: "Após o desconto, o valor é R$ 180; o acréscimo de 10% resulta em R$ 198, pois as bases percentuais são diferentes."
    },
    {
      id: 48,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "Em um grupo com 24 processos, dos quais 6 são urgentes, a probabilidade de escolher ao acaso um processo urgente é de 25%.",
      gabarito: "C",
      comentario: "A razão é 6/24, equivalente a 1/4 ou 25%."
    },
    {
      id: 49,
      bloco: "Conhecimentos básicos",
      assunto: "Raciocínio Lógico e Matemática",
      enunciado: "A proposição “Se o cadastro está correto, então o pedido será analisado” é logicamente equivalente a “Se o pedido não será analisado, então o cadastro não está correto”.",
      gabarito: "C",
      comentario: "A segunda proposição é a contrapositiva da primeira, e ambas são logicamente equivalentes."
    },
    {
      id: 50,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "Uma mensagem que imita a identidade visual do CRT-SP e solicita credenciais por link urgente apresenta característica típica de phishing.",
      gabarito: "C",
      comentario: "Phishing usa engenharia social e aparência legítima para induzir a vítima a fornecer dados ou acessar conteúdo malicioso."
    },
    {
      id: 51,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "No correio eletrônico, o campo Cco permite enviar uma cópia sem revelar aos demais destinatários os endereços inseridos nesse campo.",
      gabarito: "C",
      comentario: "Cco significa cópia oculta; seus destinatários não ficam visíveis aos demais receptores."
    },
    {
      id: 52,
      bloco: "Conhecimentos básicos",
      assunto: "Informática",
      enunciado: "A extensão PDF garante, por si só, que um arquivo recebido esteja livre de código malicioso.",
      gabarito: "E",
      comentario: "A extensão não garante segurança. Arquivos PDF também podem explorar falhas ou conter links e elementos maliciosos."
    },
    {
      id: 53,
      bloco: "Conhecimentos complementares",
      assunto: "Ética no setor público",
      enunciado: "Comunicar conflito de interesses à autoridade competente é conduta compatível com a integridade no exercício da função pública.",
      gabarito: "C",
      comentario: "A transparência sobre situações conflitantes permite prevenção, tratamento adequado e preservação da imparcialidade."
    },
    {
      id: 54,
      bloco: "Conhecimentos complementares",
      assunto: "Princípios da Administração Pública",
      enunciado: "O princípio da eficiência autoriza o agente público a afastar exigência legal quando isso tornar o atendimento mais rápido.",
      gabarito: "E",
      comentario: "A eficiência deve ser buscada dentro da legalidade; ela não permite descumprir exigências previstas em lei."
    },
    {
      id: 55,
      bloco: "Conhecimentos complementares",
      assunto: "Lei nº 8.429/1992",
      enunciado: "O mero exercício da função pública, sem comprovação de ato doloso com fim ilícito, afasta a responsabilidade por improbidade administrativa.",
      gabarito: "C",
      comentario: "A redação vigente da Lei de Improbidade exige dolo e afirma que o mero exercício da função, sem ato doloso com fim ilícito, não basta."
    },
    {
      id: 56,
      bloco: "Conhecimentos complementares",
      assunto: "Lei nº 9.784/1999",
      enunciado: "A Administração deve anular seus atos ilegais e pode revogar atos válidos por conveniência ou oportunidade, respeitados os direitos adquiridos.",
      gabarito: "C",
      comentario: "A Lei nº 9.784/1999 diferencia anulação por ilegalidade e revogação por mérito administrativo."
    },
    {
      id: 57,
      bloco: "Conhecimentos complementares",
      assunto: "Lei de Acesso à Informação (LAI)",
      enunciado: "O pedido de acesso à informação precisa conter os motivos pelos quais o requerente deseja obter os dados.",
      gabarito: "E",
      comentario: "A LAI veda exigências relativas aos motivos determinantes da solicitação de informação de interesse público."
    },
    {
      id: 58,
      bloco: "Conhecimentos complementares",
      assunto: "Lei Geral de Proteção de Dados (LGPD)",
      enunciado: "O princípio da necessidade limita o tratamento ao mínimo necessário para a realização de suas finalidades.",
      gabarito: "C",
      comentario: "A necessidade exige dados pertinentes, proporcionais e não excessivos em relação às finalidades informadas."
    },
    {
      id: 59,
      bloco: "Conhecimentos complementares",
      assunto: "Lei Geral de Proteção de Dados (LGPD)",
      enunciado: "O poder público somente pode tratar dados pessoais mediante consentimento expresso do titular.",
      gabarito: "E",
      comentario: "A LGPD prevê diversas bases legais além do consentimento, inclusive execução de políticas públicas e cumprimento de obrigação legal."
    },
    {
      id: 60,
      bloco: "Conhecimentos complementares",
      assunto: "Lei de Acesso à Informação (LAI)",
      enunciado: "A transparência ativa ocorre quando o órgão divulga informações de interesse coletivo independentemente de solicitação.",
      gabarito: "C",
      comentario: "Transparência ativa é a divulgação espontânea; a passiva responde a pedidos de acesso."
    },
    {
      id: 61,
      bloco: "Conhecimentos específicos",
      assunto: "Gestão da qualidade",
      enunciado: "No ciclo PDCA, a etapa Check envolve verificar resultados e compará-los com objetivos e padrões definidos.",
      gabarito: "C",
      comentario: "Check é a etapa de checagem, medição e análise do desempenho obtido após a execução."
    },
    {
      id: 62,
      bloco: "Conhecimentos específicos",
      assunto: "Processos e projetos",
      enunciado: "Um projeto caracteriza-se por esforço temporário voltado à criação de resultado único, ao passo que um processo tende a ser contínuo e repetível.",
      gabarito: "C",
      comentario: "Temporalidade e singularidade distinguem projetos de operações e processos recorrentes."
    },
    {
      id: 63,
      bloco: "Conhecimentos específicos",
      assunto: "Trabalho em equipe",
      enunciado: "A existência de divergências em uma equipe implica, necessariamente, queda de desempenho e deve ser suprimida pela chefia.",
      gabarito: "E",
      comentario: "Divergências bem administradas podem ampliar perspectivas e melhorar decisões; o efeito depende da forma de gestão do conflito."
    },
    {
      id: 64,
      bloco: "Conhecimentos específicos",
      assunto: "Administração Pública",
      enunciado: "A desconcentração distribui competências dentro da mesma pessoa jurídica, criando órgãos sem personalidade jurídica própria.",
      gabarito: "C",
      comentario: "Na desconcentração há repartição interna de competências; a descentralização transfere execução a outra pessoa."
    },
    {
      id: 65,
      bloco: "Conhecimentos específicos",
      assunto: "Rotinas administrativas",
      enunciado: "Um checklist de conferência substitui integralmente a capacitação dos responsáveis e elimina a possibilidade de erro humano.",
      gabarito: "E",
      comentario: "Checklists reduzem esquecimentos e padronizam verificações, mas não eliminam erros nem substituem competência técnica."
    },
    {
      id: 66,
      bloco: "Conhecimentos específicos",
      assunto: "Materiais e estoques",
      enunciado: "Na curva ABC, itens da classe A costumam representar menor quantidade de itens e maior parcela do valor movimentado.",
      gabarito: "C",
      comentario: "A classificação ABC prioriza controle conforme relevância econômica; poucos itens A concentram grande valor."
    },
    {
      id: 67,
      bloco: "Conhecimentos específicos",
      assunto: "Logística",
      enunciado: "A unitização de cargas pode facilitar movimentação e armazenagem ao agrupar volumes menores em uma unidade maior.",
      gabarito: "C",
      comentario: "Paletes e contêineres são exemplos de unitização que racionalizam manuseio, transporte e armazenagem."
    },
    {
      id: 68,
      bloco: "Conhecimentos específicos",
      assunto: "Licitações e contratos",
      enunciado: "O planejamento da contratação na Lei nº 14.133/2021 antecede a seleção do fornecedor e busca definir a necessidade e a solução mais adequada.",
      gabarito: "C",
      comentario: "A fase preparatória é marcada pelo planejamento e pela compatibilização com necessidades, orçamento e aspectos técnicos."
    },
    {
      id: 69,
      bloco: "Conhecimentos específicos",
      assunto: "Licitações e contratos",
      enunciado: "Dispensa e inexigibilidade são expressões sinônimas, ambas caracterizadas sempre pela inviabilidade de competição.",
      gabarito: "E",
      comentario: "Na inexigibilidade a competição é inviável; na dispensa, a competição pode ser possível, mas a lei autoriza não licitar."
    },
    {
      id: 70,
      bloco: "Conhecimentos específicos",
      assunto: "Protocolo e arquivo",
      enunciado: "A tabela de temporalidade define prazos de guarda e destinação dos documentos, apoiando sua eliminação ou recolhimento.",
      gabarito: "C",
      comentario: "O instrumento estabelece prazos nas fases documentais e a destinação final conforme avaliação arquivística."
    },
    {
      id: 71,
      bloco: "Conhecimentos específicos",
      assunto: "Atendimento ao público",
      enunciado: "Quando não souber responder a uma demanda, o atendente deve inventar uma solução provável para evitar espera do usuário.",
      gabarito: "E",
      comentario: "O correto é buscar informação confiável ou encaminhar ao setor competente, comunicando com clareza o próximo passo."
    },
    {
      id: 72,
      bloco: "Conhecimentos específicos",
      assunto: "Redação oficial",
      enunciado: "A concisão na redação oficial consiste em transmitir o máximo de informações com o mínimo de palavras, sem sacrificar clareza.",
      gabarito: "C",
      comentario: "Ser conciso é eliminar excessos, não omitir informações necessárias à compreensão."
    },
    {
      id: 73,
      bloco: "Conhecimentos específicos",
      assunto: "Lei nº 13.639/2018",
      enunciado: "Os conselhos regionais são compostos pela Diretoria Executiva e pelo Plenário deliberativo.",
      gabarito: "C",
      comentario: "Essa composição está expressamente prevista no artigo 9º da Lei nº 13.639/2018."
    },
    {
      id: 74,
      bloco: "Conhecimentos específicos",
      assunto: "Lei nº 5.524/1968",
      enunciado: "A elaboração e a execução de projetos compatíveis com a formação profissional integram o campo de atuação do técnico industrial de nível médio.",
      gabarito: "C",
      comentario: "A previsão consta do artigo 2º, inciso V, da Lei nº 5.524/1968."
    },
    {
      id: 75,
      bloco: "Conhecimentos específicos",
      assunto: "Decreto nº 90.922/1985",
      enunciado: "O Decreto nº 90.922/1985 veda ao técnico industrial ministrar disciplinas técnicas de sua especialidade.",
      gabarito: "E",
      comentario: "O decreto admite ministrar disciplinas técnicas da especialidade, atendidas as exigências específicas do exercício do magistério."
    },
    {
      id: 76,
      bloco: "Conhecimentos específicos",
      assunto: "Regimento Interno do CRT-SP",
      enunciado: "O Regimento Interno organiza competências e funcionamento do CRT-SP, devendo ser interpretado em harmonia com a Lei nº 13.639/2018 e atos do CFT.",
      gabarito: "C",
      comentario: "O regimento disciplina a organização interna sem afastar as normas legais e federais superiores do Sistema CFT/CRTs."
    },
    {
      id: 77,
      bloco: "Conhecimentos específicos",
      assunto: "Resolução CFT nº 206/2022",
      enunciado: "A Resolução CFT nº 206/2022 adota o Código de Ética e Disciplina do Técnico Industrial.",
      gabarito: "C",
      comentario: "A resolução reformulou e adotou o código que orienta deveres, direitos e condutas dos técnicos industriais."
    },
    {
      id: 78,
      bloco: "Conhecimentos específicos",
      assunto: "Resolução CFT nº 207/2022",
      enunciado: "Segundo o Código de Processo Ético, a instrução e o julgamento disciplinar no Sistema CFT/CRTs se resumem a uma única instância federal.",
      gabarito: "E",
      comentario: "O sistema possui instâncias regional e federal: Comissão de Ética Regional, Plenário do CRT e Plenário do CFT."
    },
    {
      id: 79,
      bloco: "Conhecimentos específicos",
      assunto: "Resolução CFT nº 208/2023",
      enunciado: "A Resolução CFT nº 208/2023 estabelece Código de Conduta Ética aplicável aos diretores e conselheiros do Sistema CFT/CRTs.",
      gabarito: "C",
      comentario: "A norma se dirige aos membros eleitos das diretorias e aos conselheiros do sistema."
    },
    {
      id: 80,
      bloco: "Conhecimentos específicos",
      assunto: "Resolução CFT nº 288/2025",
      enunciado: "A Resolução CFT nº 288/2025 orienta que a fiscalização profissional priorize natureza educativa e prevenção, sem excluir as medidas cabíveis diante de infrações.",
      gabarito: "C",
      comentario: "A resolução prioriza fiscalização inteligente, preventiva e educativa, preservando a atuação fiscalizatória e sancionatória quando necessária."
    }
];
