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
