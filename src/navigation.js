export function navigateToCharacterSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-large-container').hide();
  $('.character-builder-container').show();
  $('.book-preview-container').hide();
  $('.basket-confirmation-container').hide();
  var container = document.getElementById('character-builder-container');
  container.scrollIntoView();
}

export function navigateToBookSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').show();
  $('.book-small-list-container').show();
  $('.book-large-container').hide();
  $('.character-builder-container').hide();
  $('.book-preview-container').hide();
  $('.basket-confirmation-container').hide();
  var container = document.getElementById('book-selector-container');
  container.scrollIntoView();
}

export function navigateToPreviewSection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-small-list-container').hide();
  $('.book-large-container').hide();
  $('.character-builder-container').hide();
  $('.book-preview-container').show();
  $('.basket-confirmation-container').hide();
  var container = document.getElementById('book-preview-container');
  container.scrollIntoView();
}

export function navigateToBasketConfirmation() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-small-list-container').hide();
  $('.book-large-container').hide();
  $('.character-builder-container').hide();
  $('.book-preview-container').hide();
  $('.basket-confirmation-container').show();
  var container = document.getElementById('basket-confirmation-container');
  container.scrollIntoView();
}
