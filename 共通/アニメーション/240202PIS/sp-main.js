// inview
$(function () {
  $('.inview').one('inview', function () {
    $(this).addClass('show');
  });
});

// 20%拡大するアニメーション
const scrlImgScale01 = document.querySelectorAll('.img01 img');
const scrlImgScale02 = document.querySelectorAll('.img02 img');
const scrlImgScale03 = document.querySelectorAll('.img03 img');
const scrlImgScale04 = document.querySelectorAll('.img04 img');
const scrlImgScale05 = document.querySelectorAll('.img05 img');

const ImgScale = (elements) => {
  if ('undefined' !== elements && elements.length > 0) {
    elements.forEach((element) => {
      let y =
        window.innerHeight -
        element.getBoundingClientRect().top -
        window.innerHeight / 2;

      if (y > 0) {
        if (window.matchMedia('(max-width: 767px)').matches) {
          element.style.transform =
            'scale3d(' + (0.00026 * y + 1) + ',' + (0.00026 * y + 1) + ',1)';
        } else if (window.matchMedia('(min-width:768px)').matches) {
          element.style.transform =
            'scale3d(' + (0.000122 * y + 1) + ',' + (0.000122 * y + 1) + ',1)';
        }
      }
    });
  }
};

document.addEventListener('scroll', () => {
  ImgScale(scrlImgScale01);
  ImgScale(scrlImgScale02);
  ImgScale(scrlImgScale03);
  ImgScale(scrlImgScale04);
  ImgScale(scrlImgScale05);
});
