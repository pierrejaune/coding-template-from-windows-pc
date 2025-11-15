// javascript
document.addEventListener('DOMContentLoaded', function () {
  const delayUnit = 0.05;
  const targets = document.querySelectorAll('.split-text');

  targets.forEach((el) => {
    const text = el.textContent;
    const chars = text.split('');
    const spanned = chars
      .map((char, i) => {
        const delay = ((i + 1) * delayUnit).toFixed(2);
        return `<span style="transition-delay: ${delay}s;">${char}</span>`;
      })
      .join('');
    el.innerHTML = spanned;
  });
});

// jQuery
// $(document).ready(function () {
//   $(function () {
//     var delayUnit = 0.05;

//     $('.split-text').each(function () {
//       var $this = $(this);
//       var text = $this.text();
//       var chars = text.split('');
//       var html = '';

//       $.each(chars, function (i, char) {
//         var delay = ((i + 1) * delayUnit).toFixed(2);
//         html +=
//           '<span style="transition-delay: ' + delay + 's;">' + char + '</span>';
//       });

//       $this.html(html);
//     });
//   });
// });

$(document).ready(function () {
  // IO START
  const animList = document.querySelectorAll('.anim');
  const IO = new IntersectionObserver((observer) => {
    observer.forEach(
      ({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('showed');
        } else {
          // target.classList.remove('showed');
        }
      },
      { threshold: 0.3 } //30%表示されたら発火
    );
  });
  animList.forEach((target) => IO.observe(target));
});

let swiperInstances = [];

function initSwiper($el) {
  // すでに初期化されているならスキップ
  if ($el.data('swiper-initialized')) return;

  let swiper = new Swiper($el[0], {
    loop: true,
    effect: 'slide',
    speed: 1000,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: $el.find('.swiper-pagination')[0],
      clickable: true,
    },
  });

  $el.data('swiper-initialized', true); // 初期化済みフラグ
  swiperInstances.push(swiper);
}

$(function () {
  // MutationObserver などで「showedがついた時」を検知して処理
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        let $target = $(mutation.target);
        if ($target.hasClass('showed') && $target.hasClass('swiper_block')) {
          initSwiper($target);
        }
      }
    });
  });

  // 各swiper_blockにobserverをセット
  $('.swiper_block').each(function () {
    observer.observe(this, { attributes: true });
  });

  // ページ読み込み時にすでにshowedが付いてる場合も初期化
  $('.swiper_block.showed').each(function () {
    initSwiper($(this));
  });
});
