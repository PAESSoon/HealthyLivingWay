$(function(){
    $(document).scroll(function(){
      var $nav = $("#nav-bar");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
  });