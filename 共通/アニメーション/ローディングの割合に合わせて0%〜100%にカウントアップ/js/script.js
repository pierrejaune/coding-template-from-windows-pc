// $(document).ready(function () {
//   let percentage = 0;
//   let interval = setInterval(function () {
//     if (percentage >= 100) {
//       clearInterval(interval);
//       $('.loading-overlay').fadeOut();
//     } else {
//       percentage++;
//       $('#loading-percentage').text(percentage);
//     }
//   }, 30); // 3秒で100%に到達するように
// });

$(document).ready(function () {
  let percentage = 0;
  let duration = 3000; // 3秒
  let startTime = Date.now();

  // ゆっくり開始 → 加速
  function easeInQuad(t) {
    return t * t;
  }
  // 速く開始 → 減速
  function easeOutQuad(t) {
    return t * (2 - t);
  }
  // ゆっくり開始 → 加速 → ゆっくり終了
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function updateProgress() {
    let elapsed = Date.now() - startTime;
    let progress = Math.min(elapsed / duration, 1); // 0 ~ 1 の範囲
    // let easedValue = Math.floor(easeInQuad(progress) * 100);
    // let easedValue = Math.floor(easeOutQuad(progress) * 100);
    let easedValue = Math.floor(easeInOutQuad(progress) * 100);

    $('#loading-percentage').text(easedValue);

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      $('.loading-overlay').fadeOut();
    }
  }

  requestAnimationFrame(updateProgress);
});

// *実際のロード進捗に基づいたカウントアップアニメーション;
// $(document).ready(function () {
//   let images = document.images; // ページ内のすべての画像
//   let totalImages = images.length; // 画像の総数
//   let loadedImages = 0; // 読み込まれた画像数
//   let progress = 0; // 読み込み進捗（%）

//   // 各画像の読み込みを監視
//   function updateProgress() {
//     progress = Math.floor((loadedImages / totalImages) * 100);
//     $('#loading-percentage').text(progress);

//     if (progress >= 100) {
//       setTimeout(function () {
//         $('.loading-overlay').fadeOut();
//       }, 500);
//     }
//   }

//   // 画像が読み込まれたらカウント
//   if (totalImages === 0) {
//     // 画像がない場合は即完了
//     progress = 100;
//     $('#loading-percentage').text(progress);
//     setTimeout(() => $('.loading-overlay').fadeOut(), 500);
//   } else {
//     for (let i = 0; i < totalImages; i++) {
//       let img = new Image();
//       img.src = images[i].src;
//       img.onload = function () {
//         loadedImages++;
//         updateProgress();
//       };
//       img.onerror = function () {
//         // 画像が読み込めなくてもカウント
//         loadedImages++;
//         updateProgress();
//       };
//     }
//   }

//   // 追加で、ページ全体の読み込みも監視
//   document.onreadystatechange = function () {
//     if (document.readyState === 'complete') {
//       progress = 100;
//       $('#loading-percentage').text(progress);
//       setTimeout(() => $('.loading-overlay').fadeOut(), 500);
//     }
//   };
// });
