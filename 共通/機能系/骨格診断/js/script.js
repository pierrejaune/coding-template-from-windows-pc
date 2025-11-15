document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');
  const questionContainer = document.getElementById('questionContainer');
  const questionText = document.getElementById('questionText');
  const options = document.getElementById('options');
  const resultContainer = document.getElementById('resultContainer');
  const resultText = document.getElementById('resultText');

  const questionElements = document.querySelectorAll('#questionData .question');
  const resultElements = document.querySelectorAll('#resultData div');

  const answerLabels = ['はい', 'いいえ'];

  let questions = [];
  let currentQuestion = 0;
  let scoreA = 0;
  let scoreB = 0;

  // HTMLから質問データを取得（2択固定）
  questionElements.forEach((qEl) => {
    const text = qEl.querySelector('.text').textContent;
    const scoresAttr = qEl.dataset.scores; // "A,B" のような文字列
    const scores = scoresAttr.split(',');
    questions.push({
      text,
      options: answerLabels,
      scores,
    });
  });

  function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.text;
    options.innerHTML = '';
    q.options.forEach((label, i) => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.addEventListener('click', () => {
        // 選択肢に対応するスコアを加算
        if (q.scores[i] === 'A') scoreA++;
        else if (q.scores[i] === 'B') scoreB++;

        currentQuestion++;
        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      });
      options.appendChild(btn);
    });
  }

  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    // 合計スコアで結果判定
    let matchedResult = '診断結果が見つかりません。';
    for (const el of resultElements) {
      const minA = parseInt(el.dataset.minA);
      const maxA = parseInt(el.dataset.maxA);
      const minB = parseInt(el.dataset.minB);
      const maxB = parseInt(el.dataset.maxB);
      // 両方のスコア範囲に入っているか判定
      if (
        scoreA >= minA &&
        scoreA <= maxA &&
        scoreB >= minB &&
        scoreB <= maxB
      ) {
        matchedResult = el.textContent;
        break;
      }
    }

    resultText.textContent =
      // `【Aの合計】${scoreA}点、【Bの合計】${scoreB}点\n` + matchedResult;
      matchedResult;
  }

  function startQuiz() {
    currentQuestion = 0;
    scoreA = 0;
    scoreB = 0;
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
  }

  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', startQuiz);
});
