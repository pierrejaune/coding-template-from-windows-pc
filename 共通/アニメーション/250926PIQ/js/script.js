window.addEventListener('load', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

$(function () {
  Array.prototype.remove = function (element) {
    for (var i = 0; i < this.length; i++)
      if (this[i] == element) this.splice(i, 1);
  };

  function preload(images, progress) {
    var total = images.length;
    $(images).each(function () {
      var src = this;
      $('<img>')
        .attr('src', src)
        .on('load', function () {
          images.remove(src);
          progress(total, total - images.length);
        });
    });
  }
  var now_percent = 0;
  var displaying_percent = 0;
  preload(
    [
      'https://feature-tool.bcg.staff-start.com/assets/uploads/202406/7442cd51-d20c-424a-a116-9b5310785b42/asset/images/visual1.jpg',
      'https://feature-tool.bcg.staff-start.com/assets/uploads/202406/7442cd51-d20c-424a-a116-9b5310785b42/asset/images/visual2.jpg',
    ],
    function (total, loaded) {
      now_percent = Math.ceil(100 * (loaded / total));
    }
  );

  var timer = window.setInterval(function () {
    if (displaying_percent >= 100) {
      window.clearInterval(timer);
      $('#loader').addClass('complete');
      setTimeout(function () {
        $('html,body').stop().animate(
          {
            scrollTop: 0,
          },
          0,
          'easeOutExpo'
        );
        $('#loader').animate(
          {
            opacity: 0,
          },
          function () {
            $('body').addClass('loaded');
            Contents();
          }
        );
      }, 1000);
    } else {
      if (displaying_percent < now_percent) {
        displaying_percent++;
        $('#loader')
          .find('.bar')
          .find('span')
          .css({
            width: displaying_percent * 1.25 + '%',
          });
      }
    }
    if (displaying_percent >= 20) {
      $('#loader').addClass('active');
    }
  }, 20);
});
/* loading */

function Contents() {
  $('#loader').remove();
  $('#visual').addClass('on');
  setTimeout(function () {
    $('#lead').addClass('on');
  }, 750);

  if ($(window).width() >= 768) {
    //runSwiper('.slidephoto',1,'fade',2000,1000);
    $('.link').on('click', function () {
      $(this).toggleClass('on');
    });
  } else {
    $('.link').on('click', function (e) {
      if (e.target.closest('.items__credit')) {
        console.log('not');
      } else {
        $(this).toggleClass('on');
      }
    });
  }

  $(window).on('scroll resize', function () {
    var $baseH = $(window).height();
    var $WH = $baseH / 1.5;
    var $WW = $(window).width();
    var $now = $(this).scrollTop();

    var $photo = [];
    var $text = [];

    var $sec3 = $('.sec3').offset().top;
    var $sec4 = $('.sec4').offset().top;

    $('.photo').each(function ($num) {
      $photo[$num] = $(this).offset().top;
      if ($now + $WH >= $photo[$num]) {
        $(this).addClass('show');
      }
    });
    $('.text').each(function ($num) {
      $text[$num] = $(this).offset().top;
      if ($now + $WH >= $text[$num]) {
        $(this).addClass('show');
      }
    });

    // sec3のパララックス効果（粘ってから開始）
    if ($sec3 < $now + $baseH * 0.5) {
      if ($WW >= 768) {
        $('.sec3')
          .find('.bgph')
          .css({
            top: 0 + ($now - $sec3) * 0.1,
          });
      } else {
        $('.sec3')
          .find('.bgph')
          .css({
            top: 0 + ($now - $sec3) * 0.1,
          });
      }
    }

    // sec4のパララックス効果（粘ってから開始）
    if ($sec4 < $now + $baseH * 0.5) {
      if ($WW >= 768) {
        $('.sec4')
          .find('.bgph')
          .css({
            top: 0 + ($now - $sec4) * 0.1,
          });
      } else {
        $('.sec4')
          .find('.bgph')
          .css({
            top: 0 + ($now - $sec4) * 0.1,
          });
      }
    }
  });

  $('.pgtop').on('click', function () {
    $('html,body').stop().animate(
      {
        scrollTop: 0,
      },
      1000,
      'easeOutExpo'
    );
    return false;
  });
}

function runSwiper($myTarget, $view, $effect, $speed, $delay) {
  var $mySwiper = new Swiper($myTarget, {
    loop: true,
    effect: $effect,
    speed: $speed,
    slidesPerView: $view,
    centeredSlides: false,
    autoplay: {
      delay: $delay,
    },
    spaceBetween: 20,
  });
}
//swiper

$(function () {
  // フェードイン
  $('.js-anime').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('is-animete-active');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.js-svg-draw');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.hasAttribute('data-animated')
        ) {
          entry.target.setAttribute('data-animated', 'true');
          console.log('Targets found:', targets.length);
          console.log('draw01:', document.getElementById('draw01'));
          console.log('draw02:', document.getElementById('draw02'));

          setTimeout(() => {
            const targetElement = entry.target;
            const targetId = targetElement.id;

            // SVG要素にフェードインのトランジションを追加
            targetElement.style.transition = 'opacity 0.5s ease-in-out';
            targetElement.style.opacity = '1';

            // Walkway.jsのアニメーションを開始
            const walkway = new Walkway({
              selector: `#${targetId}`,
              duration: 6000,
            });
            walkway.draw();
          }, 500); // 1000ミリ秒 = 1秒待機

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  targets.forEach((target) => {
    // 初期状態でSVGを非表示にする
    target.style.opacity = '0';
    observer.observe(target);
  });
});
