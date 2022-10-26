export function displayAlert(alertType, message) {
  if (alertType === 'success') {
    $('.alert-banner').css('background-color', '#198754');
  } else if (alertType === 'error') {
    $('.alert-banner').css('background-color', '#dc3545');
  }

  $('.alert-banner > .alert-text-block > strong').text(message);

  $('.alert-banner').show();

  setTimeout(function () {
    $('.alert-banner').hide();
  }, 5000);
}
