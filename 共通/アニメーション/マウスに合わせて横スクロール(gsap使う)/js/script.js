gsap.registerPlugin(ScrollTrigger);

// .feature が画面に入ったら showed を付与
ScrollTrigger.create({
  trigger: '.feature',
  start: 'top 80%',
  onEnter: () => {
    document.querySelector('.feature')?.classList.add('showed');
  },
  once: true,
});

const slides = gsap.utils.toArray('.c__sec');
const container = document.querySelector('.feature');

let totalWidth = 0;
slides.forEach((slide) => {
  totalWidth += slide.offsetWidth;
});

// スクロールを止めるための関数　ここから
let isLocked = false;
let lockScrollId = null;
let lockedY = 0;
function lockScrollPosition() {
  lockedY = window.scrollY;

  const loop = () => {
    if (!isLocked) return;
    window.scrollTo(0, lockedY);
    lockScrollId = requestAnimationFrame(loop);
  };

  loop();
}

function unlockScrollPosition() {
  cancelAnimationFrame(lockScrollId);
}
// スクロールを止めるための関数　ここまで
const horizontalScroll = gsap.to(slides, {
  x: () => `-${totalWidth - window.innerWidth}px`,
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    end: () => `+=${totalWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      if (self.progress === 1 && !isLocked) {
        isLocked = true;
        lockScrollPosition();

        setTimeout(() => {
          unlockScrollPosition();
          isLocked = false;
        }, 1000);
      }
    },
  },
});

// 各スライドの状態管理（credit, showed）
slides.forEach((slide, index) => {
  ScrollTrigger.create({
    trigger: slide,
    containerAnimation: horizontalScroll,
    start: 'left 50%',
    end: 'left 95%',
    onEnter: () => {
      // credit の切り替え
      document
        .querySelectorAll('.credit')
        .forEach((el) => el.classList.remove('on'));
      const credit = document.querySelector(`.credit0${index + 1}`);
      if (credit) credit.classList.add('on');

      // showed の付け替え（全て外してから今のだけ付ける）
      slides.forEach((el) => el.classList.remove('showed'));
      slide.classList.add('showed');
    },
    onLeaveBack: () => {
      // credit の切り替え（1つ前に戻す）
      document
        .querySelectorAll('.credit')
        .forEach((el) => el.classList.remove('on'));
      const prevCredit = document.querySelector(`.credit0${index}`);
      if (prevCredit) prevCredit.classList.add('on');

      // showed の付け替え（1つ前に戻す）
      slides.forEach((el) => el.classList.remove('showed'));
      if (slides[index - 1]) slides[index - 1].classList.add('showed');
    },
    markers: true,
  });
});

// ✅ マウスドラッグ・タッチ操作による横スクロール追加処理（追記部分）
let isDragging = false;
let startX;
let scrollLeft;

const scrollBox = document.querySelector('.scroll__box');
scrollBox.addEventListener('mousedown', (e) => {
  isDragging = true;
  scrollBox.classList.add('dragging');
  startX = e.pageX - scrollBox.offsetLeft;
  scrollLeft = scrollBox.scrollLeft;
});
scrollBox.addEventListener('mouseleave', () => {
  isDragging = false;
  scrollBox.classList.remove('dragging');
});
scrollBox.addEventListener('mouseup', () => {
  isDragging = false;
  scrollBox.classList.remove('dragging');
});
scrollBox.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollBox.offsetLeft;
  const walk = (x - startX) * 1.5;
  scrollBox.scrollLeft = scrollLeft - walk;
});

// タッチ操作（スマホ）
scrollBox.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - scrollBox.offsetLeft;
  scrollLeft = scrollBox.scrollLeft;
});
scrollBox.addEventListener('touchend', () => {
  isDragging = false;
});
scrollBox.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - scrollBox.offsetLeft;
  const walk = (x - startX) * 1.5;
  scrollBox.scrollLeft = scrollLeft - walk;
});
