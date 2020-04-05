const teamList = document.querySelector('.team__worker');
let workerActive;

teamList.addEventListener('click', function(e) {
  e.preventDefault();

  // Клик по активному классу - деактивируем его
  if (e.target.parentNode.classList.contains('worker__item') && e.target.parentNode.classList.contains('worker__item-active')) {
    e.target.parentNode.classList.remove('worker__item-active');
  } else {
    // Деактивируем активный класс
    workerActive = document.querySelector('.worker__item-active');
    if (!(workerActive === null)) {
      workerActive.classList.remove('worker__item-active');
    }
    // Устанавливаем активность новому классу
    e.target.parentNode.classList.add('worker__item-active');
  }
  
})