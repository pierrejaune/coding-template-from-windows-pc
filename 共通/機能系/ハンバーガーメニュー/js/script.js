$(document).ready(function () {
  $('.hamburger-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.nav-menu').toggleClass('active');
  });

  $('.has-submenu > a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('open');
    $(this).next('.submenu').slideToggle(300);
  });
});
