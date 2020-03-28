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
    
    // Вправо и еще не последний слайд - показываем очередной
    if (direction === 'right' && elemActive < countItems) {
      list.children[elemActive-1].classList.remove('slide--active');
      list.children[elemActive++].classList.add('slide--active');
    }

    // Влево и не первый слайд - показываем предыдущий
    if (direction === 'left' && elemActive > 1) {
      list.children[elemActive-1].classList.remove('slide--active');
      list.children[--elemActive-1].classList.add('slide--active');
      // elemActive--;
    }
  }

}) ();