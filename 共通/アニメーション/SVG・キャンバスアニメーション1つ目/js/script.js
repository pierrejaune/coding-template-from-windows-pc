$(document).ready(function () {
  // マウスに追従
  $(document).mousemove(function (event) {
    $('#follow-mouse').css({
      left: event.pageX - 25 + 'px',
      top: event.pageY - 25 + 'px',
    });
  });

  // SVGスライドイン
  setTimeout(function () {
    $('#slide-in-svg rect').animate({ x: '10' }, 1000);
  }, 500);

  // キャンバス背景アニメーション
  var canvas = document.getElementById('canvas-animation');
  var ctx = canvas.getContext('2d');
  var particles = [];

  for (var i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 1,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.8)';
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(draw);
  }

  draw();
});
