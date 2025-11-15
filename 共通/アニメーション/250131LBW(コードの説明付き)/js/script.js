document.addEventListener('DOMContentLoaded', () => {
  const scrollEl = document.getElementById('scroll');
  const header = document.querySelector('.pc-header-main');
  const fixed = document.querySelector('.sec__fixed');
  const item01 = document.querySelector('.scroll__item01');
  const item39 = document.querySelector('.scroll__item39');
  const creditLists = document.querySelectorAll('.creditList');
  const scrollItems = document.querySelectorAll('.scroll__item');
  const modal = document.querySelector('.modal');

  // ヘッダー表示
  header.classList.add('on');

  // ホイールで横スクロール
  scrollEl.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

    const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
    if (
      (scrollEl.scrollLeft <= 0 && e.deltaY < 0) ||
      (scrollEl.scrollLeft >= maxScrollLeft && e.deltaY > 0)
    )
      return;

    e.preventDefault();
    scrollEl.scrollLeft += e.deltaY;
  });

  // 固定要素表示 & クレジット切り替え
  scrollEl.addEventListener('scroll', () => {
    const item01Rect = item01.getBoundingClientRect();
    const item39Rect = item39.getBoundingClientRect();
    const fixedWidth = fixed.offsetWidth;

    // 固定要素ON/OFF（画面左に item01 が近づいたらON）
    if (item01Rect.left < window.innerWidth - item01Rect.width) {
      fixed.classList.add('on');
    } else {
      fixed.classList.remove('on');
    }

    // クレジット切り替え
    scrollItems.forEach((item) => {
      const feed = item.dataset.feed;
      const itemRect = item.getBoundingClientRect();
      const cr = itemRect.width * 0.3;
      const triggerX = itemRect.left + cr;

      const isInView = triggerX < window.innerWidth && item39Rect.left > 0;

      if (isInView) {
        creditLists.forEach((credit) => {
          credit.classList.toggle('on', credit.dataset.credit === feed);
        });
      } else if (item39Rect.left <= 0) {
        creditLists.forEach((credit) => credit.classList.remove('on'));
      }
    });
  });

  // スクロールを左端に戻す
  document.querySelector('.sec__staff-btn')?.addEventListener('click', () => {
    scrollEl.scrollLeft = 0;
  });

  // モーダル表示
  document.querySelectorAll('.js-feed').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!modal.classList.contains('on')) {
        modal.classList.add('on');
        scrollEl.scrollLeft = 0;
      }
    });
  });

  // モーダル閉じる
  document.querySelectorAll('.js-index').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modal.classList.contains('on')) {
        modal.classList.remove('on');
        header.classList.remove('on');
        scrollEl.scrollLeft = 0;
      }
    });
  });
});

// 独自追加対応
//data-index箇所を自動生成
document.addEventListener('DOMContentLoaded', () => {
  const indexContainer = document.querySelector('.sec__index');
  if (!indexContainer) return;

  // すべての対象要素 (.scroll__video または .scroll__img) を収集
  const items = [];

  document
    .querySelectorAll('.scroll__video, .sec__img,sec__movie')
    .forEach((el) => {
      const feed = el.dataset.feed;
      if (!feed) return;

      items.push({
        element: el,
        feed: feed,
        isVideo: el.classList.contains('scroll__video'),
      });
    });

  // data-feed の昇順でソート（文字列→数値変換して比較）
  items.sort((a, b) => Number(a.feed) - Number(b.feed));

  // 並び替えた順に .sec__index に追加
  items.forEach(({ element, feed, isVideo }) => {
    const cloned = element.cloneNode(true);
    const wrapper = document.createElement('div');

    if (isVideo) {
      wrapper.className = 'sec__index-img sec__index-movie';

      // feedが "00" の場合、動画パスをsp用に変更
      if (feed === '00') {
        const source = cloned.querySelector('source');
        if (source && source.src.includes('movie/movie01.mp4')) {
          source.src = source.src.replace(
            'movie/movie01.mp4',
            'movie/sp_movie01.mp4'
          );
        }
      }
    } else {
      wrapper.className = 'sec__index-img';
    }

    wrapper.setAttribute('data-index', feed);

    // 不要な親要素を避けて中身を入れる
    const child = cloned.firstElementChild;
    if (child) {
      wrapper.appendChild(child);
    }

    indexContainer.appendChild(wrapper);
  });
});
