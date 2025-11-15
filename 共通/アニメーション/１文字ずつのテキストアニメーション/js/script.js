// javascript
document.addEventListener('DOMContentLoaded', function () {
  const delayUnit = 0.05;
  const targets = document.querySelectorAll('.split-text');

  targets.forEach((el) => {
    // 両端の半角スペースを削除
    const trimmedText = el.textContent.trim();
    // 各文字に分割（空白も含む）
    const chars = trimmedText.split('');

    let index = 0;
    const spanned = chars
      .map((char) => {
        const delay = ((index + 1) * delayUnit).toFixed(2);
        // 半角スペースの場合は &nbsp; に置換
        const displayChar = char === ' ' ? '&nbsp;' : char;
        index++;
        return `<span style="transition-delay: ${delay}s;">${displayChar}</span>`;
      })
      .join('');

    el.innerHTML = spanned;
  });
});

// jQuery
// $(document).ready(function () {
//   $(function () {
//     var delayUnit = 0.05;

//     $('.split-text').each(function () {
//       var $this = $(this);
//       var text = $this.text();
//       var chars = text.split('');
//       var html = '';

//       $.each(chars, function (i, char) {
//         var delay = ((i + 1) * delayUnit).toFixed(2);
//         html +=
//           '<span style="transition-delay: ' + delay + 's;">' + char + '</span>';
//       });

//       $this.html(html);
//     });
//   });
// });

$(document).ready(function () {
  // IO START
  const animList = document.querySelectorAll('.anim');
  const IO = new IntersectionObserver((observer) => {
    observer.forEach(
      ({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('showed');
        } else {
          // target.classList.remove('showed');
        }
      },
      { threshold: 0.3 } //30%表示されたら発火
    );
  });
  animList.forEach((target) => IO.observe(target));
});
