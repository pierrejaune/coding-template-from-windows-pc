// リファクタリング後
$(function () {
  let count = [];
  let eye = 'type';
  let counts = { A: 0, B: 0, C: 0, D: 0 };

  const showResult = (typeName) => {
    $('.question__result')
      .removeClass('on')
      .each(function () {
        if ($(this).data('type') === typeName) {
          $(this).addClass('on');
        }
      });
  };

  const updateCounts = () => {
    counts = { A: 0, B: 0, C: 0, D: 0 };
    count.forEach((sel) => {
      if (counts[sel] !== undefined) counts[sel]++;
    });
  };

  // 開始ボタン
  $('.js-start,.chart__start,.face__btn').on('click', function () {
    $(this).addClass('on');
    $('.js-start').addClass('on');
    $('.question__list').addClass('on');
  });

  // 質問切り替え & カウント
  $('.question__selection-text').on('click', function () {
    $(this).addClass('on');
    $(this).parent().hide().next().css('display', 'flex');

    const selection = $(this).data('selection');
    const question = $(this).parent('.js-question').data('question');
    count.push(selection);
    updateCounts();

    if (question == '06') {
      eye = selection;
    }
  });

  // 結果分岐
  $('.question__selection-text.end').on('click', function () {
    $('.question__list').removeClass('on');
    $('.question__type, .question__reset').addClass('on');

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

  // リセット
  $('.js-reset').on('click', function () {
    $('.question__type, .question__result, .js-reset').removeClass('on');
    $('.question__list').addClass('on');
    $('.js-question.first').css('display', 'flex');
    count = [];
    counts = { A: 0, B: 0, C: 0, D: 0 };
    eye = 'type';
  });
});
