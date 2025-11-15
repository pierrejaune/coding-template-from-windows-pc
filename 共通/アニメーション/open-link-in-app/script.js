//<a href='https://x.com/youraccount' class='x-link'>
//  Xで見る
//</a>

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.x-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');

      // iOSやAndroidアプリ内WebViewに対応する安全な開き方
      try {
        // 外部ブラウザで開かせる（推奨）
        window.open(url, '_blank');
      } catch (err) {
        // window.openが無効な環境ではlocation.hrefにフォールバック
        window.location.href = url;
      }
    });
  });
});
