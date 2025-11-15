$(function () {
  // 開始ボタン
  $(function () {
    $('.js-start,.chart__start,.face__btn ').on('click', function () {
      $(this).addClass('on');
      $('.js-start').addClass('on');
      $('.question__list').addClass('on');
    });
  });

  // 質問切り替え
  $(function () {
    $('.question__selection-text').each(function () {
      $(this).on('click', function () {
        $(this).addClass('on');
        $(this).parent().css('display', 'none');
        $(this).parent().next().css('display', 'flex');
      });
    });
  });

  // カウント
  let Acount = 0;
  let Bcount = 0;
  let Ccount = 0;
  let Dcount = 0;
  let eye = 'type';
  let count = [];

  $('.question__selection-text').each(function () {
    $(this).on('click', function () {
      let selection = $(this).data('selection');
      let question = $(this).parent('.js-question').data('question');
      count.push(selection);
      Acount = count.filter(function (w) {
        return w === 'A';
      }).length;
      Bcount = count.filter(function (x) {
        return x === 'B';
      }).length;
      Ccount = count.filter(function (y) {
        return y === 'C';
      }).length;
      Dcount = count.filter(function (z) {
        return z === 'D';
      }).length;

      if (question == '06') {
        return (eye = selection);
      }
    });
  });

  //結果分岐
  $('.question__selection-text.end').on('click', function () {
    $('.question__list').removeClass('on');
    $('.question__type').addClass('on');
    $('.question__reset').addClass('on');
    // console.log("A:" + Acount);
    // console.log("B:" + Bcount);
    // console.log("C:" + Ccount);
    // console.log("D:" + Dcount);

    // A > B
    if (Acount > Bcount) {
      if (Ccount >= 6) {
        if (eye == 'A') {
          // キュート
          $('.question__result').each(function () {
            let type = $(this).data('type');
            if (type == 'cute') {
              $(this).addClass('on');
            }
          });
        } else if (eye == 'B') {
          // アクティブキュート
          $('.question__result').each(function () {
            let type = $(this).data('type');
            if (type == 'activecute') {
              $(this).addClass('on');
            }
          });
        }
      } else if (Ccount >= 2 && Ccount <= 5) {
        // フレッシュ
        $('.question__result').each(function () {
          let type = $(this).data('type');
          if (type == 'fresh') {
            $(this).addClass('on');
          }
        });
      } else if (Dcount >= 6) {
        // クールカジュアル
        $('.question__result').each(function () {
          let type = $(this).data('type');
          if (type == 'coolcasual') {
            $(this).addClass('on');
          }
        });
      }
    }

    // A < B
    else if (Acount < Bcount) {
      if (Ccount >= 6) {
        // フェミニン
        $('.question__result').each(function () {
          let type = $(this).data('type');
          if (type == 'feminine') {
            $(this).addClass('on');
          }
        });
      } else if (Ccount >= 2 && Ccount <= 5) {
        if (eye == 'A') {
          // ソフトエレガント
          $('.question__result').each(function () {
            let type = $(this).data('type');
            if (type == 'softelegant') {
              $(this).addClass('on');
            }
          });
        } else if (eye == 'B') {
          // エレガント
          $('.question__result').each(function () {
            let type = $(this).data('type');
            if (type == 'elegant') {
              $(this).addClass('on');
            }
          });
        }
      } else if (Dcount >= 6) {
        // クール
        $('.question__result').each(function () {
          let type = $(this).data('type');
          if (type == 'cool') {
            $(this).addClass('on');
          }
        });
      }
    }
  });

  // 再診断(リセット)
  $('.js-reset').on('click', function () {
    $('.question__type').removeClass('on');
    $('.question__result').removeClass('on');
    $('.js-reset').removeClass('on');
    $('.question__list').addClass('on');
    $('.js-question.first').css('display', 'flex');
    return (count = []);
    return (Acount = 0);
    return (Bcount = 0);
    return (Ccount = 0);
    return (Dcount = 0);
  });
});
