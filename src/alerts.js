export function displayAlert(alertType, message, list) {
  if (alertType === 'success') {
    $('.alert-banner').css('background-color', '#198754');
  } else if (alertType === 'error') {
    $('.alert-banner').css('background-color', '#dc3545');
  }

  if (list) {
    let errorList = $('.alert-list');

    errorList.empty();

    list.forEach((item) => {
      errorList.append($('<li>').text(item));
    });

    errorList.show();
    $('.alert-text-block').hide();
  } else {
    $('.alert-banner > .alert-text-block > strong').text(message);
    $('.alert-list').hide();
    $('.alert-text-block').show();
  }

  $('.alert-banner').show();

  setTimeout(function () {
    $('.alert-banner').hide();
  }, 5000);
}
