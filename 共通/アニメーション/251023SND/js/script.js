// -------------------------------------
// inview相当の処理：要素が画面内に入ったらクラスを付与
// クラスごとに異なる threshold（発火タイミング）を設定
// reverseをtrueにすると可視範囲にない時にclassをremove
// .js_movieがVIDEOタグに付与されていてreverseがtrueの時は可視範囲外で再生stop
// -------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 各クラスごとの設定をまとめる
  const observerSettings = [
    { selector: '.anim', classToAdd: 'showed', threshold: 0.5, reverse: false },
    {
      selector: '.js_movie',
      classToAdd: 'showed',
      threshold: 0.1,
      reverse: true,
    },
  ];

  // 各設定ごとに IntersectionObserver を生成
  observerSettings.forEach((setting) => {
    // 対象要素をすべて取得
    const elements = document.querySelectorAll(setting.selector);
    if (!elements.length) return; // 該当要素がなければスキップ

    // 各設定に応じた IntersectionObserver を作成
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          // 要素が指定した割合以上見えたらクラス付与
          if (entry.isIntersecting) {
            entry.target.classList.add(setting.classToAdd);

            // .js_movieの場合のみ再生
            if (
              setting.selector === '.js_movie' &&
              entry.target.tagName === 'VIDEO'
            ) {
              entry.target.play().catch((e) => {
                // console.log('再生エラー:', e);
              });
            }
            // 一度だけ発火させる場合は監視を解除
            // obs.unobserve(entry.target);
          } else if (setting.reverse) {
            entry.target.classList.remove(setting.classToAdd);
            // .js_movieの場合のみ再生停止
            if (
              setting.selector === '.js_movie' &&
              entry.target.tagName === 'VIDEO'
            ) {
              entry.target.pause();
            }
            // // 一度だけ発火させる場合は監視を解除
            // obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: setting.threshold,
      }
    );

    // 各要素を監視開始
    elements.forEach((el) => observer.observe(el));
  });
});

// アニメーション
document.addEventListener('DOMContentLoaded', () => {
  // 初回アニメーション
  document.querySelector('.f-main').classList.add('showed');
  const heroImg = document.querySelector('.hero__mv img');

  const initialFeatureFunc = () => {
    // console.log('初めの関数');
    document.querySelector('.hero__mv').classList.add('showed');
  };
  if (heroImg) {
    heroImg.addEventListener('load', () => {
      // console.log('読み込んだ');
      if (document.querySelector('.f-left')) {
        console.log('PC');
        initialFeatureFunc();
      } else {
        console.log('SP');
        initialFeatureFunc();
      }
    });

    //もしキャッシュ済みの場合はloadが発火しないことがあるので対応
    if (heroImg.complete) {
      if (document.querySelector('.f-left')) {
        console.log('PC');
        initialFeatureFunc();
      } else {
        console.log('SP');
        initialFeatureFunc();
      }
    }
  }

  //その他アニメーション設定
  const sec10WaniBox = document.querySelector('.sec10 .wani-box');
  const sec10Img01 = document.querySelector('.sec10 .img01');
  if (sec10WaniBox && sec10Img01) {
    sec10Img01.addEventListener('transitionstart', () => {
      sec10WaniBox.classList.add('showed');
    });
  }

  const siImgText01 = document.querySelector('.si__img-text.img-text01');
  const siImgText02 = document.querySelector('.si__img-text.img-text02');
  if (siImgText01 && siImgText02) {
    document
      .querySelector('.si__img.img02')
      .addEventListener('transitionstart', () => {
        siImgText01.classList.add('showed');
        siImgText02.classList.add('showed');
      });
  }
});

// 動画遅延読み込みと音声切り替え
$(function () {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });

  const heroMovie = document.querySelector('.hero__movie video');
  const heroMovieBtn = document.querySelector('.hero__movie-btn');
  const toggleAudio = () => {
    heroMovie.muted = !heroMovie.muted;
  };

  const toggleSoundChange = () => {
    toggleAudio();
    heroMovieBtn.classList.toggle('on');
  };
  heroMovieBtn.addEventListener('click', toggleSoundChange);
});

