const sections = $(".section");
const radioes = $(".radio__elem");
const display = $(".maincontent");

let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;
  if (isNaN(position)) console.error("Передано неверное значение в countSectionPosition");
  return position;
};

const performTransition = sectionEq => {

  if (inScroll) return;

  inScroll = true;

  const position = countSectionPosition(sectionEq);
  const transitionOver = 1000;
  const mouseInertionOver = 300;  // Время "успокоения" инерции

  // Делаем текующую секцию активной, у соседних класс активности убираем
  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
  // Показываем активную секцию
  display.css({
    transform: `translateY(${position}%)`
  });

  setTimeout(() => {
    radioes.eq(sectionEq).addClass("radio__active").siblings().removeClass("radio__active");
    inScroll = false;
  }, transitionOver + mouseInertionOver);
};

const scroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) performTransition(nextSection.index());
    },
    prev() {
      if (prevSection.length) performTransition(prevSection.index());
    }
  }
  // const options = {
  //   next: "next",
  //   prev: "prev"
  // };
  // const chosenDirection = options[direction];

  // if (nextSection.length && direction === "next") performTransition(nextSection.index());
  // if (prevSection.length && direction === "prev") performTransition(prevSection.index());

};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const windowScroller = scroller();

  if (deltaY > 0) windowScroller.next();
  if (deltaY < 0) windowScroller.prev();

});

$(document).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = (tagName === "input" || tagName === "textarea");
  const windowScroller = scroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      windowScroller.prev();
      break;
    case 40:
      windowScroller.next();
      break;
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");

  performTransition(target);
});

// if (isMobile) {
//   $("body").swipe({
//     swipe: (event, direction) => {
//       const windowScroller = scroller();

//       if (direction === "up") windowScroller.next();
//       if (direction === "down") windowScroller.prev();
//     }
//   });
// }