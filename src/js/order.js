
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



const orderForm = document.querySelector('.order__form');
const bntOrder = document.querySelector('.order__form-button-send');
const orderMessage = createOverlay(template);
var orderFormData = new FormData();

bntOrder.addEventListener('click', function(e)  {
  let message = 'Запрос: ';
  e.preventDefault();
  if (validateForm(orderForm)) {
    orderFormData.append('name', orderForm.elements.customer.value);
    orderFormData.append('phone', orderForm.elements.phone.value);
    orderFormData.append('comment', orderForm.elements.comment.value);
    orderFormData.append('to', 'order@burger.com');

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
    xhr.send(orderFormData);
    xhr.addEventListener('load', function(e) {
      orderMessage.open();
      orderMessage.setContent(xhr.response.message);
    });
  }
  else {
    orderMessage.open();
    orderMessage.setContent('Ошибка при заполнении данных в форме! Проверьте имя и телефон!');
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.customer)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  return field.checkValidity();
}
