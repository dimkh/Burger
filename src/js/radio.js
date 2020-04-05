const radio = document.querySelector('.radio__list');

radio.addEventListener('click', function(e) {
  let radioActive = document.querySelector('.radio__active');

  // Удаляем активный класс у "прошлого" элемента
  radioActive.classList.remove('radio__active');
  // Устанавливаем его тому элементу, по которому кликнули
  e.path[1].classList.add('radio__active');
})