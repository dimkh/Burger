(function openMenu() {
  
  const menuBtn = document.querySelector('.hamburger-menu-link');
  const modalMenu = document.querySelector('.modal-menu');
  
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('hamburger-closed');
    modalMenu.classList.toggle('modal-menu--active');
  })

  modalMenu.addEventListener('click', function(e) {

    if (e.target.classList.contains('modal-menu__link')) {
      menuBtn.classList.toggle('hamburger-closed');
      modalMenu.classList.toggle('modal-menu--active');
    };

  })

}) ();