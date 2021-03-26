(function() {
  var $html = $("html"),
    $header = $(".header"),
    $btnHamburger = $(".btn-hamburger");
  var isMobile;
  $(window).on({
    'resize': function() {
      isMobile = window.matchMedia("(max-width: 1023px)");
    },
    'scroll': function() {
      var sct = $(this).scrollTop();
      if (sct > 130) {
        $html.addClass('is-fixed');
      } else {
        $html.removeClass('is-fixed');
      }
      var section = [
        '#section02',
        '#section05',
        '#section06',
        '#section07',
        '#footer'
      ]
      var sectionAll = [
        '#section01',
        '#section02',
        '#section03',
        '#section04',
        '#section05',
        '#section06',
        '#section07',
        '#section08',
        '#section09',
        '#footer'
      ]
      for (var i=0; i < section.length; i++) {
        if(isScrolledIntoView($(section)[i])) {
          menuActive(i);
        }
      }
      for (var i=0; i < sectionAll.length; i++) {
        if(isScrolledIntoView($(sectionAll)[i])) {
          sectionActive(i);
        }
      }
    }
  });
  $(window).trigger('resize');
  $(window).trigger('scroll');

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top + 300;
    var elemBottom = elemTop + $(elem).height();
    return ((docViewBottom > elemTop) && (docViewTop <= elemBottom));
  }

  function menuActive(index) {
    var $gnbElement = $('.gnb li');
    $gnbElement.removeClass('is-active');
    $gnbElement.eq(index).addClass('is-active');
  }

  function sectionActive(index) {
    var $section = $('.section');
    $section.removeClass('is-active');
    $section.eq(index).addClass('is-active');
  }

  if (isMobile) {
    $('.gnb').removeAttr('data-aos');
    $('.gnb li a').on('click', function(){
      $header.removeClass("is-open");
      $html.removeClass("is-menu-open");
    });
    $('.logo').on("click", function(e) {
      e.preventDefault();
      $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, 1000, "swing");
      $header.removeClass("is-open");
      $html.removeClass("is-menu-open");
    });
  }

  // mobile menu click
  $btnHamburger.on("click", function() {
    $header.toggleClass("is-open");
    $html.toggleClass("is-menu-open");
  });

  // 스크롤
  $(".js-scroll").on("click", function(e) {
    e.preventDefault();
    var hash = this.hash;
    var targetOffsetTop;
    var offset = $(this).data("offset") || 0;
    if (hash !== "") {
      targetOffsetTop = $(hash).position().top;
    } else {
      targetOffsetTop = 0;
    }
    if (isMobile) {
      targetOffsetTop = targetOffsetTop + 100
      $header.removeClass("is-open");
      $html.removeClass("is-menu-open");
    }
    $(this).parent('li').addClass('is-active').siblings().removeClass('is-active')
    $("html, body")
      .stop()
      .animate({ scrollTop: targetOffsetTop + offset }, 1000, "swing");
  });

  $('.tooltip-btn').on('click', function(){
    $(this).parent('.tooltip').toggleClass('is-open').siblings().removeClass('is-open');
  });

  // work filter layout
  // var workShuffle = new Shuffle(document.querySelector('.masonry-list'), {
  //   itemSelector: '.masonry-list-item',
  //   sizer: '.masonry-sizer'
  // });

  // 스크롤 인터렉션
  function initAOS() {
    // 모바일
    AOS.init({
      duration: 1000,
      easing: "igloo",
      once: true,
      delay:300,
      anchorPlacement: "top-center"
    });
  }

  // 로드시 실행, 클릭시 인터렉션 버그 대응

  $(window).on("DOMContentLoaded", initAOS);
  // workShuffle.on(Shuffle.EventType.LAYOUT, initAOS);
})();
