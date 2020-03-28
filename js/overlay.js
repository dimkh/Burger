const openButton = document.querySelector(".feedback");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);
const mainMenuFeedback = document.querySelector('.menu__link--feedback');

openButton.addEventListener("click", e => {
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
  
  overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });
  closeElement.addEventListener("click", () => {
    document.body.removeChild(overlayElement);
    mainMenuFeedback.click();
  });

  return {
    open() {
      document.body.appendChild(overlayElement);
    },
    close() {
      closeElement.click();
    },
    setContent(content) {
      contentElement.innerHTML = content;
    }
  };
}
