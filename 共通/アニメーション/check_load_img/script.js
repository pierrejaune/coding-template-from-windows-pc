const imgs = document.querySelectorAll('.target-images img');
let loadedCount = 0;

imgs.forEach((img) => {
  const onLoaded = () => {
    loadedCount++;
    checkLoaded();
  };

  // --- キャッシュ済み or すでに読み込み済み ---
  if (img.complete && img.naturalWidth > 0) {
    onLoaded();
  } else {
    // --- 通常の読み込み ---
    img.addEventListener('load', onLoaded);
  }
});

function checkLoaded() {
  if (loadedCount === imgs.length) {
    console.log('全ての画像が読み込まれました');
    startProcess();
  }
}

function startProcess() {
  // 両方（または複数）読み込み後の処理
}
