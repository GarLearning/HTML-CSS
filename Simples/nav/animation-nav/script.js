let sliderWrap = document.querySelector('.social-login')
let slider = document.querySelector('.content')
let items = document.querySelectorAll('.item');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;
let interval;

items.forEach(item => {
 let clone = item.cloneNode(true);
 clone.classList.add('clone')
 slider.appendChild(clone)
 clones.push(clone)
})

function getScrollPos() {
 return window.scrollY;
}

function scrollUpdate() {
 scrollPos = getScrollPos();
 if(scrollPos >= clonesWidth) {
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
 clonesWidth = slider.offsetWidth / 2
 sliderWidth = innerHeight + clonesWidth;
}

function test(clear) {
 if(clear) {
  clearInterval(interval)
 } else {
  interval = setInterval(function() {window.scrollBy(0,1)}, 10)
 }
}


sliderWrap.addEventListener("mouseenter", enable);
sliderWrap.addEventListener("mouseleave", disable);



function preventScroll(e){
 e.preventDefault();
 e.stopPropagation();

 return false;
}

function disable(){
 document.querySelector('body').addEventListener('wheel', preventScroll, {passive: false});
 test()
}

function enable(){
 document.querySelector('body').removeEventListener('wheel', preventScroll);
 test(true)
}


onLoad()
disable()