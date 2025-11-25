window.addEventListener('DOMContentLoaded', (event) => {
  // setupLazyLoad();
  setupGsap();
});

// フェードインアニメーション
window.onload = function () {
  // IO START
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.isActive = 'true';
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  targetList.forEach((target) => IO.observe(target));
  // IO END
};

// MVスライダー
document.addEventListener('DOMContentLoaded', function () {
  var fvSlider01 = new Swiper('#feature .swiper-container', {
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
    fadeEffect: {
      //ここにオプションを指定します。
      crossFade: true,
    },
  });
});

// TOPスライダー
document.addEventListener('DOMContentLoaded', function () {
  var fvSlider02 = new Swiper('#feature .swiper-container02', {
    loop: true,
    effect: 'fade',
    speed: 100,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    fadeEffect: {
      //ここにオプションを指定します。
      crossFade: true,
    },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  //  sec01 のリボンアニメーション
  const ribbonElement = document.querySelector('.link03--ribbon');

  if (ribbonElement) {
    // アニメーションをトリガーする関数
    function triggerRibbonAnimation() {
      // アニメーションクラスを一度削除し、再度追加することでアニメーションをリセット・再開
      ribbonElement.classList.remove('is-rotating');
      // DOMの再フローを強制するための短い遅延
      void ribbonElement.offsetWidth; // 強制的に再描画させるハック
      ribbonElement.classList.add('is-rotating');
    }

    // 最初の実行
    triggerRibbonAnimation();

    // 7秒ごとにアニメーションを繰り返す
    setInterval(triggerRibbonAnimation, 7000); // 7000ミリ秒 = 7秒
  }

  // sec03 likn11 スパンコールアニメーション
  // 1. アニメーションさせたい要素をすべて選択
  // ★ 1. 変数名を変更: triggerElementLink11
  const triggerElementLink11 = document.querySelector('.link11');

  // ★ 2. 変数名を変更: animatedElementsLink11
  const animatedElementsLink11 = document.querySelectorAll(
    '.link11--span01, .link11--span02'
  );

  if (!triggerElementLink11 || animatedElementsLink11.length === 0) return;

  // 3. オプションを変数名 link11Options に
  const link11Options = {
    root: null,
    //   rootMargin: '0px',
    threshold: 0.4, // 40% 画面に入ったら発動
  };

  // 4. 監視員を作成 (変数名を link11Observer に)
  const link11Observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // 5. もし (triggerElementLink11 が) 40% 以上画面内に入ってきたら
      if (entry.isIntersecting) {
        // 6. animatedElementsLink11 にクラスを追加
        animatedElementsLink11.forEach((el) => {
          el.classList.add('is-visible');
        });

        // 7. triggerElementLink11 の監視を停止
        obs.unobserve(triggerElementLink11);
      }
    });
  }, link11Options);

  // 8. triggerElementLink11 の監視を開始
  link11Observer.observe(triggerElementLink11);

  // sec03 link12 スパンアニメーション
  // 1. アニメーションさせたい要素 (.link12--span01) を選択
  const span01Element = document.querySelector('.link12--span01');

  if (!span01Element) return; // 要素がなければ何もしない

  // 2. IntersectionObserver のオプション (固有の変数名)
  //    「画面の真ん中」
  const link12Options = {
    root: null, // ビューポート（画面）を基準にする
    rootMargin: '0px',
    threshold: 0.7, // ★ 要素が 50% (中央) 画面に入ったら発動
  };

  // 3. 監視員 (固有の変数名)
  const link12Observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // 4. もし 50% 以上画面内に入ってきたら
      if (entry.isIntersecting) {
        // 'is-visible' クラスを追加してCSSアニメーションを発動
        entry.target.classList.add('is-visible');

        // 5. 一度発動したら、もう監視しない
        obs.unobserve(entry.target);
      }
    });
  }, link12Options); // ★ link12Options を使用

  // 6. 要素 (span01Element) の監視を開始
  link12Observer.observe(span01Element);

  // sec07 link26 りんごクリックアニメーション
  const appleElement = document.querySelector('.tap--anime .apple');
  const link26Image = document.querySelector('.link26__wrap .link26');
  const tapAnimeContainer = document.querySelector('.tap--anime');

  // ★ 追加: ロゴ要素を取得
  const logoElement = document.querySelector('.link26--logo');

  if (!appleElement || !link26Image || !logoElement) {
    console.warn(
      '必要な要素 (.apple, .link26, .link26--logo) が見つかりません。'
    );
    return;
  }

  let clickCount = 0;
  const maxClicks = 10;
  const scaleFactor = 0.96;

  // ==========================================
  // 1. りんご (.apple) クリック時の処理
  // ==========================================
  appleElement.addEventListener('click', () => {
    if (clickCount < maxClicks) {
      clickCount++;

      const currentScaleMatch =
        link26Image.style.transform.match(/scale\((.*?)\)/);
      let currentScale = currentScaleMatch
        ? parseFloat(currentScaleMatch[1])
        : 1;

      let newScale = currentScale * scaleFactor;

      link26Image.style.transform = `scale(${newScale})`;

      console.log(
        `クリック回数: ${clickCount}, 新しいスケール: ${newScale.toFixed(3)}`
      );

      // 10回目に達した場合の処理 (消える)
      if (clickCount === maxClicks) {
        console.log('最大クリック回数に達しました。消去アニメーション開始。');

        appleElement.style.cursor = 'default';

        setTimeout(() => {
          // --- link26: 上昇しながら消える ---
          link26Image.style.transition =
            'transform 2s ease-out, opacity 2s ease-out';
          link26Image.style.transform = `scale(${newScale}) translateY(-400px)`;
          link26Image.style.opacity = '0';

          // --- tap--anime: その場で消える ---
          if (tapAnimeContainer) {
            tapAnimeContainer.style.transition = 'opacity 2s ease-out';
            tapAnimeContainer.style.opacity = '0';
            tapAnimeContainer.style.pointerEvents = 'none';
          }
        }, 300);
      }
    }
  });

  // ==========================================
  // 2. ロゴ (.link26--logo) クリック時の処理 (リセット)
  // ==========================================
  logoElement.addEventListener('click', () => {
    // 全て消えている状態 (10回クリック後) のみ発動
    if (clickCount === maxClicks) {
      console.log('リセットアニメーション開始');

      // 1. カウントをリセット
      clickCount = 0;

      // 2. transitionを一旦無効化 (瞬時に移動させるため)
      link26Image.style.transition = 'none';
      if (tapAnimeContainer) tapAnimeContainer.style.transition = 'none';

      // 3. スタート位置 (1000px下) にセット
      // scale(1)に戻し、translateY(1000px)に配置
      link26Image.style.transform = 'scale(1) translateY(1000px)';
      link26Image.style.opacity = '0';

      if (tapAnimeContainer) {
        tapAnimeContainer.style.transform = 'translateY(1000px)';
        tapAnimeContainer.style.opacity = '0';
      }

      // 4. 強制的にブラウザに再描画させる (これが重要)
      // これをしないと、瞬時移動と次のアニメーションが繋がってしまう
      void link26Image.offsetWidth;

      // 5. ふわっと元の位置に戻るアニメーションを開始
      // 少しだけ遅延させてCSSの適用を確実にする
      setTimeout(() => {
        // ゆっくり戻る設定 (2秒)
        const resetTransition =
          'transform 2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s ease-out';

        link26Image.style.transition = resetTransition;
        link26Image.style.transform = 'scale(1) translateY(0)';
        link26Image.style.opacity = '1';

        if (tapAnimeContainer) {
          tapAnimeContainer.style.transition = resetTransition;
          tapAnimeContainer.style.transform = 'translateY(0)';
          tapAnimeContainer.style.opacity = '1';
        }
      }, 50);

      // 6. アニメーション完了後の後処理
      // (次のクリックのために設定を元に戻す)
      setTimeout(() => {
        // 画像のtransitionをクリック用(0.3s)に戻す
        link26Image.style.transition = 'transform 0.3s ease-out';

        // りんごのクリックを有効化
        appleElement.style.cursor = 'pointer';
        appleElement.style.opacity = '1';

        if (tapAnimeContainer) {
          tapAnimeContainer.style.pointerEvents = 'auto';
          // tapAnimeContainerのtransformは不要になるのでクリア
          tapAnimeContainer.style.transform = '';
          tapAnimeContainer.style.transition = '';
        }
      }, 2000); // アニメーション時間(2s)待機
    }
  });

  // ==========================================
  // 3. 初期化処理 (リロード対策)
  // ==========================================
  link26Image.style.transform = 'scale(1)';
  link26Image.style.opacity = '1';
  link26Image.style.transition = 'transform 0.3s ease-out';

  if (tapAnimeContainer) {
    tapAnimeContainer.style.opacity = '1';
    tapAnimeContainer.style.transition = '';
    tapAnimeContainer.style.pointerEvents = 'auto';
  }

  // sec02 link05 フェードインアニメーション
  // 1. アニメーションさせたい要素（親ラッパー）を選択
  const animatedWrapperLink05 = document.querySelector('.link05__wrap');

  if (!animatedWrapperLink05) return; // 要素がなければ何もしない

  // 2. ★ 変更点: 変数名を "options" から "optionsLink05" に変更
  const optionsLink05 = {
    root: null, // ビューポート（画面）を基準にする
    rootMargin: '0px',
    threshold: 0.5, // ★ 要素が 50% (中央) 画面に入ったら発動
  };

  // 3. ★ 変更点: 変数名を "observer" から "observerLink05" に変更
  const observerLink05 = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // 4. もし画面内に入ってきたら
      if (entry.isIntersecting) {
        // 'is-visible' クラスを追加してCSSアニメーションを発動
        entry.target.classList.add('is-visible');

        // 5. 一度発動したら、もう監視しない
        obs.unobserve(entry.target);
      }
    });
  }, optionsLink05); // ★ 変更点: optionsLink05 を使用

  // 6. ラッパーの監視を開始
  observerLink05.observe(animatedWrapperLink05); // ★ 変更点: observerLink05 を使用

  // ★ 1. 監視対象 (トリガー) となる can01 を選択
  const triggerElement = document.querySelector('.link16--can01');
  // ★ 2. クラスを付与する親ラッパーを選択
  const wrapper = document.querySelector('.link16__wrap');

  if (!triggerElement || !wrapper) return;

  // 3. オプション (変数名を link16Options に)
  const link16Options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // ★ 変更点: 30% 画面に入ったら発動
  };

  // 4. 監視員 (変数名を link16Observer に)
  const link16Observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // 5. もし 30% 以上画面内に入ってきたら
      if (entry.isIntersecting) {
        // ★ 6. 変更点: 親ラッパーに 'is-visible' を追加
        wrapper.classList.add('is-visible');

        // 7. トリガー要素 (can01) の監視を停止
        obs.unobserve(entry.target);
      }
    });
  }, link16Options);

  // 8. ★ 変更点: triggerElement (can01) の監視を開始
  link16Observer.observe(triggerElement);

  // .link24__wrap のベアとレッドのフェードアニメーション
  const redElement = document.querySelector('.rotate--red');
  const bearElement = document.querySelector('.rotate--bear');

  if (!redElement || !bearElement) {
    console.warn(
      'フェード用のアニメーション要素 (.rotate--red または .rotate--bear) が見つかりません。'
    );
    return;
  }

  const redDuration = 12000; // 6秒 (Redの表示時間)
  const bearDuration = 3000; // 3秒 (Bearの表示時間)

  // Red -> Bear への切り替え
  function fadeToBear() {
    redElement.style.opacity = '0';
    bearElement.style.opacity = '1';
    // 3秒後 (Bearの表示時間後) に Red に戻す
    setTimeout(fadeToRed, bearDuration);
  }

  // Bear -> Red への切り替え
  function fadeToRed() {
    redElement.style.opacity = '1';
    bearElement.style.opacity = '0';
    // 6秒後 (Redの表示時間後) に Bear に切り替える
    setTimeout(fadeToBear, redDuration);
  }

  // ループを開始
  // 最初にRedが6秒間表示されるのを待ってから、Bearに切り替える
  setTimeout(fadeToBear, redDuration);

  // .link25__wrap のキティとレッドのフェードアニメーション
  // 1. .link25__wrap 用の要素を取得
  const redElement_L25 = document.querySelector('.link25__wrap .rotate--red');
  const kittyElement_L25 = document.querySelector(
    '.link25__wrap .rotate--kitty'
  );

  if (!redElement_L25 || !kittyElement_L25) {
    console.warn(
      'フェード用のアニメーション要素 (.rotate--red または .rotate--kitty) が見つかりません。'
    );
    return;
  }

  // 2. タイミング（link24 と同じ）
  const redDuration_L25 = 12000; // 6秒 (Redの表示時間)
  const kittyDuration_L25 = 3000; // 3秒 (Kittyの表示時間)

  // 3. Red -> Kitty への切り替え
  function fadeToKitty_L25() {
    redElement_L25.style.opacity = '0';
    kittyElement_L25.style.opacity = '1';
    // 3秒後 (Kittyの表示時間後) に Red に戻す
    setTimeout(fadeToRed_L25, kittyDuration_L25);
  }

  // 4. Kitty -> Red への切り替え
  function fadeToRed_L25() {
    redElement_L25.style.opacity = '1';
    kittyElement_L25.style.opacity = '0';
    // 6秒後 (Redの表示時間後) に Kitty に切り替える
    setTimeout(fadeToKitty_L25, redDuration_L25);
  }

  // 5. ループを開始
  // 最初にRedが6秒間表示されるのを待ってから、Kittyに切り替える
  setTimeout(fadeToKitty_L25, redDuration_L25);
});

// link04 スクロールアニメーション
function setupGsap() {
  gsap.registerPlugin(ScrollTrigger);

  const centerContainer = document.querySelector('.container__center');
  if (!centerContainer) {
    console.error("基準要素 '.container__center' が見つかりません。");
    return;
  }
  /*
   * ▼▼▼【以下は既存の横スクロールコード（変更なし）】▼▼▼
   */
  const containerSelectors = ['.scroll-container'];

  containerSelectors.forEach((selector, index) => {
    const element = document.querySelector(selector);

    const contentSelector =
      index === 0
        ? '.link--scroll'
        : `.link--scroll${String(index + 1).padStart(2, '0')}`;
    const content = element ? element.querySelector(contentSelector) : null;
    console.log('content', content);

    if (!element || !content) {
      console.warn(`GSAP target elements not found for: ${selector}`);
      return;
    }

    gsap.to(selector, {
      x: () => `-${content.scrollWidth - centerContainer.offsetWidth}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'center center',
        end: () => `+=${content.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });
}
