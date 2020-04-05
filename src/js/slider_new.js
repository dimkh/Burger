const leftArrow = document.querySelector('.slider__scroll--left');
const rightArrow = document.querySelector('.slider__scroll--right');
const sliderList = document.querySelector('.slider__list');
const sliderItem = sliderList.firstElementChild;

const minOffsetRight = 0;
const itemsCount = sliderList.children.length;

let stepSlideWidth = parseInt(getComputedStyle(sliderItem).width);
let maxOffsetRight = stepSlideWidth * (itemsCount - 1);
let currentOffsetRight = 0;

window.addEventListener('resize', () => {
  // При изменении размера окна пересчитываем ширину слайда
  // Начинаем показ заново
  stepSlideWidth = parseInt(getComputedStyle(sliderItem).width);
  maxOffsetRight = stepSlideWidth * (itemsCount - 1);
  currentOffsetRight = 0;
  sliderList.style.right = '0px';
})

rightArrow.addEventListener('click', () => {
  if (currentOffsetRight < maxOffsetRight) {
    currentOffsetRight += stepSlideWidth;
  } else {
    // Последний слайд - начинаем показ сначала
    currentOffsetRight = 0;
  }
  sliderList.style.right = currentOffsetRight+'px';
})

leftArrow.addEventListener('click', () => {
  if (currentOffsetRight > minOffsetRight) {
    currentOffsetRight -= stepSlideWidth;
  } else {
    // Первый слайд - переходим на последний
    currentOffsetRight = maxOffsetRight;
  }
  sliderList.style.right = currentOffsetRight+'px';
})