(function slider() {
  var elemActive = 1;
  const list = document.querySelector('.slider__list');
  const countItems = list.children.length;
  const scrollLeft  = document.querySelector('.slider__scroll--left');
  const scrollRight = document.querySelector('.slider__scroll--right');

  scrollLeft.addEventListener('click', function(e) {
    loop('left', e);
  });

  scrollRight.addEventListener('click', function(e) {
    loop('right', e);
  });

  function loop(direction, e) {
    e.preventDefault();
    
    // Текущий слайд стал неактивным
    list.children[elemActive-1].classList.remove('slide--active');
    
    if (direction === 'right') {
      // Был последний слайд - показываем первый
      if (elemActive === countItems) { elemActive = 0; }
      list.children[elemActive++].classList.add('slide--active');
    }

    if (direction === 'left') {
      // Был первый слайд - показываем последний
      if(elemActive === 1) { elemActive = countItems + 1; }
      list.children[--elemActive-1].classList.add('slide--active');
    }
  }

}) ();