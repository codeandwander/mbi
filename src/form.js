// Set input values for character choices
export function setInputValues() {
  $('input[name="hair-colour"]').each(function () {
    const colourLabel = $(this).closest('label').find('span').html();
    $(this).val(colourLabel);
  });

  $('input[name="hair-style"]').each(function () {
    const styleAndColourID = $(this).closest('label').find('span').html();
    $(this).val(styleAndColourID);
  });

  $('input[name="Eye-Colour"]').each(function () {
    const colourLabel = $(this).closest('label').find('span').html();
    $(this).val(colourLabel);
  });

  $('input[name="skin-tone"]').each(function () {
    const skinId = $(this).closest('label').find('span').html();
    $(this).val(skinId);
  });
}

// Set classes for character assets
export function setCharacterPreviewClasses() {
  $('.character-preview-hair-item').each(function () {
    const hairLabel = $(this).find('.character-hair-label').text();
    $(this).find('.hair').addClass(hairLabel);
  });
}

export function displayBookControls() {
  $('.book-controls').each(function () {
    const currentId = $(this).attr('id');
    currentId === selectedBook ? $(this).css('display', 'flex') : $(this).hide();
  });
}

export function getRandomIndex(selector) {
  const { length } = $(selector);
  const random = Math.floor(Math.random() * length);
  return random;
}

export function setFormStep(stepButtonID) {
  $('#step-' + formStep + '-button')
    .prop('disabled', false)
    .removeClass('selected-form-step');
  $(stepButtonID).prop('disabled', true).addClass('selected-form-step');
}
