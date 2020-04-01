const openButton = document.querySelector(".feedback");
let template = document.querySelector("#overlayTemplate").innerHTML;
const bodyScroll = document.querySelector('body');
const overlay = createOverlay(template);

openButton.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn--feedback")) {
    overlay.open();
    overlay.setContent(e.target.parentNode.querySelector('.feedback__info--feed').textContent);
  }
});

function createOverlay(template) {
  const fragment = document.createElement('div');

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".overlay");
  const contentElement = fragment.querySelector(".overlay__content");
  const closeElement = fragment.querySelector(".overlay__close");
  
  overlayElement.style.display = 'none';

  overlayElement.addEventListener("click", function(e) {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });
  closeElement.addEventListener("click", function(e) {
    e.preventDefault();
    contentElement.innerHTML = '';
    bodyScroll.style.overflow = '';
    document.body.removeChild(overlayElement);
  });

  return {
    open() {
      document.body.appendChild(overlayElement);
      bodyScroll.style.overflow = 'hidden';
    },
    close() {
      closeElement.click();
    },
    setContent(content) {
      contentElement.innerHTML = content;
      contentElement.parentNode.parentNode.style.display = 'flex';
    }
  };
}
