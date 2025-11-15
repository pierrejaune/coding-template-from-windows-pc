// ----------------------------
// 1. jQuery: 要素が画面に入ったらフェードインさせる
// ----------------------------
$(function () {
  // 「.fadeUp-hidden」が画面内に表示されたらクラスを追加
  $('.fadeUp-hidden').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('animate-active'); // フェードイン用のクラス
    }
  });
});

// ----------------------------
// 2. テキストの開閉ボタン処理（アコーディオン）
// ----------------------------
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.container01__img_txt_open_btn');
  const txtEl = document.querySelector('.container01__txt_02');
  const img = btn.querySelector('img');

  // ボタンの画像パス
  const openSrc = 'img/img_txt_open_btn.png';
  const closeSrc = 'img/img_txt_close_btn.png';

  btn.addEventListener('click', function () {
    if (txtEl.classList.contains('show')) {
      // テキストを閉じる
      txtEl.style.maxHeight = '0';
      txtEl.classList.remove('show');
      img.src = openSrc;
      img.alt = '開くボタン';
    } else {
      // テキストを開く
      txtEl.style.maxHeight = txtEl.scrollHeight + 'px';
      txtEl.classList.add('show');
      img.src = closeSrc;
      img.alt = '閉じるボタン';
    }
  });
});

// ----------------------------
// 3. Swiperスライダー初期化処理
// ----------------------------
function swiperInit() {
  // フェード切り替えスライダー（.swiper_block）
  var fvSlider01 = new Swiper('.swiper_block', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // スライド切り替えスライダー（.swiper_block_02）
  var fvSlider02 = new Swiper('.swiper_block_02', {
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
      el: '.container05__img_28 .swiper-pagination',
      clickable: true,
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
  });
}

// ----------------------------
// 4. position:sticky 用の top 調整処理
// ----------------------------
window.addEventListener('load', updateStickyPositions);
window.addEventListener('resize', updateStickyPositions);

function updateStickyPositions() {
  const containers = document.querySelectorAll('.container__sticky');
  const viewportHeight = window.innerHeight;

  containers.forEach(function (container) {
    const containerHeight = container.offsetHeight;
    // コンテンツの高さに応じて top をマイナスで調整
    const topValue = containerHeight - viewportHeight;
    container.style.top = -topValue + 'px';
  });
}

// ----------------------------
// 5. 動画のミュート切り替えボタン
// ----------------------------
function initVideoMuteToggle() {
  const video = document.querySelector('.js_mv');
  const videoBtn = document.querySelector('.video-muted');

  // ミュート状態の切り替え関数
  const toggleAudio = () => {
    video.muted = !video.muted;
  };

  // ボタンの表示状態を切り替える関数
  const toggleButtonState = () => {
    videoBtn.classList.toggle('on');
  };

  // ボタンがクリックされたときの処理
  videoBtn.addEventListener('click', () => {
    toggleAudio();
    toggleButtonState();
  });
}

// ----------------------------
// 6. DOMロード完了後に各種初期化関数を実行
// ----------------------------
document.addEventListener(
  'DOMContentLoaded',
  function () {
    swiperInit();
    initVideoMuteToggle();
    updateStickyPositions();
  },
  false
);

// ----------------------------
// 7. スクロールで画像・背景切り替え処理
// ----------------------------
document.addEventListener('DOMContentLoaded', function () {
  // 1. 必要な要素の取得
  const pcFlex = document.querySelector('.pc_flex');
  const pcFlexLeft = document.querySelector('.pc_flex__left');
  const pics = [...pcFlexLeft.querySelectorAll(':scope > picture')];

  // 2. 各画像のグループに分割
  const [topLines, contentPics, botLines] = [
    pics.slice(0, 3),
    pics.slice(3, 6),
    pics.slice(6, 9),
  ];

  // document.querySelectorAll('.js_area_green').forEach((el) => {
  //   areas.push({
  //     el,
  //     contentClass: 'pc_left_01',
  //     color: '#CBDFD0',
  //     lineKey: 'green',
  //   });
  // });

  // document.querySelectorAll('.js_area_yellow').forEach((el) => {
  //   areas.push({
  //     el,
  //     contentClass: 'pc_left_02',
  //     color: '#FCFCF5',
  //     lineKey: 'yellow',
  //   });
  // });

  // document.querySelectorAll('.js_area_blue').forEach((el) => {
  //   areas.push({
  //     el,
  //     contentClass: 'pc_left_03',
  //     color: '#E7F4FC',
  //     lineKey: 'blue',
  //   });
  // });

  // 3. 各色エリアと状態情報をまとめる(元々は上記のコメントアウト)
  const areaMap = [
    {
      selector: '.js_area_green',
      class: 'pc_left_01',
      color: '#CBDFD0',
      line: 'green',
    },
    {
      selector: '.js_area_yellow',
      class: 'pc_left_02',
      color: '#FCFCF5',
      line: 'yellow',
    },
    {
      selector: '.js_area_blue',
      class: 'pc_left_03',
      color: '#E7F4FC',
      line: 'blue',
    },
  ];

  const areas = areaMap.flatMap(
    ({ selector, class: contentClass, color, line }) =>
      [...document.querySelectorAll(selector)].map((el) => ({
        el,
        contentClass,
        color,
        lineKey: line,
      }))
  );

  // 4. 順番に並び替え
  areas.sort((a, b) => a.el.offsetTop - b.el.offsetTop);

  // 5. スクロールに応じて状態を更新
  function updateState() {
    let current = areas[0] || {};
    for (const area of areas) {
      if (area.el.getBoundingClientRect().top <= 0) current = area;
    }

    // forEach は以下のような制限がある。
    // return や break が使えない（ループを途中で抜けられない）。
    // 条件的な更新・早期終了が必要な場面では不向き。

    // 中央画像切り替え
    contentPics.forEach((pic) =>
      pic.classList.toggle(
        'active',
        pic.classList.contains(current.contentClass)
      )
    );

    // 上下線切り替え
    [...topLines, ...botLines].forEach((pic) => {
      const lineClass = `pc_left_line_${current.lineKey}`;
      pic.classList.toggle('active', pic.classList.contains(lineClass));
    });

    // 背景色切り替え
    if (pcFlex && current.color) pcFlex.style.backgroundColor = current.color;
  }

  window.addEventListener('scroll', updateState);
  updateState();
});
