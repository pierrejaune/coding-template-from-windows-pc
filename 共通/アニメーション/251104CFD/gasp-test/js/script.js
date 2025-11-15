document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // スクロール演出初期化関数
  // （他のモジュールと干渉しないようスコープ化）
  // -----------------------------------------
  function initImageScrollAnimation() {
    // GSAPのScrollTriggerプラグインを登録
    gsap.registerPlugin(ScrollTrigger);

    // .f-left が存在するかを判定 → 固定位置のオフセットを決定
    const hasFloatingLeft = document.querySelector('.f-left') !== null;
    const headerOffset = hasFloatingLeft ? 80 : 50;

    // 対象となるセクション要素群
    const sectionEl = document.querySelector('.sec__area');
    const bgNavyEl = sectionEl.querySelector('.bg-navy');
    const imgEls = sectionEl.querySelectorAll('.sec__img');

    // 画像が1枚しかない場合は処理不要
    if (imgEls.length <= 1) return;

    // 各種サイズとスクロール距離を算出
    const totalImages = imgEls.length;
    const imgHeight = imgEls[0].offsetHeight;
    const totalScrollDistance = imgHeight * (totalImages - 1);

    // -----------------------------------------
    // ScrollTrigger: bg-navyをpin固定する
    // -----------------------------------------
    ScrollTrigger.create({
      trigger: sectionEl, // この要素がビューポートに入ったら発火
      start: `top+=${headerOffset}px top`, // 固定開始位置
      end: `+=${totalScrollDistance}`, // スクロール距離ぶん固定
      pin: bgNavyEl, // pin対象（固定要素）
      pinSpacing: true, // 固定時にスペースを確保（trueで自然なレイアウト）
      anticipatePin: 1, // pinの遅延を防ぐ（スムーズな開始）
      scrub: true, // スクロール連動アニメーション（trueでなめらか連動）
      onEnter: () => (bgNavyEl.style.top = `${headerOffset}px`),
      onEnterBack: () => (bgNavyEl.style.top = `${headerOffset}px`),
    });

    // -----------------------------------------
    // ScrollTrigger: 2枚目以降を順にスライドアップ
    // -----------------------------------------
    imgEls.forEach((imgEl, index) => {
      if (index === 0) return; // 1枚目は固定表示のため除外

      gsap.fromTo(
        imgEl,
        { yPercent: 100 }, // 初期位置：下（非表示）
        {
          yPercent: 0, // 終了位置：上まで移動（完全表示）
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl, // 同一セクションで制御
            start: `top+=${headerOffset + imgHeight * (index - 1)} top`, // 開始位置
            end: `top+=${headerOffset + imgHeight * index} top`, // 終了位置
            scrub: true, // スクロール量に応じて動く
          },
        }
      );
    });
  }

  // 関数を呼び出し（別ファイルにしても再利用しやすい）
  initImageScrollAnimation();
});
