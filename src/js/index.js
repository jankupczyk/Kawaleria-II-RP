totop = document.getElementById("BTN-to-top")
window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }
  var winscroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winscroll / height) * 100;
  document.getElementById('progress-bar').style.width = `${scrolled}%`;
  document.getElementById('progress-bar').title = `Zwiedzono ${(scrolled).toFixed(1)}% strony`;
  document.getElementById('progress-bar-container').title = `Zostało ${(100 - scrolled).toFixed(1)}% strony do zwiedzenia`
}

const togglebtn = document.getElementsByClassName('toggle-btn')[0]
const links = document.getElementsByClassName('nav-links')[0]

togglebtn.addEventListener('click', () => {
  links.classList.toggle('active')
})


function TOTOP() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const selectHotspot = (e) => {
  const clickedHotspot = e.target.parentElement;
  const container = clickedHotspot.parentElement;

  const hotspots = container.querySelectorAll(".lg-hotspot");
  hotspots.forEach(hotspot => {
    if (hotspot === clickedHotspot) {
      hotspot.classList.toggle("lg-hotspot--selected");
    } else {
      hotspot.classList.remove("lg-hotspot--selected");
    }
  });
}

(() => {
  const buttons = document.querySelectorAll(".lg-hotspot__button");
  buttons.forEach(button => {
    button.addEventListener("click", selectHotspot);
  });
})();

var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove('active');

    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
  });

  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

var repeat = function (activeClass) {
  let active = document.getElementsByClassName('active');
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove('active');
      });

      slides[i].classList.add('active');
      btns[i].classList.add('active');
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 10000);
  }
  repeater();
}
repeat();

$(window).on("load", function () {
  $(".loading-screen-wrapper").fadeOut("slow");
});

$(function () {
  setTimeout(function () {

    $(window).fadeOut(500);
  }, 2000);
  $('html, body').css({ overflow: 'auto' });

});

const SunnyTheme = document.getElementById('chkbox');

SunnyTheme.addEventListener('change', () => {
  document.querySelector('.navbar').classList.toggle('sunny');
  document.querySelector('.main_content').classList.toggle('sunny');
  document.querySelector('body').classList.toggle('sunny');
  document.querySelector('.cytaty-container').classList.toggle('sunny');
  document.querySelector('.mity-container').classList.toggle('sunny');
  document.querySelector('.img-slider').classList.toggle('sunny');
  document.querySelector('.author').classList.toggle('sunny');
  document.querySelector('.label .ball').classList.toggle('sunny');
  document.querySelector('.I').classList.toggle('sunny');
  document.querySelector('.II').classList.toggle('sunny');
  document.querySelector('.III').classList.toggle('sunny');
  document.querySelector('.IV').classList.toggle('sunny');
  document.querySelector('.V').classList.toggle('sunny');
  document.querySelector('.VI').classList.toggle('sunny');
  document.querySelector('.VII').classList.toggle('sunny');
  document.querySelector('.footer-box').classList.toggle('sunny');
  document.querySelectorAll('.nav-links a').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('.footer-box').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('footer').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('p').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('a').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('h1').forEach(elem => elem.classList.toggle('sunny'));
  document.querySelectorAll('cite').forEach(elem => elem.classList.toggle('sunny'));
});