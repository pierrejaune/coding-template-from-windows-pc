document.addEventListener('DOMContentLoaded', function () {
  // パラメータの設定
  const params = {
    '#sec03': '?link=241202PIQ_v25_13',
    '#sec06': '?link=241202PIQ_v25_23',
    '#sec08': '?link=241202PIQ_v25_51',
  };

  // 各セクションに対して処理
  Object.entries(params).forEach(([selector, param]) => {
    // セクション内のランキングリストのリンクを取得
    const links = document.querySelectorAll(`${selector} .ranking-list li a`);

    // 各リンクにパラメータを付与
    links.forEach((link) => {
      const currentHref = link.getAttribute('href');
      if (currentHref) {
        // 既存のURLにパラメータを追加
        link.setAttribute('href', currentHref + param);
      }
    });
  });
});
$(function () {
  $('.js-fade').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
  $(window).scroll(function () {
    $('.js-fade').on('inview', function (event, isInView) {
      if (isInView) {
        $(this).addClass('is-active');
      }
    });
  });
});
