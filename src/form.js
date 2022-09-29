import * as airtable from '../src/airtable.js';
import * as snipcart from '../src/snipcart.js';

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
    const currentId = $(this).attr('id').slice(0, -9);
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

export function appendCharacterDropdownItems() {
  let userEmail = snipcart.getUserEmail();
  let characterList = airtable.getUserCharacters(userEmail);
  let $characterDropdown = $('.w-dropdown-list');
  $characterDropdown.empty();

  characterList.then((result) => {
    result = $.parseJSON(result);

    $.each(result['records'], function () {
      $characterDropdown.append(
        `<a href="#" class="w-dropdown-link character-dropdown-link" tabindex="0" id="${this.id}">${this.fields['NAME']}</a>`
      );
    });
  });
}
