// 自動設定はPage Speed Insightのパフォーマンス指標であるCLSに悪影響を与える
// document.addEventListener('DOMContentLoaded', () => {
//   const featureLazyImages = document.querySelectorAll('#feature img');

//   featureLazyImages.forEach((img) => {
//     const src = img.getAttribute('src');
//     if (src) {
//       const tmpImg = new Image();
//       tmpImg.src = src;
//       tmpImg.onload = () => {
//         img.setAttribute('width', tmpImg.naturalWidth);
//         img.setAttribute('height', tmpImg.naturalHeight);
//         img.setAttribute('data-src', src);
//         img.removeAttribute('src');
//         img.classList.add('lazyload');
//       };
//     }
//   });

//   window.lazySizesConfig = window.lazySizesConfig || {};
//   lazySizesConfig.loadMode = 1;

//   window.addEventListener('load', function () {
//     document.addEventListener('lazyloaded', function (e) {
//       const img = e.target;
//       if (img.closest('.feature .main')) {
//         img.classList.add('loaded');
//       }
//     });
//   });

//   window.addEventListener('load', () => {
//     document
//       .querySelectorAll('.feature .main img.lazyloaded:not(.loaded)')
//       .forEach((img) => {
//         img.classList.add('loaded');
//       });
//   });
// });
