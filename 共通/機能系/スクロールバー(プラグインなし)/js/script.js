const container = document.getElementById('sec__swipe');

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('dragging');
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('dragging');
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('dragging');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // ドラッグ感度
  container.scrollLeft = scrollLeft - walk;
});
