$(document).ready(function () {
  const questions = [
    {
      q: '好きな季節は？',
      options: { 春: 'pink', 夏: 'blue', 秋: 'red', 冬: 'yellow' },
    },
    {
      q: '好きな飲み物は？',
      options: {
        コーヒー: 'red',
        緑茶: 'yellow',
        ジュース: 'pink',
        水: 'blue',
      },
    },
    {
      q: '好きな動物は？',
      options: { 猫: 'blue', 犬: 'red', うさぎ: 'pink', 鳥: 'yellow' },
    },
    {
      q: '好きな音楽のジャンルは？',
      options: {
        ロック: 'red',
        ポップ: 'pink',
        クラシック: 'blue',
        ジャズ: 'yellow',
      },
    },
    {
      q: '行ってみたい旅行先は？',
      options: { 海: 'blue', 山: 'red', 都会: 'pink', 田舎: 'yellow' },
    },
  ];

  let answers = [];
  let currentIndex = 0;

  function showQuestion() {
    if (currentIndex < questions.length) {
      const qData = questions[currentIndex];
      $('.question').text(qData.q);
      $('.options').empty();

      Object.keys(qData.options).forEach((option) => {
        $('.options').append(
          `<button class="option-btn" data-color="${qData.options[option]}">${option}</button>`
        );
      });
    } else {
      //③
      showResult();
    }
  }

  function showResult() {
    let colorCount = { blue: 0, red: 0, yellow: 0, pink: 0 };
    answers.forEach((color) => colorCount[color]++);

    let resultColor = Object.keys(colorCount).reduce((a, b) =>
      colorCount[a] > colorCount[b] ? a : b
    );

    $('.quiz-container').html(
      `<h2>あなたのパーソナルカラーは ${resultColor.toUpperCase()} です！</h2>`
    );
  }

  $('.options').on('click', '.option-btn', function () {
    //②
    answers.push($(this).data('color'));
    console.log(answers);
    currentIndex++;
    showQuestion();
  });

  showQuestion(); //①
});
