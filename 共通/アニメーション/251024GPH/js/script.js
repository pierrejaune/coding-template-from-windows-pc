// IMG FADE IN AND HOVER UP

window.onload = function () {
  // FadeIn2 Animation START
  const fadeIn2List = document.querySelectorAll('.fadeIn2');
  const fadeIn2IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.4,
    }
  );
  fadeIn2List.forEach((target) => fadeIn2IO.observe(target));
  // FadeIn2 Animation END

  // FadeIn3 Animation START
  const fadeIn3List = document.querySelectorAll('.fadeIn3');
  const fadeIn3IO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.4,
    }
  );
  fadeIn3List.forEach((target) => fadeIn3IO.observe(target));

  // FadeInR Animation START
  const fadeInRList = document.querySelectorAll('.fadeInR');
  const fadeInRIO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.4,
    }
  );
  fadeInRList.forEach((target) => fadeInRIO.observe(target));

  // FadeInL Animation START
  const fadeInLList = document.querySelectorAll('.fadeInL');
  const fadeInLIO = new IntersectionObserver(
    (observer) => {
      observer.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.4,
    }
  );
  fadeInLList.forEach((target) => fadeInLIO.observe(target));
};

$(function () {
  // フェードイン
  $('.js-anime').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active');
    }
  });
});

$(function () {
  // フェードイン
  $('.js-anime02').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-active02');
    }
  });
});

document.querySelectorAll('.buy').forEach((buy) => {
  const chars = buy.querySelectorAll('.char');

  gsap.set(chars, {
    opacity: 0,
  });

  const tlOpacity = gsap.timeline({
    scrollTrigger: {
      trigger: buy,
      start: 'top 95%',
      end: 'bottom top',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        tlOpacity.play();
      },
    },
  });

  chars.forEach((char, index) => {
    tlOpacity
      .to(char, {
        opacity: 1,
        y: 0,
        backgroundColor: 'black',
        color: 'white',
        duration: 0.01,
        delay: index * 0.01,
      })
      .to(
        char,
        {
          backgroundColor: 'transparent',
          color: 'black',
          duration: 0.01,
          delay: 0.01,
        },
        `+=${index * 0.01}`
      );
  });

  const tlBackground = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    paused: true,
  });

  chars.forEach((char, index) => {
    tlBackground
      .to(char, {
        backgroundColor: 'black',
        color: 'white',
        duration: 0.05,
        delay: index * 0.001,
      })
      .to(char, {
        backgroundColor: 'transparent',
        color: 'black',
        duration: 0.05,
        delay: 0.001,
      });
  });

  tlOpacity.eventCallback('onComplete', () => {
    gsap.delayedCall(2, () => {
      tlBackground.play();
    });
  });
});

var speed = 0.001;
document
  .querySelectorAll('.credit__table th,.credit__table td,.credit__text div')
  .forEach((buy) => {
    const chars = buy.querySelectorAll('.char');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: buy,
        start: 'top 95%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    });

    chars.forEach((char, index) => {
      tl.fromTo(
        char,
        {
          opacity: 0,
          y: 10,
          backgroundColor: 'transparent',
          color: 'black',
        },
        {
          opacity: 1,
          y: 0,
          backgroundColor: 'black',
          color: 'white',
          duration: 0.01,
          delay: index * speed,
        }
      ).to(
        char,
        {
          backgroundColor: 'transparent',
          color: 'black',
          duration: 0.01,
          delay: 0.01,
        },
        `+=${index * speed}`
      );
    });
  });

document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.link10s');
  const elementToAnimate = document.querySelector('.link10mono');

  if (!target || !elementToAnimate) {
    return;
  }

  // ★ 1. Observerのオプションを定義
  const options = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px',
    threshold: 0.5, // 監視対象が50%画面に入ったらトリガー
  };

  const callback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        elementToAnimate.classList.add('is-visible');
        observer.unobserve(target);
      }
    });
  };

  // ★ 2. Observer作成時にオプションを渡す
  const observer = new IntersectionObserver(callback, options);

  observer.observe(target);
});

document.addEventListener('contextmenu', function (event) {
  // ブラウザのデフォルトの右クリックメニューの表示をキャンセルします
  event.preventDefault();
});

document.addEventListener('dragstart', function (event) {
  // ドラッグされようとしている要素が画像（IMG）の場合
  if (event.target.tagName === 'IMG') {
    // ドラッグ操作をキャンセルします
    event.preventDefault();
  }
});

const video = document.getElementById('video');
const sound = document.getElementById('sound');

sound.addEventListener('click', () => {
  if (sound.dataset.sound === 'off') {
    video.muted = false;
    sound.dataset.sound = 'on';
  } else {
    video.muted = true;
    sound.dataset.sound = 'off';
  }
});
