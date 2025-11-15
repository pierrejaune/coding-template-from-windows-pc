document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  //惰性スクロール
  // ==========================
  // luxy.init({
  //   wrapper: '#luxy', // 慣性スクロールを囲む要素のID
  //   wrapperSpeed: 0.08, // スクロールスピード
  // });

  // ==========================
  //LazyLoad 初期化
  // ==========================
  if (document.querySelector('.movie video')) {
    new LazyLoad({
      elements_selector: '.lazy',
    });
  }

  // ==========================
  //GSAP使用
  // ==========================
  gsap.registerPlugin(ScrollTrigger);

  const remToPx = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const FIXED_SCROLL_REM = 10; //10rem
  // console.log(remToPx(FIXED_SCROLL_REM));

  // すべての .movie 要素を取得
  const movies = document.querySelectorAll('.movie');
  movies.forEach((movieEl) => {
    const video = movieEl.querySelector('video');
    const btn = movieEl.querySelector('.movie-btn');

    if (!video) return;

    // --- 音声切り替え ---
    const toggleAudio = () => {
      video.muted = !video.muted;
    };

    const toggleSoundChange = () => {
      toggleAudio();
      btn.classList.toggle('on');
    };

    if (btn) {
      btn.addEventListener('click', toggleSoundChange);
    }
    // console.log(movieEl);

    // --- ★ .movie.first専用処理 ---
    if (movieEl.classList.contains('first')) {
      // --- 通常の .first 動作（常に実行）---
      movieEl.addEventListener(
        'animationend',
        (e) => {
          console.log('first animated');
          movieEl.classList.add('large');
          video.currentTime = 0;
          video.pause();
          setTimeout(() => {
            video.play();
          }, 300);
        },
        { once: true }
      );

      // --- ★ .switchクラスを持っている場合は追加で可視範囲再生制御 ---
      if (movieEl.classList.contains('switch')) {
        ScrollTrigger.create({
          trigger: movieEl,
          start: 'top 10%',
          end: 'bottom 10%',
          onEnter: () => {
            video.currentTime = 0;
            video.pause();
            setTimeout(() => {
              video.play();
            }, 300);
          },
          onEnterBack: () => {
            video.play();
          },
          onLeave: () => {
            video.pause();
          },
          onLeaveBack: () => {
            video.pause();
          },
        });
      }
    } else {
      // --- ★ .first以外の動画はinview時に再生 ---
      ScrollTrigger.create({
        trigger: movieEl,
        start: 'top 10%', // 画面に1割入った時に再生
        end: 'bottom 10%', // 画面から出る直前まで
        onEnter: () => {
          video.currentTime = 0; // 再生前にリセットしたい場合
          video.pause();
          setTimeout(() => {
            video.play();
          }, 300);
        },
        onEnterBack: () => {
          video.play(); // 上方向スクロールでも再生再開
        },
        onLeave: () => {
          video.pause(); // 画面外に出たら停止
        },
        onLeaveBack: () => {
          video.pause();
        },
      });
    }
  });

  //inview時class付与
  document.querySelectorAll('.anim').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%', //要素が画面下から
      onEnter: () => {
        el.classList.add('showed');
      },
      once: true,
    });
  });

  // .fade要素をフェード表示
  // .fade.evenはスクロールで表示されるタイミングが変わる
  //.fade.scaleは1.1から1になる
  const fades = document.querySelectorAll('.fade');
  fades.forEach((el) => {
    const isEven = el.classList.contains('even');
    const isScale = el.classList.contains('scale');

    gsap.fromTo(
      el,
      {
        opacity: 0,
        // y: 50,
        y: 0,
        filter: 'blur(10px)',
        scale: isScale ? 1.1 : 1, //.scaleの場合は1.1倍の大きさから
      },
      //  { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        // delay: isEven ? 0.3 : 0, // .evenの場合は遅延
        scrollTrigger: {
          trigger: el,
          // start: 'top 80%',
          start: isEven ? 'top 80%-=200px' : 'top 80%', // .evenは下に50pxずらして開始
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
          scrub: true, // スクロール量に応じて変化(start 〜 end の間を「アニメーションの進行範囲」として扱う)
          // markers: true,
        },
      }
    );

    if (el.classList.contains('ac__img')) {
      console.log('アンカーリンク');
      //.ac__imgのみホバー時にshadow付与
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          filter: 'blur(0) drop-shadow(1rem 1rem 1.5rem rgba(136,107,93,0.8))',
          duration: 0.7,
          ease: 'power1.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          filter: 'blur(0) drop-shadow(1rem 1rem 1.5rem rgba(136,107,93,0))',
          duration: 0.7,
          ease: 'power1.in',
        });
      });
    }
  });

  const loopSlider = document.querySelector('.loop-slider__track');
  const bgLight = document.querySelector('.bg-light');
  const particlesWrapper = document.querySelector('.particles-wrapper');
  const pcMv = document.querySelector('.pcMv');
  const content = document.querySelector('.f-content');
  const fMain = document.querySelector('.f-main');
  // Timeline は opacity / filter / y のアニメーションだけ
  const firstTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.f-wrap',
      // start: 'top 80px ',
      start: 'top 0px ',
      // end: '+=500px',
      end: '+=' + remToPx(30) + 'rem',
      scrub: 3, //数値を大きくすると遅延が大きくなり、より滑らかな追従効果が生まれる
      pin: true,
      // markers: true,
      onUpdate: (self) => {
        // Timelineの進行度(progress 0〜1)で class を切り替え
        // console.log(self.progress);
        if (self.progress > 0.1) {
          particlesWrapper.classList.add('on');
          bgLight.classList.add('on');
        }
        if (self.progress < 0.1) {
          particlesWrapper.classList.remove('on');
          bgLight.classList.remove('on');
        }

        if (self.progress > 0.5) {
          // console.log('add');
          loopSlider.classList.add('on');
          pcMv.classList.remove('on');
          content.classList.add('on');
          fMain.classList.add('on');
        } else {
          loopSlider.classList.remove('on');
          pcMv.classList.add('on');
          content.classList.remove('on');
          fMain.classList.remove('on');
        }
      },
    },
  });

  // pcMvのアニメーション
  // スクロール量の50%までは表示されたまま
  firstTl.fromTo(
    pcMv,
    { opacity: 1, filter: 'brightness(1)' },
    {
      opacity: 1,
      filter: 'brightness(1)',
    },
    0
  );
  // スクロール量の50%以降に下記適用
  firstTl.to(
    pcMv,
    {
      opacity: 0,
      filter: 'brightness(2)',
      ease: 'power2.out',
      stagger: { amount: 0.2 }, // 0.5 → 1にすると倍に
    },
    0.5
  );

  // contentのアニメーション（opacity / filter）
  // スクロール量の50%までは非表示
  firstTl.fromTo(
    content,
    { opacity: 0, filter: 'brightness(2)' },
    {
      opacity: 1,
      filter: 'brightness(2)',
    },
    0
  );

  // スクロール量の50%以降に下記適用
  firstTl.to(
    content,
    {
      opacity: 1,
      filter: 'brightness(1)',
      ease: 'power2.out',
      stagger: { amount: 0.2 }, //の0.5 → 1にすると倍に
    },
    0.5
  );

  // yのみスクロール終了時に発火（スクロール連動なし）
  firstTl.to(
    content,
    { y: '0', ease: 'none' },
    1 // Timelineの最後に実行
  );

  // ==========================
  //スクロール時テキストアニメーション
  // ==========================
  const letters = document.querySelectorAll('[data-letters]');
  /**
   * --- 共通関数 ---
   * 指定要素が "first" クラスを持つかどうかで
   * start / end の値を返す
   */

  function getScrollTriggerRange(el) {
    if (el.classList.contains('first')) {
      return { start: 'top 0%', end: `bottom -${FIXED_SCROLL_REM}rem` };
    } else {
      return {
        start: 'top 90%',
        end: '-=' + remToPx(FIXED_SCROLL_REM) + 'rem',
      };
    }
  }

  letters.forEach((el) => {
    // SVG <g>タグまたはSVG要素の場合
    if (el instanceof SVGElement || el.tagName.toLowerCase() === 'g') {
      const paths = el.querySelectorAll('path');
      paths.forEach((path) => path.classList.add('letter'));

      const { start, end } = getScrollTriggerRange(el); // ← 共通関数を使用

      gsap.to(paths, {
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
        stagger: { amount: 0.5, from: 'start' },
        scrollTrigger: {
          trigger: el,
          start,
          end,
          // scrub: true,
          scrub: true,
          // markers: true,
          //content内で機能するように再計算
          scroller: window, //メインビジュアルのpin中でも反応させるZ
        },
      });
    } else {
      // テキストの場合（1文字ずつspanで囲む）
      const text = el.textContent; // ← trim()を削除してスペースも保持
      el.textContent = '';

      text.split('').forEach((char) => {
        const span = document.createElement('span');

        if (char === ' ') {
          // 半角スペースの場合は改行されずに表示されるように &nbsp; を使う
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }

        span.classList.add('letter');
        el.appendChild(span);
      });

      const letters = el.querySelectorAll('.letter');
      const { start, end } = getScrollTriggerRange(el); // ← 共通関数を使用

      gsap.to(letters, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        stagger: { amount: 0.5, from: 'start' },
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
          // markers: true,
          //content内で機能するように再計算
          scroller: window, //メインビジュアルのpin中でも反応させる
        },
      });
    }
  });

  //前アニメーション設定後にるリフレッシュ
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);

  // ==========================
  //画像マスクアニメーション
  // ==========================
  window.addEventListener('load', () => {
    // すべての .sec__img 要素を取得
    document.querySelectorAll('.sec__img.mask').forEach((sec) => {
      const img = sec.querySelector('img');
      const maskW = sec.offsetWidth; // マスクの幅
      const maskH = sec.offsetHeight; // マスクの高さ

      // 共通の ScrollTrigger 設定
      const commonTriggerSettings = {
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 100%',
          end: 'top 50%',
          scrub: true, // スクロールに同期して動く
          markers: true, // デバッグ用マーカー表示（確認後削除可）
        },
      };
      // -----------------------------
      // 縦方向パララックス（上方向へ動く）
      // -----------------------------
      if (sec.classList.contains('up')) {
        // 画像を少し大きく（上下方向に余裕を持たせる）
        img.style.width = `${maskW * 1}px`;
        img.style.height = `${maskH * 1.1}px`;

        // 差分（マスク外に出ている部分）を計算
        const move = maskH * 0.1;
        // console.log(move);

        // GSAPアニメーション設定
        gsap.fromTo(
          img,
          { y: 0 }, // 初期位置
          {
            y: -move, // 上方向へ差分分だけ動く
            ...commonTriggerSettings, // 共通設定を展開
          }
        );
      }

      // -----------------------------
      // 横方向パララックス（右方向へ動く）
      // -----------------------------
      if (sec.classList.contains('toRight')) {
        // 画像を少し大きく（左右方向に余裕を持たせる）
        img.style.width = `${maskW * 1.1}px`;
        img.style.height = `${maskH * 1}px`;

        // 差分を計算
        const move = maskW * 0.1;
        // console.log(move);

        // GSAPアニメーション設定
        gsap.fromTo(
          img,
          { x: 0 }, // 初期位置
          {
            x: move, // 右方向へ差分分だけ動く
            ...commonTriggerSettings, // 共通設定を展開
          }
        );
      }
    });

    //前アニメーション設定後にるリフレッシュ
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  });

  //PC右側固定
  ScrollTrigger.create({
    trigger: '.ac__list',
    start: 'bottom top', // .ac__listの下端が画面上端に達したとき
    onEnter: () => document.querySelector('.float-nav').classList.add('on'),
    onLeaveBack: () =>
      document.querySelector('.float-nav').classList.remove('on'),
    // markers: true, // デバッグ用
  });

  document.querySelectorAll('.float-nav__link a').forEach((el) => {
    el.addEventListener('click', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);
    });
  });
  document.querySelectorAll('.ac__img a').forEach((el) => {
    el.addEventListener('click', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);
    });
  });

  window.addEventListener('load', (event) => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});

// snow
$(function () {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 100, //この数値を変更すると雪の数が増減できる
        density: { enable: true, value_area: 800 },
      },
      color: {
        value: '#fff',
      },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#fff' },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.5, sync: false },
      },
      opacity: {
        value: 1,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 1, sync: false },
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: false, speed: 20, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 3, //この数値を小さくするとゆっくりな動きになる
        direction: 'bottom', //下に向かって落ちる
        random: true, //動きはランダム
        straight: false, //動きをとどめない
        out_mode: 'out', //画面の外に出るように描写
        bounce: false, //跳ね返りなし
        attract: { enable: true, rotateX: 300, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: false },
        onclick: {
          enable: false,
        },
        resize: true,
      },
    },
    retina_detect: true,
  });
});
