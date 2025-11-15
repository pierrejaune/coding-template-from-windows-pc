// -------------------------------------
// IntersectionObserver版 inview相当処理
// -------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 各クラスごとの監視設定
  const observerSettings = [
    {
      selector: '.anim', // アニメーション用要素
      classToAdd: 'showed', // 画面内で付与するクラス
      threshold: 0.5, // 50%見えたら発火
      reverse: false, // 可視範囲外ではクラスを外さない
    },
    {
      selector: '.js_movie', // VIDEOタグ
      classToAdd: 'showed',
      threshold: 0.1, // 10%見えたら発火
      reverse: true, // 可視範囲外でクラス除去＋停止
    },
    {
      selector: '.js_typingText', // 1つ目のタイピングテキスト
      threshold: 0.3, // 30%見えたら発火
      reverse: false, // 外れても停止しない
    },
  ];

  // 各設定ごとにIntersectionObserverを作成
  observerSettings.forEach((setting) => {
    const elements = document.querySelectorAll(setting.selector);
    if (!elements.length) return; // 要素がなければスキップ

    // 監視ロジック定義
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          // 要素が画面内に入った場合
          if (entry.isIntersecting) {
            // 共通：クラス付与（設定にclassToAddがある場合）
            if (setting.classToAdd) target.classList.add(setting.classToAdd);

            // ==========================
            // 特殊ケース：VIDEOタグ再生制御
            // ==========================
            if (
              setting.selector === '.js_movie' &&
              target.tagName === 'VIDEO'
            ) {
              target.play().catch(() => {});
            }

            // ==========================
            // 特殊ケース：タイピング開始制御
            // ==========================
            if (setting.selector === '.js_typingText') {
              console.log('タイピング');

              // 該当要素内の <typewritten-text> をすべて取得
              target.querySelectorAll('typewritten-text').forEach((elem) => {
                // start() メソッドでタイピングアニメーション開始
                if (typeof elem.start === 'function') {
                  console.log('開始');
                  elem.start();
                }
              });
            }

            // 一度だけ発火させたい場合は以下を有効化
            // observer.unobserve(target);
          } else if (setting.reverse) {
            // --------------------------
            // 可視範囲から外れた場合の処理
            // --------------------------
            if (setting.classToAdd) target.classList.remove(setting.classToAdd);

            // VIDEOタグは可視範囲外で停止
            if (
              setting.selector === '.js_movie' &&
              target.tagName === 'VIDEO'
            ) {
              target.pause();
            }
          }
        });
      },
      {
        threshold: setting.threshold,
      }
    );

    // 各対象要素を監視開始
    elements.forEach((el) => observer.observe(el));
  });
});
