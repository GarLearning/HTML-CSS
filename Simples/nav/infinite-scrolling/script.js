let sliderWrap = document.querySelector('.social-login')
let slider = document.querySelector('.content')
let items = document.querySelectorAll('.item');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;

items.forEach(item => {
 let clone = item.cloneNode(true);
 clone.classList.add('clone')
 slider.appendChild(clone)
 clones.push(clone)
})


function getClonesWidth() {
 let width = 0;
 clones.forEach(clone => {
  width += clone.offsetWidth + (parseInt(getComputedStyle(clone).marginLeft) * 2)
 })

 return width
}

function getScrollPos() {
 return window.scrollY;
}

function scrollUpdate() {
 scrollPos = getScrollPos();
 if(scrollPos >= 500) {
  window.scrollTo({top: 1})
 }else if(scrollPos <= 0) {
  window.scrollTo({top: clonesWidth - 1})
 }

 slider.style.transform = `translateX(${-window.scrollY}px)`

 requestAnimationFrame(scrollUpdate)
}

window.addEventListener('resize', onLoad);

function onLoad() {
 calculateDimensions()
 document.body.style.height = `${sliderWidth}px`

 window.scrollTo({top: 1})
 scrollUpdate();
}

function calculateDimensions() {
 clonesWidth = getClonesWidth();
 sliderWidth = innerHeight + clonesWidth;
}

onLoad()