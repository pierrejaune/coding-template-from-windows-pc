// -----------------------------
// スクロール時に inview した要素にアニメーションクラスを付与
// -----------------------------
$(function () {
  // テキストが画面内に入ったらクラスを付与
  $('.fadeUp-txt').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('js-active');
    }
  });

  // 画像が画面内に入ったらクラスを付与
  $('.fadeUp-img').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('fadeUp-active');
    }
  });

  // 遅延アニメーション用の要素
  $('.fadeUp-delay').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('fadeUp-delay-active');
    }
  });
});

// -----------------------------
// Swiper 初期化（フェード切替・自動再生付き）
// -----------------------------
function swiperInit() {
  var fvSlider01 = new Swiper('.swiper_block', {
    loop: true, // 無限ループ
    effect: 'fade', // フェード切替
    speed: 1000, // 切替速度 1秒
    autoplay: {
      delay: 2800, // 自動再生の間隔 2.8秒
      disableOnInteraction: false, // 操作しても自動再生を止めない
    },
    lazy: {
      loadPrevNext: true, // 遅延読み込み
    },
    pagination: {
      el: '.swiper-pagination', // ページネーション要素
      clickable: true, // クリックで移動可能
    },
  });
}

// -----------------------------
// アンカーリンクのスムーススクロール
// -----------------------------
$(function () {
  $('a[href^="#"]').click(function () {
    var speed = 600; // アニメーション時間
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);

    // ヘッダー分 52px を引いた位置にスクロール
    var position = target.offset().top - 52;

    $('html, body').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });
});

// -----------------------------
// サイド画像の表示切替（スクロール位置に応じて）
// -----------------------------
$(window).scroll(function () {
  $('.side_img').each(function () {
    let scroll = $(window).scrollTop();
    let mainTop = $('.main').offset().top;
    let mainBtm = $('.main').offset().top + $('.main').height();

    // main 範囲内の特定のスクロール位置で inView クラスを付与
    if (scroll > mainTop - 400 && scroll < mainBtm - 900) {
      $(this).addClass('inView');
    } else {
      $(this).removeClass('inView');
    }
  });
});

// -----------------------------
// SVG アニメーション関連
// -----------------------------

// 特定のグループ（cls-1, cls-2 など）を順番に表示
async function animateGroup(svg, selector, step = 80) {
  const nodes = svg.querySelectorAll(selector);

  // いったん非表示にする
  nodes.forEach((n) => n.classList.remove('show'));
  svg.getBoundingClientRect(); // レイアウトを再計算させる

  return new Promise((resolve) => {
    if (nodes.length === 0) return resolve();

    // 要素を順番に一定間隔で "show" クラスを付与
    nodes.forEach((n, i) => {
      setTimeout(() => {
        n.classList.add('show');
        // 最後の要素のアニメーションが終わったら resolve
        if (i === nodes.length - 1) {
          n.addEventListener('transitionend', () => resolve(), { once: true });
        }
      }, i * step);
    });
  });
}

// SVG 内の cls-2 → cls-1 の順でアニメーション
async function animateSvgPaths(svg) {
  await animateGroup(svg, '.cls-2', 80);
  await animateGroup(svg, '.cls-1', 80);
}

// object タグで読み込まれた SVG に対して IntersectionObserver で監視
function initSvgAnimationForObject(objEl) {
  const io = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return; // 画面内に入らなければ何もしない

        const svgDoc = objEl.contentDocument;
        if (!svgDoc) return;

        const svg = svgDoc.querySelector('svg');
        if (svg) animateSvgPaths(svg);

        io.unobserve(objEl); // 一度アニメーションしたら監視終了
      });
    },
    { threshold: 0.5 } // 要素が50%見えたら発火
  );

  io.observe(objEl);
}

// -----------------------------
// DOM読み込み完了後の初期処理
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  // object.js-svg で読み込まれたすべてのSVGにアニメーションを設定
  document.querySelectorAll('object.js-svg').forEach((objEl) => {
    if (objEl.contentDocument) {
      initSvgAnimationForObject(objEl);
    } else {
      objEl.addEventListener('load', () => initSvgAnimationForObject(objEl), {
        once: true,
      });
    }
  });

  // Swiper を初期化
  swiperInit();
});