// ============================================================
// 軽量ランダム降雪アニメーション
// - requestAnimationFrameで生成タイミング制御
// - IntersectionObserverで可視範囲＋100pxで初回降雪開始
// - data-always="true" を指定したエリアは常に初回降雪
// - data-sway="0.3" を指定すると雪の横揺れ最大幅は.snow-areaの30%でそれ以外は初期値
// - data-speed="10" を指定すると最大の降雪速度は10rem/sでそれ以外は初期値
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.snow-area');

  // ======== 設定：初回に見せたい雪の数 ========
  const initialCount = 50;

  // ======== 画面内に入った時だけ降雪を開始する ========
  // rootMargin: '100px 0px' → 画面上下100pxの範囲で発火
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const area = entry.target;

        // すでに降雪を開始しているならスキップ（重複防止）
        if (area.dataset.started === 'true') return;

        // 画面に入るか、または data-always="true" が付いている場合に降雪開始
        if (entry.isIntersecting || area.dataset.always === 'true') {
          startSnow(area);
          area.dataset.started = 'true'; // 再実行防止
        }
      });
    },
    { root: null, rootMargin: '100px 0px', threshold: 0 }
  );

  // ======== 監視開始 ========
  areas.forEach((area) => {
    // data-always="true" の場合は即開始
    if (area.dataset.always === 'true') {
      startSnow(area);
      area.dataset.started = 'true';
    } else {
      observer.observe(area);
    }
  });

  // ============================================================
  // 雪を降らせる関数本体
  // ============================================================
  function startSnow(area) {
    // ======== 設定値取得 ========
    const remPx = 10; // 1rem = 10px 固定
    const baseSpeedRem = parseFloat(area.dataset.speed) || 5; // rem/s
    const baseSpeedPx = baseSpeedRem * remPx; // px/s に換算
    const height = area.offsetHeight;
    const speedRates = [0.6, 0.8, 1.0, 1.2, 1.5]; // 落下速度のランダム倍率

    // ===================== 雪生成関数 =====================
    function createSnowflake(initial = false) {
      const snow = document.createElement('span');
      snow.classList.add('snowflake');

      // サイズ（小70%, 中25%, 大5%）
      const r = Math.random();
      if (r < 0.7) snow.classList.add('s');
      else if (r < 0.95) snow.classList.add('m');
      else snow.classList.add('l');

      // 横位置ランダム配置
      const areaWidth = area.offsetWidth;
      snow.style.left = Math.random() * areaWidth + 'px';

      // 横揺れ幅ランダム（エリア幅の15%もしくはdata-sway指定値まで）
      const dataSway = parseFloat(area.dataset.sway);
      const swayRate = isNaN(dataSway) ? 0.15 : dataSway; //dataSway未設定なら0.15
      // console.log(swayRate);
      const sway = Math.random() * swayRate * areaWidth;
      snow.style.setProperty('--sway', `${sway}px`);

      // ランダム速度設定
      const rate = speedRates[Math.floor(Math.random() * speedRates.length)];
      const speedPx = baseSpeedPx * rate;
      const duration = (height / speedPx).toFixed(2);

      // CSS変数で落下・横揺れのアニメーション時間を設定
      snow.style.setProperty('--fall-duration', `${duration}s`);

      // 横揺れは雪のサイズや速度に合わせて少しランダム化
      const swayDuration = (Math.random() * 3 + 3).toFixed(2); // 3〜6秒のランダム
      snow.style.setProperty('--sway-duration', `${swayDuration}s`);

      // アニメーション設定（CSS変数を参照させる）
      snow.style.animation = `
      fall var(--fall-duration) linear forwards,
      sway var(--sway-duration) ease-in-out infinite
      `;

      // ファーストビュー時の途中降下演出
      if (initial) {
        const progress = Math.random();
        const delay = -(duration * progress).toFixed(2);
        snow.style.animationDelay = `${delay}s`;
      }

      area.appendChild(snow);

      // アニメーション終了後に削除
      setTimeout(() => snow.remove(), duration * 1000);
    }

    // ===================== ファーストビュー雪生成 =====================
    for (let i = 0; i < initialCount; i++) {
      createSnowflake(true);
    }

    // ===================== 通常の雪降りループ =====================
    let lastTime = performance.now();
    const interval = 1000; // 1000msごとに生成(雪の量調整)
    let accumulator = 0;
    let active = true;

    function loop(now) {
      if (!active) return;

      const delta = now - lastTime;
      lastTime = now;
      accumulator += delta;

      // エリアがDOMに存在しない場合は停止（メモリリーク防止）
      if (!document.body.contains(area)) {
        active = false;
        return;
      }

      // intervalを超えたら雪を生成
      if (accumulator >= interval) {
        createSnowflake(false);
        accumulator -= interval;
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }
});

