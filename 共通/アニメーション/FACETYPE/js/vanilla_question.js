// リファクタリング後
document.addEventListener('DOMContentLoaded', () => {
  let count = [];
  let eye = 'type';
  let counts = { A: 0, B: 0, C: 0, D: 0 };

  const showResult = (typeName) => {
    document.querySelectorAll('.question__result').forEach((el) => {
      el.classList.toggle('on', el.dataset.type === typeName);
    });
  };

  const updateCounts = () => {
    counts = { A: 0, B: 0, C: 0, D: 0 };
    count.forEach((sel) => {
      if (counts[sel] !== undefined) counts[sel]++;
    });
  };

  // 開始ボタン
  document
    .querySelectorAll('.js-start,.chart__start,.face__btn')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.add('on');
        document
          .querySelectorAll('.js-start')
          .forEach((el) => el.classList.add('on'));
        document.querySelector('.question__list').classList.add('on');
      });
    });

  // 質問切り替え & カウント
  document.querySelectorAll('.question__selection-text').forEach((option) => {
    option.addEventListener('click', () => {
      option.classList.add('on');
      const parent = option.parentElement;
      parent.style.display = 'none';
      if (parent.nextElementSibling) {
        parent.nextElementSibling.style.display = 'flex';
      }

      const selection = option.dataset.selection;
      const question = parent.dataset.question;
      count.push(selection);
      updateCounts();

      if (question === '06') {
        eye = selection;
      }
    });
  });

  // 結果分岐
  document
    .querySelectorAll('.question__selection-text.end')
    .forEach((option) => {
      option.addEventListener('click', () => {
        document.querySelector('.question__list').classList.remove('on');
        document.querySelector('.question__type').classList.add('on');
        document.querySelector('.question__reset').classList.add('on');

        const { A, B, C, D } = counts;

        if (A > B) {
          if (C >= 6) {
            showResult(eye === 'A' ? 'cute' : 'activecute');
          } else if (C >= 2 && C <= 5) {
            showResult('fresh');
          } else if (D >= 6) {
            showResult('coolcasual');
          }
        } else if (A < B) {
          if (C >= 6) {
            showResult('feminine');
          } else if (C >= 2 && C <= 5) {
            showResult(eye === 'A' ? 'softelegant' : 'elegant');
          } else if (D >= 6) {
            showResult('cool');
          }
        }
      });
    });

  // リセット
  document.querySelector('.js-reset').addEventListener('click', () => {
    document
      .querySelectorAll('.question__type, .question__result, .js-reset')
      .forEach((el) => el.classList.remove('on'));
    document.querySelector('.question__list').classList.add('on');
    document.querySelector('.js-question.first').style.display = 'flex';
    count = [];
    counts = { A: 0, B: 0, C: 0, D: 0 };
    eye = 'type';
  });
});
