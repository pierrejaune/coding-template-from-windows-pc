//fade
$(function () {
  $(window).on('load scroll', function () {
    $('.fadeIn,.fadeUp,.fadeLeft,.fadeRight,.clip,.clip02').each(function () {
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight * 1) {
        $(this).addClass('active');
      }
    });
  });
});

// movie
$(function () {
  $('.video-toggle-btn')
    .off('click')
    .on('click', function () {
      var $btn = $(this);
      var $video = $btn.closest('.movie').find('video')[0];

      if ($video.muted) {
        // 他の動画はすべてミュート
        $('video').prop('muted', true);
        $('.video-toggle-btn').addClass('is-muted');

        // この動画だけ解除
        $video.muted = false;
        $btn.removeClass('is-muted');
      } else {
        // この動画をミュート
        $video.muted = true;
        $btn.addClass('is-muted');
      }
    });
});

//sticky
$(function () {
  window.addEventListener('load', updateStickyPositions);
  window.addEventListener('resize', updateStickyPositions);

  function updateStickyPositions() {
    const containers = document.querySelectorAll('.sticky');
    const viewportHeight = window.innerHeight;

    containers.forEach(function (container) {
      const containerHeight = container.offsetHeight;

      const topValue = containerHeight - viewportHeight;
      container.style.top = -topValue + 'px';
    });
  }
});

// click
document.getElementsByTagName('html')[0].oncontextmenu = function () {
  return false;
};
