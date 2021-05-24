//Foundation initalisieren
$(document).foundation();


//Menüleiste + active-Links
$('.top-bar').on('sticky.zf.stuckto:top', function () {
  $(this).addClass('shrink');
}).on('sticky.zf.unstuckfrom:top', function () {
  $(this).removeClass('shrink');
});



var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+165,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});




//Slick Slider und Fortschrittsleiste
$(document).ready(function () {
  var time = 5;
  var $bar,
    $slick,
    isPause,
    tick,
    percentTime;

  $slick = $('.slider');
  $slick.slick({
    draggable: false,
    dots: false,
    arrows: false,
    fade: true,
    speed: 1000,
    cssEase: 'ease-in-out'
  });

  $bar = $('.slider-progress .progress');



  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if (isPause === false) {
      percentTime += 1 / (time + 0.1);
      $bar.css({
        width: percentTime + "%"
      });
      if (percentTime >= 100) {
        $slick.slick('slickNext');
        startProgressbar();
      }
    }
  }


  function resetProgressbar() {
    $bar.css({
      width: 0 + '%'
    });
    clearTimeout(tick);
  }

  startProgressbar();
})

