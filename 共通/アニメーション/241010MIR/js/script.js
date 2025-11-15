// DOMの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function () {
  // トップに戻るボタンの要素を取得
  const topButton = document.querySelector('.top_btn');

  // ヒーローセクションと、特定のセクション（container10）を取得
  const heroElement = document.querySelector('.hero');
  const container10Element = document.querySelector('.container10');

  // top_btnを表示・非表示にする関数
  function checkTopButtonPosition() {
    // 要素がすべて存在しているか確認
    if (topButton && heroElement && container10Element) {
      const heroRect = heroElement.getBoundingClientRect(); // .heroの位置情報
      const container10Rect = container10Element.getBoundingClientRect(); // .container10の位置情報
      const windowHeight = window.innerHeight; // ウィンドウの高さ

      // heroが画面上部より下にある → top_btnを非表示
      if (heroRect.top > 0) {
        topButton.classList.add('hidden');
      }
      // container10の下端がウィンドウの半分より上 → top_btnを非表示
      else if (container10Rect.bottom < windowHeight / 2) {
        topButton.classList.add('hidden');
      }
      // 上記以外 → top_btnを表示
      else {
        topButton.classList.remove('hidden');
      }
    }
  }

  // 初回表示時にボタンの表示状態をチェック
  checkTopButtonPosition();

  // スクロール時にもチェックを行う
  window.addEventListener('scroll', checkTopButtonPosition);

  // look-number 左右の表示要素とセクション要素を取得
  const lookNumberLeftElements = document.querySelectorAll('.look-number-left');
  const lookNumberRightElements =
    document.querySelectorAll('.look-number-right');
  const sections = document.querySelectorAll('.container__wrap');

  // 最初のセクションのmargin-bottomを取得
  const firstSection = sections[0];
  const computedStyle = getComputedStyle(firstSection); // スタイル情報を取得
  const marginBottom = parseFloat(computedStyle.marginBottom); // margin-bottom を数値で取得

  // スクロールイベントでセクションの表示とナンバー更新を制御
  window.addEventListener('scroll', () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect(); // 各セクションの位置情報
      const lookNumber = section.getAttribute('data-look-number'); // データ属性から番号を取得

      // セクションの上端がmargin-bottom分だけ画面上に達していて、かつ下端が画面に残っている
      if (rect.top <= marginBottom && rect.bottom > 0) {
        // 表示中のセクションに対応する数字に更新
        updateLookNumbers(lookNumber);
      }

      // 最初のセクションが画面に見えている間もナンバー更新
      if (
        section.classList.contains('container__wrap--first') &&
        rect.top >= 0 &&
        rect.top <= window.innerHeight
      ) {
        updateLookNumbers(lookNumber);
      }
    });

    // topボタンの表示も再チェック
    checkTopButtonPosition();
  });

  // ナンバー表示を更新する関数
  function updateLookNumbers(lookNumber) {
    // 左側の数字を更新
    lookNumberLeftElements.forEach((el) => {
      el.textContent = lookNumber;
    });

    // 右側の数字も更新
    lookNumberRightElements.forEach((el) => {
      el.textContent = lookNumber;
    });
  }
});
