/* global SIMULADO */
const form = document.querySelector("#quiz-form");
const questionsRoot = document.querySelector("#questions");
const resultsSection = document.querySelector("#results");
const finishButton = document.querySelector("#finish-button");
const resetButton = document.querySelector("#reset-button");
const formMessage = document.querySelector("#form-message");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderQuestions() {
  const groups = Object.groupBy
    ? Object.groupBy(SIMULADO.questoes, (question) => question.bloco)
    : SIMULADO.questoes.reduce((acc, question) => {
        (acc[question.bloco] ||= []).push(question);
        return acc;
      }, {});

  questionsRoot.innerHTML = Object.entries(groups).map(([block, questions]) => `
    <section class="question-block" aria-labelledby="block-${questions[0].id}">
      <div class="block-heading">
        <h2 id="block-${questions[0].id}">${escapeHtml(block)}</h2>
        <span>${questions.length} itens</span>
      </div>
      ${questions.map((question) => `
        <article class="question" id="questao-${question.id}">
          <div class="question__meta">
            <span class="question__number">${question.id}</span>
            <span>${escapeHtml(question.assunto)}</span>
          </div>
          <p class="question__text">${escapeHtml(question.enunciado)}</p>
          <div class="choices" role="radiogroup" aria-label="Resposta da questão ${question.id}">
            ${[
              ["C", "Certo"],
              ["E", "Errado"],
              ["B", "Em branco"]
            ].map(([value, label]) => `
              <input type="radio" id="q${question.id}-${value}" name="q${question.id}" value="${value}">
              <label for="q${question.id}-${value}">${label}</label>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `).join("");
}

function updateProgress() {
  const answered = new FormData(form);
  const count = [...answered.keys()].filter((key) => key.startsWith("q")).length;
  const percent = Math.round((count / SIMULADO.questoes.length) * 100);
  document.querySelector("#progress-label").textContent = `${count} de ${SIMULADO.questoes.length} respondidas`;
  document.querySelector("#progress-percent").textContent = `${percent}%`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
}

function finishExam(event) {
  event.preventDefault();
  const data = new FormData(form);
  const answers = {};
  SIMULADO.questoes.forEach((question) => {
    answers[question.id] = data.get(`q${question.id}`) || "B";
  });

  const stats = { correct: 0, wrong: 0, blank: 0 };
  const blocks = {};
  const reviewTopics = new Map();

  SIMULADO.questoes.forEach((question) => {
    const answer = answers[question.id];
    const status = answer === "B" ? "blank" : answer === question.gabarito ? "correct" : "wrong";
    stats[status] += 1;
    blocks[question.bloco] ||= { correct: 0, total: 0 };
    blocks[question.bloco].total += 1;
    if (status === "correct") blocks[question.bloco].correct += 1;
    if (status !== "correct") reviewTopics.set(question.assunto, (reviewTopics.get(question.assunto) || 0) + 1);
  });

  document.querySelector("#correct-count").textContent = stats.correct;
  document.querySelector("#wrong-count").textContent = stats.wrong;
  document.querySelector("#blank-count").textContent = stats.blank;
  document.querySelector("#net-score").textContent = stats.correct - stats.wrong;

  document.querySelector("#block-results").innerHTML = Object.entries(blocks).map(([name, block]) => {
    const percent = Math.round((block.correct / block.total) * 100);
    return `<div class="block-result">
      <strong>${escapeHtml(name)}</strong>
      <div class="block-result__track" aria-label="${percent}% de acertos"><span style="width:${percent}%"></span></div>
      <span>${percent}%</span>
    </div>`;
  }).join("");

  const sortedTopics = [...reviewTopics.entries()].sort((a, b) => b[1] - a[1]);
  document.querySelector("#review-topics").innerHTML = sortedTopics.length
    ? sortedTopics.map(([topic, count]) => `<li><strong>${escapeHtml(topic)}</strong> — ${count} ${count === 1 ? "item" : "itens"}</li>`).join("")
    : "<li>Nenhum tema pendente. Excelente resultado!</li>";

  document.querySelector("#answer-key").innerHTML = SIMULADO.questoes.map((question) => {
    const answer = answers[question.id];
    const status = answer === "B" ? "blank" : answer === question.gabarito ? "correct" : "wrong";
    const statusLabel = { correct: "Acertou", wrong: "Errou", blank: "Em branco" }[status];
    const answerLabel = answer === "B" ? "Em branco" : answer === "C" ? "Certo" : "Errado";
    const keyLabel = question.gabarito === "C" ? "Certo" : "Errado";
    return `<article class="answer-item answer-item--${status}">
      <p class="answer-item__meta">ITEM ${question.id} · ${escapeHtml(question.assunto)} · ${statusLabel}</p>
      <p><strong>Sua resposta:</strong> ${answerLabel} &nbsp; <strong>Gabarito:</strong> ${keyLabel}</p>
      <p class="answer-item__comment">${escapeHtml(question.comentario)}</p>
    </article>`;
  }).join("");

  formMessage.textContent = "";
  finishButton.disabled = true;
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetExam() {
  if (!window.confirm("Deseja apagar todas as respostas e reiniciar o simulado?")) return;
  form.reset();
  resultsSection.hidden = true;
  finishButton.disabled = false;
  formMessage.textContent = "";
  updateProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

renderQuestions();
form.addEventListener("change", updateProgress);
form.addEventListener("submit", finishExam);
resetButton.addEventListener("click", resetExam);
updateProgress();
