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
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
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