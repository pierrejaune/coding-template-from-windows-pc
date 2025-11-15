// ============================
// IMG FADE IN AND HOVER UP
// ============================

window.onload = function () {
  // -----------------------------
  // FadeIn2 アニメーション設定
  // -----------------------------
  // ページ内の .fadeIn2 クラス要素を取得
  const fadeIn2List = document.querySelectorAll('.fadeIn2');

  // IntersectionObserver を使って、要素が画面に一定割合表示されたら "is-active" クラスを付与
  const fadeIn2IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active'); // 表示時にクラス付与でCSSアニメを発火
        }
      });
    },
    {
      threshold: 0.4, // 要素の40%が表示領域に入ったら発火
    }
  );

  // 各要素を監視対象に追加
  fadeIn2List.forEach((target) => fadeIn2IO.observe(target));

  // -----------------------------
  // FadeIn3 アニメーション設定
  // -----------------------------
  const fadeIn3List = document.querySelectorAll('.fadeIn3');
  const fadeIn3IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.4 }
  );
  fadeIn3List.forEach((target) => fadeIn3IO.observe(target));

  // -----------------------------
  // FadeInR（右方向フェード）設定
  // -----------------------------
  const fadeInRList = document.querySelectorAll('.fadeInR');
  const fadeInRIO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.4 }
  );
  fadeInRList.forEach((target) => fadeInRIO.observe(target));

  // -----------------------------
  // FadeInL（左方向フェード）設定
  // -----------------------------
  const fadeInLList = document.querySelectorAll('.fadeInL');
  const fadeInLIO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.4 }
  );
  fadeInLList.forEach((target) => fadeInLIO.observe(target));
}; // window.onload 終了

// ============================
// jQueryによるフェードイン制御（inviewプラグイン使用）
// ============================

$(function () {
  // 要素が画面に入ったら is-active クラスを付与
  $('.js-anime').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
});

$(function () {
  // 同様に、別クラスでは is-active02 を付与
  $('.js-anime02').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active02');
    }
  });
});

// ============================
// GSAPによる文字フェードインアニメーション（.buy）
// ============================

document.querySelectorAll('.buy').forEach((buy) => {
  const chars = buy.querySelectorAll('.char'); // 各文字を1文字ずつ取得（.char要素想定）

  // 初期状態：文字を透明に設定
  gsap.set(chars, { opacity: 0 });

  // 文字が画面に入った時のフェードインタイムライン作成
  const tlOpacity = gsap.timeline({
    scrollTrigger: {
      trigger: buy,
      start: 'top 95%', // 画面下から少し入った時に開始
      end: 'bottom top', // 上に抜けるまで
      toggleActions: 'play none none reverse', // スクロールに応じて再生/逆再生
      onEnter: () => {
        tlOpacity.play();
      },
    },
  });

  // 各文字を順番にフェードイン＋背景色変更（白→黒→白）
  chars.forEach((char, index) => {
    tlOpacity
      .to(char, {
        opacity: 1,
        y: 0,
        backgroundColor: 'black',
        color: 'white',
        duration: 0.01,
        delay: index * 0.01,
      })
      .to(
        char,
        {
          backgroundColor: 'transparent',
          color: 'black',
          duration: 0.01,
          delay: 0.01,
        },
        `+=${index * 0.01}`
      );
  });

  // 永続的に繰り返す背景点滅アニメーション（完了後再生）
  const tlBackground = gsap.timeline({
    repeat: -1, // 無限ループ
    repeatDelay: 2, // 2秒ごとに繰り返す
    paused: true, // 最初は停止
  });

  chars.forEach((char, index) => {
    tlBackground
      .to(char, {
        backgroundColor: 'black',
        color: 'white',
        duration: 0.05,
        delay: index * 0.001,
      })
      .to(char, {
        backgroundColor: 'transparent',
        color: 'black',
        duration: 0.05,
        delay: 0.001,
      });
  });

  // 初回フェードイン完了後、2秒後に繰り返しアニメ開始
  tlOpacity.eventCallback('onComplete', () => {
    gsap.delayedCall(2, () => {
      tlBackground.play();
    });
  });
});

// ============================
// テーブル・クレジット部分の文字フェードアニメーション
// ============================

var speed = 0.001; // 文字アニメーション間隔

document
  .querySelectorAll('.credit__table th, .credit__table td, .credit__text div')
  .forEach((buy) => {
    const chars = buy.querySelectorAll('.char');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: buy,
        start: 'top 95%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    });

    // 各文字を少しずつ表示（黒背景→白文字→戻る）
    chars.forEach((char, index) => {
      tl.fromTo(
        char,
        {
          opacity: 0,
          y: 10,
          backgroundColor: 'transparent',
          color: 'black',
        },
        {
          opacity: 1,
          y: 0,
          backgroundColor: 'black',
          color: 'white',
          duration: 0.01,
          delay: index * speed,
        }
      ).to(
        char,
        {
          backgroundColor: 'transparent',
          color: 'black',
          duration: 0.01,
          delay: 0.01,
        },
        `+=${index * speed}`
      );
    });
  });

// ============================
// IntersectionObserverによるリンク表示アニメ
// ============================

document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.link10s'); // 監視対象
  const elementToAnimate = document.querySelector('.link10mono'); // 表示させたい要素

  if (!target || !elementToAnimate) return; // どちらか無ければ処理しない

  // Observer設定：要素が50%画面に入ったらクラス付与
  const options = {
    root: null, // ビューポート基準
    rootMargin: '0px',
    threshold: 0.5,
  };

  const callback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        elementToAnimate.classList.add('is-visible'); // クラス追加で表示
        observer.unobserve(target); // 一度のみ実行
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);
});

// ============================
// 右クリックメニュー・ドラッグ操作の禁止
// ============================

// 右クリック禁止
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// 画像のドラッグ禁止
document.addEventListener('dragstart', function (event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
  }
});

// ============================
// 動画のミュート切り替え機能
// ============================

const video = document.getElementById('video');
const sound = document.getElementById('sound');

sound.addEventListener('click', () => {
  // data-sound 属性が off の場合は音声ON、onならミュートに戻す
  if (sound.dataset.sound === 'off') {
    video.muted = false;
    sound.dataset.sound = 'on';
  } else {
    video.muted = true;
    sound.dataset.sound = 'off';
  }
});
