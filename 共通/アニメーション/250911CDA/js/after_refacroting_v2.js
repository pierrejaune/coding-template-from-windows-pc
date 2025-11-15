// *****************************************************
// loading.js + bottom.js + credit.js 統合版
// （loading処理 → bottom処理 → credit処理 の順で実行）
// *****************************************************

// ---------------------------
// Loading処理
// ---------------------------

function initLoading() {
  const body = document.body;
  const fv = document.getElementById('fullpage_box');
  const loading_logo = document.getElementById('loading_logo');

  // 要素が存在しない場合は処理しない
  if (!body || !fv || !loading_logo) return;

  // 初期状態：画面を非表示にする
  body.style.opacity = '0';
  body.style.overflow = 'hidden';
  fv.style.opacity = '0';

  // ページロード完了時の処理
  window.addEventListener('load', () => {
    body.style.opacity = '1';
    loading_logo.style.opacity = '0';

    // 1秒後にfvを表示
    setTimeout(() => {
      fv.style.opacity = '1';
    }, 1000);

    // 3.1秒後にスクロールを解放してロゴ再表示
    setTimeout(() => {
      body.style.overflow = 'unset';
      loading_logo.style.opacity = '1';
    }, 3100);

    // 6秒後にfvに「loaded」クラスを付与
    setTimeout(() => {
      fv.classList.add('loaded');
    }, 6000);
  });
}

// ---------------------------
// Bottom処理（スクロールや高さ調整）
// ---------------------------

function initBottom() {
  const fullpage_Element = document.getElementById('fullpage');
  const fullpage_box = document.getElementById('fullpage_box');

  // 必須要素がない場合は処理しない
  if (!fullpage_Element || !fullpage_box) return;

  const fullpage_list = fullpage_Element.querySelectorAll('.full_list');
  const windowHeight = window.innerHeight;
  const list_num = fullpage_list.length;

  if (list_num === 0) return;

  // fullpage_box の高さを、画面高さ × (リスト数+2) に設定
  fullpage_box.style.height = windowHeight * (list_num + 2) + 'px';

  // console.log("windowHeight:", windowHeight);
  // console.log("full_list数:", list_num);

  // スクロールイベント処理
  window.addEventListener('scroll', () => {
    const scroll_y = window.scrollY;

    for (let i = 0; i < list_num; i++) {
      const i_next = i + 1;
      const i_prev = i - 1;
      const height_i = windowHeight * i;

      if (i > 0) {
        if (height_i < scroll_y) {
          fullpage_list[i].classList.add('active');
          if (fullpage_list[i_prev]) {
            fullpage_list[i_prev].classList.add('prev');
          }

          // 最後の要素なら fullpage に finished クラスを付与
          if (i_next === list_num) {
            fullpage_Element.classList.add('finished');
          }
        } else {
          fullpage_list[i].classList.remove('active');
          if (fullpage_list[i_prev]) {
            fullpage_list[i_prev].classList.remove('prev');
          }

          if (i_next === list_num) {
            fullpage_Element.classList.remove('finished');
          }
        }
      }
    }
  });
}

// ---------------------------
// Credit処理（classベース & イベント登録）
// ---------------------------

function initCredit() {
  const btns = document.querySelectorAll('.credit_btn');
  const menus = document.querySelectorAll('.credit_menu');

  // ボタンやメニューが存在しない場合は処理しない
  if (btns.length === 0 || menus.length === 0) return;

  // ボタンとメニューを順番で対応付け
  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const menu = menus[index];
      if (!menu) return; // メニューが足りない場合はスキップ

      btn.classList.add('click');
      menu.classList.add('click');

      // 1秒後に「end」クラスを付与
      setTimeout(() => {
        btn.classList.add('end');
        menu.classList.add('end');
      }, 1000);
    });
  });
}

// ---------------------------
// DOM準備完了時に初期化
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  initLoading(); // ページロード後に動作
  initBottom(); // スクロールや高さ調整
  initCredit(); // クレジットメニュー制御

  // ---------------------------
  // ウィンドウリサイズ時にも再実行
  // ---------------------------
  window.addEventListener('resize', () => {
    initBottom();
  });
});

// 短時間の連続resizeを間引く
// function debounce(func, delay = 200) {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// }

// document.addEventListener('DOMContentLoaded', () => {
//   initLoading();
//   initBottom();
//   initCredit();

//   window.addEventListener('resize', debounce(initBottom, 200));
// });

// 画面の高さに基づいて --vh を設定
function setVhVariables() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariables();
window.addEventListener('resize', setVhVariables);
window.addEventListener('orientationchange', setVhVariables);
