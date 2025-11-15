$(document).ready(function () {
  $('.hamburger-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.nav-menu').toggleClass('active');
    $('.overlay').toggleClass('active'); // レイヤーの表示・非表示を切り替え
  });

  $('.overlay').on('click', function () {
    $('.hamburger-menu').removeClass('active');
    $('.nav-menu').removeClass('active');
    $(this).removeClass('active');
  });

  $('.has-submenu > a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('open');
    $(this).next('.submenu').slideToggle(300);
  });
});
