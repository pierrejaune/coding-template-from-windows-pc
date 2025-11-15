// リファクタリング後
// jQueryのDOM Readyでslickプラグインの読み込み完了を保証
$(function () {
  // --- IntersectionObserver (vanilla) ---
  const targetList = document.querySelectorAll('.target');
  const IO = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) target.dataset.isActive = 'true';
      });
    },
    { threshold: 0.3 }
  );
  targetList.forEach((t) => IO.observe(t));

  // --- 定数 ---
  const arrowClasses = [
    'cute',
    'activecute',
    'fresh',
    'coolcasual',
    'feminine',
    'softelegant',
    'elegant',
    'cool',
  ];
  const brandNames = {
    cute: 'キュート',
    activecute: 'アクティブキュート',
    fresh: 'フレッシュ',
    coolcasual: 'クールカジュアル',
    feminine: 'フェミニン',
    cool: 'クール',
    softelegant: 'ソフトエレガント',
    elegant: 'エレガント',
  };

  // --- 共通UI更新 ---
  function updateUI() {
    // fade時は複数activeになることがあるため .slick-current を採用
    const $activeSlide = $('.item__slide-box.slick-current');
    if ($activeSlide.length === 0) return;

    const arrow = $activeSlide.data('arrow'); // 例: "cute" 等

    // 矢印色切り替え
    const $arrows = $('.slick-arrow');
    if ($arrows.length) {
      $arrows.removeClass(arrowClasses.join(' '));
      if (arrow) $arrows.addClass(arrow);
    }

    // .item__type の on 切替（スライドに .cool が付いているとき）
    $('.item__type').toggleClass('on', $activeSlide.hasClass('cool'));

    // ブランド名表示
    $('.js-brand').text(brandNames[arrow] || '');

    // アイテム切り替え
    if (arrow) {
      $('.item__brand-list, .item__panel')
        .removeClass('on')
        .filter('.' + arrow)
        .addClass('on');
    } else {
      $('.item__brand-list, .item__panel').removeClass('on');
    }
  }

  // --- slick 初期化（jQuery） ---
  // slickイベントを初期化前にバインドしておくのが確実
  $('.item__slide')
    .on('init', updateUI)
    .on('afterChange', updateUI)
    .on('reInit', updateUI);

  $('.item__type')
    .on('init', function () {
      /* nav側はUI更新不要だが保険で */
    })
    .on('afterChange', function () {
      /* asNavForでmain側が更新→updateUIはmain側で発火 */
    });

  $('.item__slide').slick({
    asNavFor: '.item__type',
    arrows: true,
    autoplay: false,
    fade: true,
    speed: 500,
    infinite: true,
    swipe: false,
    slidesToShow: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  $('.item__type').slick({
    asNavFor: '.item__slide',
    autoplay: false,
    dots: false,
    slidesToShow: 8,
    focusOnSelect: true,
    infinite: true,
  });

  // --- イベント（vanillaベース） ---
  // 顔リンク → 指定スライドへ移動（移動後にafterChangeでUI同期）
  document.querySelectorAll('.hero__link-face').forEach((el) => {
    el.addEventListener('click', function () {
      const page = parseInt(this.dataset.face, 10) || 0;
      $('.item__slide').slick('slickGoTo', page, false);
    });
  });

  // （任意）タイプ名などのクリックで見た目だけ再同期したい場合
  // document.querySelectorAll('.item__type-text').forEach((el) => {
  //   el.addEventListener('click', updateUI);
  // });

  // （任意）タッチ終了後に微調整したい場合の保険
  document.querySelectorAll('.item__slide-img').forEach((el) => {
    el.addEventListener('touchend', () => setTimeout(updateUI, 80));
  });

  // 初期状態でも一応同期（initで反映されるが保険）
  updateUI();
});
