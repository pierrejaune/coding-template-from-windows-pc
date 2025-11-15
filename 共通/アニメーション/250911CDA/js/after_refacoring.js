// *****************************************************
// loading.js + bottom.js 統合版
// （loading処理 → bottom処理 → credit処理 の順で実行）
// *****************************************************

// ---------------------------
// Loading処理
// ---------------------------

// body と主要要素を取得
const body = document.querySelector('body');
const fv = document.getElementById('fullpage_box'); // ページ全体を覆う要素
const loading_logo = document.getElementById('loading_logo'); // ローディングロゴ

// 初期状態：画面を非表示にする
body.style.opacity = '0'; // bodyを透明にする
body.style.overflow = 'hidden'; // スクロールを無効化
fv.style.opacity = '0'; // fv要素も透明にする

// ページのロード完了時に実行
window.addEventListener('load', () => {
  // bodyを表示
  body.style.opacity = '1';
  // ローディングロゴを一旦透明に
  loading_logo.style.opacity = '0';

  // 1秒後にfvを表示
  setTimeout(() => {
    fv.style.opacity = '1';
  }, 1000);

  // 3.1秒後にスクロールを可能にしてロゴを再表示
  setTimeout(() => {
    body.style.overflow = 'unset';
    loading_logo.style.opacity = '1';
  }, 3100);

  // 6秒後にfvに「loaded」クラスを付与（アニメーション終了用）
  setTimeout(() => {
    fv.classList.add('loaded');
  }, 6000);
});

// ---------------------------
// Bottom処理（スクロールや高さ調整）
// ---------------------------

document.addEventListener('DOMContentLoaded', () => {
  // 画面サイズを取得
  const windowHeight = window.innerHeight;
  console.log('windowHeight:', windowHeight);

  // fullpage要素とリストを取得
  const fullpage_Element = document.getElementById('fullpage');
  const fullpage_list = fullpage_Element.querySelectorAll('.full_list');

  // fullpageの位置を確認（デバッグ用）
  const fullpageClientRect = fullpage_Element.getBoundingClientRect();
  console.log('fullpage Y座標:', fullpageClientRect.top);

  // fullpage_box の高さを、画面高さ × (リスト数+2) に設定
  const fullpage_box = document.getElementById('fullpage_box');
  const list_num = fullpage_list.length;
  const fullpage_box_height = windowHeight * (list_num + 2);
  fullpage_box.style.height = fullpage_box_height + 'px';
  console.log('full_list数:', list_num);

  // ---------------------------
  // スクロール時の処理
  // ---------------------------
  window.addEventListener('scroll', () => {
    const scroll_y = window.scrollY;

    for (let i = 0; i < fullpage_list.length; i++) {
      const i_next = i + 1; // 次の要素番号
      const i_prev = i - 1; // 前の要素番号
      const height_i = windowHeight * i; // 各セクションの基準位置

      if (i > 0) {
        if (height_i < scroll_y) {
          // スクロール位置を超えた要素にクラス付与
          fullpage_list[i].classList.add('active');
          fullpage_list[i_prev].classList.add('prev');

          // 最後の要素なら fullpage に finished クラスを付与
          if (i_next === list_num) {
            fullpage_Element.classList.add('finished');
          }
        } else {
          // 戻った場合はクラスを削除
          fullpage_list[i].classList.remove('active');
          fullpage_list[i_prev].classList.remove('prev');
          if (i_next === list_num) {
            fullpage_Element.classList.remove('finished');
          }
        }
      }
    }
  });
});

// ---------------------------
// credit 処理（classベース & イベント登録）
// ---------------------------

document.addEventListener('DOMContentLoaded', () => {
  // すべてのボタンとメニューを取得
  const btns = document.querySelectorAll('.credit_btn');
  const menus = document.querySelectorAll('.credit_menu');

  // ボタンの数だけループしてクリックイベントを登録
  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const menu = menus[index]; // ボタンと同じ順番のメニューを取得

      // ボタンとメニューにクラス付与（演出開始）
      btn.classList.add('click');
      menu.classList.add('click');

      // 1秒後に「end」クラスを付与（アニメーション終了用）
      setTimeout(() => {
        btn.classList.add('end');
        menu.classList.add('end');
      }, 1000);
    });
  });
});
