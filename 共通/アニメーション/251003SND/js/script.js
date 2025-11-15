// ===========================
// ページ読み込み時に実行
// ===========================
$(function () {
  // ① 要素が画面内に入ったときにクラスを付与する（アニメーションなど用）
  $('.js-inview').on('inview', function (event, isInView) {
    if (isInView) {
      // 表示領域に入ったら「is-active」クラスを追加
      $(this).addClass('is-active');
    }
  });

  // ② 特定の要素（.move03）が画面内に入ったらアニメーション用クラスを追加
  $('.move03').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-move03');
    }
  });

  // ③ 同様に、.move04が画面内に入ったらクラスを追加
  $('.move04').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-move04');
    }
  });

  // ④ 動画のミュート切り替え処理
  var video = $('#headVideo').get(0); // jQueryオブジェクトからvideo要素を取得
  $('#mute').on('click', function () {
    // muteボタンがクリックされたときにミュート状態を切り替える
    if ($(this).hasClass('off') == false) {
      // offクラスが付いていない → 現在は音あり
      $('.sound-on').hide(); // 「音あり」アイコンを非表示
      $('.sound-off').show(); // 「音なし」アイコンを表示
      $(this).addClass('off'); // ボタンに「off」クラスを付与
      video.muted = video.muted ? false : true; // ミュート状態を反転
    } else {
      // offクラスが付いている → 現在は音なし
      $('.sound-on').show(); // 「音あり」アイコンを表示
      $('.sound-off').hide(); // 「音なし」アイコンを非表示
      $(this).removeClass('off'); // 「off」クラスを除去
      video.muted = video.muted ? false : true; // ミュート状態を反転
    }
  });
});

// ===========================
// Slickスライダーの初期化
// ===========================
$(document).ready(function () {
  $('.feature .slick').slick({
    arrows: false, // 矢印ナビゲーションを非表示
    autoplay: true, // 自動再生ON
    autoplaySpeed: 2400, // 自動再生間隔（2.4秒）
    speed: 1000, // スライド切り替え速度（1秒）
    fade: false, // フェード切り替えではなく通常スライド
    dots: true, // ドットナビゲーションを表示
    centerMode: true, // センターモードON
    centerPadding: 0, // センターパディングなし
    variableWidth: true, // スライド幅を可変に
    slidesToShow: 1, // 表示スライド数
    pauseOnFocus: false, // フォーカス時も停止しない
    pauseOnHover: false, // ホバー時も停止しない
    pauseOnDotsHover: false, // ドットホバー時も停止しない
  });
});

// ===========================
// 背景画像を事前読み込み
// ===========================
const images = ['img/bg_blue.jpg', 'img/bg_pink.jpg'];

const preloaded = [];

// 各画像を先に読み込んでおくことで表示時のチラつきを防ぐ
images.forEach((src) => {
  const img = new Image();
  img.src = src;
  preloaded.push(img);
});

// ===========================
// スクロール位置による「sticky要素」の解除制御
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const stickyElements = document.querySelectorAll('.sticky-element'); // 固定表示する要素群

  stickyElements.forEach((stickyElement) => {
    const allTriggers = document.querySelectorAll('.trigger-point'); // トリガーとなる要素群
    let triggerElement = null;

    // sticky要素の下にある最初のトリガー要素を特定
    allTriggers.forEach((trigger) => {
      if (!triggerElement && trigger.offsetTop > stickyElement.offsetTop) {
        triggerElement = trigger;
      }
    });

    if (!triggerElement) return; // トリガーがない場合は処理終了

    // スクロール位置を判定してクラスを切り替える関数
    const checkPosition = () => {
      const currentScrollY = window.scrollY;
      const triggerPosition = triggerElement.offsetTop + 300; // 少し余裕を持たせた位置で判定

      if (currentScrollY > triggerPosition) {
        // トリガーより下にスクロールしたら固定解除クラスを追加
        stickyElement.classList.add('is-released');
      } else {
        // 上に戻ったら固定解除クラスを削除
        stickyElement.classList.remove('is-released');
      }
    };

    // 初回実行（ページロード時にも状態を反映）
    checkPosition();

    // スクロールのたびに状態を更新
    window.addEventListener('scroll', checkPosition);
  });
});

// ===========================
// パララックス（スクロールに応じた要素移動）
// ===========================
function initParallaxScroll() {
  const parallaxElements = document.querySelectorAll('.c__03 .balloon'); // 対象要素

  let isThrottled = false; // 実行制御フラグ（パフォーマンス対策）

  function handleScroll() {
    if (isThrottled) return;

    isThrottled = true;
    requestAnimationFrame(() => {
      const scrollY = window.pageYOffset; // 現在のスクロール量

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const windowHeight = window.innerHeight;

        // 要素が画面内に見えている場合のみ処理
        if (rect.top < windowHeight && rect.bottom > 0) {
          const speed = 1.0; // 移動速度（調整可）
          const scrollProgress =
            (scrollY - elementTop + windowHeight) /
            (windowHeight + rect.height);
          const translateY = (scrollProgress - 0.5) * -100 * speed;

          // スクロールに応じて上下に移動
          element.style.transform = `translateY(${translateY}px)`;
        }
      });

      isThrottled = false;
    });
  }

  // スクロールイベントを監視
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ページロード時にパララックスを初期化
document.addEventListener('DOMContentLoaded', initParallaxScroll);

// ===========================
// スクロール位置に応じて.feature背景を切り替え
// ===========================
function initScrollBackgroundChange() {
  const feature = document.querySelector('.feature');
  const c01 = document.querySelector('.c__01');
  const c07 = document.querySelector('.c__07');

  // 背景画像のパス指定（CSSのカスタムプロパティで使用）
  const bgA = 'url(../img/bg_pink.jpg)';
  const bgB = 'url(../img/bg_blue.jpg)';

  let isThrottled = false;

  function handleScroll() {
    if (isThrottled) return;

    isThrottled = true;
    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const halfHeight = windowHeight / 2;

      const c01Rect = c01.getBoundingClientRect();
      const c07Rect = c07.getBoundingClientRect();

      // 各セクションの位置を基準に状態を判定
      const c01Passed = c01Rect.top <= halfHeight;
      const c07Passed = c07Rect.top <= halfHeight;

      // 背景画像切り替え条件
      if (c07Passed) {
        // c__07を過ぎたらピンク背景
        feature.style.setProperty('--bg-image', bgA);
      } else if (c01Passed) {
        // c__01を過ぎてc__07未満ならブルー背景
        feature.style.setProperty('--bg-image', bgB);
      } else {
        // c__01より上ではピンク背景
        feature.style.setProperty('--bg-image', bgA);
      }

      isThrottled = false;
    });
  }

  // スクロールイベント登録
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // 初回実行
}

// ページロード時に背景切り替えを初期化
document.addEventListener('DOMContentLoaded', initScrollBackgroundChange);
