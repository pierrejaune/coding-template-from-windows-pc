$(function () {
  $('.sec__slide').each(function () {
    const $this = $(this)[0];

    // autoplayを初期では止めた状態に
    const swiper = new Swiper($this, {
      loop: true,
      effect: 'fade',
      speed: 1000,
      allowTouchMove: true,
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false, // ← ホバーやスワイプでも止まらない
        pauseOnMouseEnter: false, // ← ホバーしても止まらない
      },
    });

    // autoplayを初期停止
    swiper.autoplay.stop();

    // .showedがついたらautoplayを開始
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if ($(mutation.target).hasClass('showed')) {
            swiper.autoplay.start();
          }
        }
      });
    });

    observer.observe($this, { attributes: true });
  });
});
