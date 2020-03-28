(function eatMenu() {

  const eatMenuList = document.querySelector('.eat-menu__acco');
  let eatMenuActive;

  eatMenuList.addEventListener('click', function(e) {
    
    // Клик по ссылке обновляет страницу - нам это не нужно
    e.preventDefault();
    
    // Клик по активному классу - деактивируем (закрываем меню)
    if (e.path[1].classList.contains('eat-menu__acco-item-active')) {
      e.path[1].classList.remove('eat-menu__acco-item-active');
    }
    else {
      // Удаляем активный класс, если он есть у других
      eatMenuActive = document.querySelector('.eat-menu__acco-item-active');
      if (!(eatMenuActive === null)) {
        eatMenuActive.classList.remove('eat-menu__acco-item-active');
      }

      // Добавляем активный класс лишке, в которой лежит кликнутая ссылка
      e.path[1].classList.add('eat-menu__acco-item-active');
    }

  });

}) ();