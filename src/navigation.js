export function navigateToCharacterSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-large-container').hide();
  $('.character-builder-container').show();
  $('.book-preview-container').hide();
}

export function navigateToBookSelection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').show();
  $('.book-small-list-container').show();
  $('.book-large-container').hide();
  $('.character-builder-container').hide();
  $('.book-preview-container').hide();
}

export function navigateToPreviewSection() {
  $('.book-preview-container').hide();
  $('.book-selector-container').hide();
  $('.book-small-list-container').hide();
  $('.book-large-container').hide();
  $('.character-builder-container').hide();
  $('.book-preview-container').show();
}
