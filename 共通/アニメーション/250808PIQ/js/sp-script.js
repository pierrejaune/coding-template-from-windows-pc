// font
(function (d) {
  var config = {
      kitId: 'iut6viu',
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
    }, config.scriptTimeout),
    tk = d.createElement('script'),
    f = false,
    s = d.getElementsByTagName('script')[0],
    a;
  h.className += ' wf-loading';
  tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != 'complete' && a != 'loaded')) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

// letterアニメーション
// $(function () {
//   $('.lines').each(function () {
//     const $block = $(this);
//     const $lines = $block.find('.line');

//     $lines.each(function (lineIndex) {
//       const $line = $(this);
//       const text = $line.text().trim();
//       $line.empty();
//       [...text].forEach((char, i) => {
//         const $span = $('<span>')
//           .addClass('char')
//           .text(char === ' ' ? '\u00A0' : char)
//           .attr('style', `--i:${i}; --line-delay:${lineIndex * 0.4}s;`);
//         $line.append($span);
//       });
//     });
//   });

//   $('.line').on('inview', function (event, isInView) {
//     if (isInView) {
//       $(this).addClass('inview');
//     }
//   });
// });

// ===============================
// 文字アニメーション (letterアニメーション)
// ===============================
$(function () {
  // .lines クラスを持つ要素を1つずつ処理
  $('.lines').each(function () {
    const $block = $(this); // 処理対象の .lines 要素
    const $lines = $block.find('.line'); // その中にある .line 要素を取得

    // 各 .line 要素ごとに処理
    $lines.each(function (lineIndex) {
      const $line = $(this); // 現在の .line
      const text = $line.text().trim(); // テキスト内容を取得（前後の空白は削除）
      $line.empty(); // 一旦テキストを空にする

      // 文字列を1文字ずつ分解して <span> でラップ
      [...text].forEach((char, i) => {
        const $span = $('<span>')
          .addClass('char') // 文字に共通で付与するクラス
          .text(char === ' ' ? '\u00A0' : char) // 空白は改行されないスペースに変換
          .attr('style', `--i:${i}; --line-delay:${lineIndex * 0.4}s;`);
        // 上記はCSSカスタムプロパティ（CSS変数） をインラインスタイルで設定している書き方
        // i = 文字ごとの順番
        // lineIndex * 0.4s = 行ごとのアニメーション遅延

        $line.append($span); // .line 内に <span> を追加
      });
    });
  });

  // jQuery.inview プラグインで、要素が画面内に入ったら処理
  $('.line').on('inview', function (event, isInView) {
    if (isInView) {
      // .line が画面内に入ったら .inview クラスを付与
      // → CSS アニメーション開始のトリガーに使う
      $(this).addClass('inview');
    }
  });
});

// スライダー
$(function () {
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 2000,
    fade: true,
    dots: false,
    arrows: false,
    infinite: true,
  });
});

// パララックス
// document.addEventListener('DOMContentLoaded', function () {
//   const images = document.querySelectorAll('.parallax');
//   new simpleParallax(images, {
//     orientation: 'up',
//     delay: 1,
//     transition: 'cubic-bezier(0,0,0,1)',
//     maxTransition: 99,
//   });
// });

// ===============================
// パララックス効果
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  // .parallax クラスを持つ画像を取得
  const images = document.querySelectorAll('.parallax');

  // simpleParallax.js ライブラリを使ってパララックスを適用
  new simpleParallax(images, {
    orientation: 'up', // 上方向に動く
    delay: 1, // 遅延（アニメーション速度）
    transition: 'cubic-bezier(0,0,0,1)', // イージング（動きの滑らかさ）
    maxTransition: 99, // 最大移動量(単位はピクセル(px))
  });
});

// 余談：下記のcssカスタムプロパティだと
// --i … 文字ごとの順番（0,1,2…）→ 1文字ずつ少しずつ遅れてアニメーションする
// --line-delay … 行ごとの遅延→ 1行目 → 2行目 → 3行目… と段階的にアニメーション開始
// 結果として、1文字ずつ行ごとに順番に浮かび上がるアニメーションが作れます。
// .char {
//   display: inline-block;
//   opacity: 0;
//   transform: translateY(20px);
//   animation: fadeUp 0.6s forwards;
//   animation-delay: calc(var(--i) * 0.05s + var(--line-delay));
// }

// @keyframes fadeUp {
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
