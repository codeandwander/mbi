export function navigateToCharacterSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-container-large').hide();
  $('.character-builder-container').show();
}

export function navigateToBookSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').show();
  $('.book-small-list-container').show();
  $('.book-container-large').hide();
  $('.character-builder-container').hide();
}
