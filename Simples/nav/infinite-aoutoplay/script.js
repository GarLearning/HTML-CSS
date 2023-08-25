function content() {
 let contentSlider = document.querySelector('.social-login');
 let listItem = document.querySelector('.content');
 let items = document.querySelectorAll('.item');
 let clone;

 const speed = 1;
 const width = listItem.offsetWidth;
 let move1 = 0;
 let move2 = width;

 function cloneContent() {
  clone = listItem.cloneNode(true);
  contentSlider.appendChild(clone);
  clone.style.left = `${width}px`;
 }

 function moveFirst() {
  move1 -= speed;

  if (width >= Math.abs(move1)) {
   listItem.style.left = `${move1}px`;
  } else {
   move1 = width;
  }
 }

 function moveSecond() {
  move2 -= speed;

  if (clone.offsetWidth >= Math.abs(move2)) {
   clone.style.left = `${move2}px`;
  } else {
   move2 = width;
  }
 }

 function hover() {
  clearInterval(a);
  clearInterval(b);
 }

 function unhover() {
  a = setInterval(moveFirst, 10);
  b = setInterval(moveSecond, 10);
 }

 cloneContent();

 let a = setInterval(moveFirst, 10);
 let b = setInterval(moveSecond, 10);

 contentSlider.addEventListener("mouseenter", hover);
 contentSlider.addEventListener("mouseleave", unhover);
}

content();