// =====================
// Swiper スライダー設定（方法2: data 属性対応版）
// =====================
let swiperInstances = [];

function initSwiper($el) {
  if ($el.data('swiper-initialized')) return;

  let type = $el.data('swiper-type') || 'default';
  let options = {};
  let hasAutoplay = false;

  switch (type) {
    case 'loop-wc':
      options = {
        loop: true, // ループ有効
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 7000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // 逆方向有効化
        },
        loopAdditionalSlides: 3,
        // ▼ 追加設定：ユーザー操作を完全無効化
        allowTouchMove: false, // スワイプ・ドラッグ禁止
        simulateTouch: false, // PCでのドラッグ操作も禁止
        grabCursor: false, // カーソル変化なし
        touchStartPreventDefault: false, // 余計なタッチ処理を防止
      };
      hasAutoplay = false;
      break;

    case 'loop-odd':
      options = {
        loop: true, // ループ有効
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 15000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // 逆方向有効化
        },
        loopAdditionalSlides: 3,
      };
      hasAutoplay = false;
      break;

    case 'loop-even':
      options = {
        loop: true, // ループ有効
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 30000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // 逆方向有効化
        },
        loopAdditionalSlides: 3,
      };
      hasAutoplay = false;
      break;

    default:
      options = {
        loop: true,
        slidesPerView: 1,
      };
      hasAutoplay = false;
  }

  // ✅ ページネーションが存在する場合のみ設定
  let paginationEl = $el.find('.swiper-pagination')[0];
  if (paginationEl) {
    options.pagination = {
      el: paginationEl,
      clickable: true,
    };
  }

  // ✅ ナビゲーションが存在する場合のみ設定
  let nextEl = $el.find('.swiper-next')[0];
  let prevEl = $el.find('.swiper-prev')[0];
  if (nextEl && prevEl) {
    options.navigation = {
      nextEl: nextEl,
      prevEl: prevEl,
    };
  }

  let swiper = new Swiper($el[0], options);

  $el.data('swiper-initialized', true);
  $el.data('swiper-instance', swiper);
  $el.data('has-autoplay', hasAutoplay);
  swiperInstances.push(swiper);

  if (hasAutoplay) {
    swiper.autoplay.stop();
  }
}

$(function () {
  $('.swiper').each(function () {
    initSwiper($(this));
  });

  // showed が付与されたら autoplay 開始
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        let $target = $(mutation.target);
        if (
          $target.parent().find('.sec__wani-box').hasClass('showed') &&
          $target.hasClass('swiper')
        ) {
          let swiper = $target.data('swiper-instance');
          let hasAutoplay = $target.data('has-autoplay');
          if (swiper && hasAutoplay) {
            swiper.autoplay.start();
          }
        }
      }
    });
  });

  $('.swiper').each(function () {
    observer.observe(this, { attributes: true });
  });

  // ✅【追加】リサイズ時にSwiperを再初期化してループ停止を防ぐ
  let resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $('.swiper').each(function () {
        let $el = $(this);
        let swiper = $el.data('swiper-instance');
        if (swiper) {
          swiper.destroy(true, true); // Swiper完全破棄
          $el.removeData('swiper-initialized');
          initSwiper($el); // 再初期化
        }
      });
    }, 300); // リサイズ終了後に再生成（300msディレイ）
  });
});
