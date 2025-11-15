document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalBg = document.getElementById('modalBg');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const modalImage = document.getElementById('modalImage');
  const modalLink = document.getElementById('modalLink');

  const galleryLinks = Array.from(document.querySelectorAll('.gallery a'));
  const details = document.querySelectorAll('.item-detail');
  const totalItems = galleryLinks.length;
  let currentIndex = 0;

  function showModal(index) {
    currentIndex = index;
    const linkEl = galleryLinks[index];
    const imgEl = linkEl.querySelector('img');

    modal.classList.add('show');

    // モーダル画像とリンク設定
    modalImage.src = imgEl.src;
    modalImage.alt = imgEl.alt;
    modalLink.href = linkEl.dataset.href;

    // テキスト表示切り替え
    details.forEach((detail) => {
      detail.dataset.index == index
        ? detail.classList.add('active')
        : detail.classList.remove('active');
    });
  }

  function hideModal() {
    modal.classList.remove('show');
  }

  function showPrev() {
    const newIndex = (currentIndex - 1 + totalItems) % totalItems;
    showModal(newIndex);
  }

  function showNext() {
    const newIndex = (currentIndex + 1) % totalItems;
    showModal(newIndex);
  }

  // ギャラリー画像クリック → モーダル表示
  galleryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(link.dataset.index, 10);
      showModal(idx);
    });
  });

  closeBtn.addEventListener('click', hideModal);
  modalBg.addEventListener('click', hideModal);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
});
