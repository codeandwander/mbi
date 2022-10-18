import * as airtable from '../src/airtable.js';
import * as snipcart from '../src/snipcart.js';

// Set input values for character choices
// This can be changed to foreach over a class specifically for the character radio inputs
export function setInputValues() {
  $('form#character-creation-form :input').each(function () {
    const label = $(this).closest('label').find('span').html();
    $(this).val(label);
  });
}

// Set classes for character assets
export function setCharacterPreviewClasses() {
  $('.character-item').each(function () {
    const itemLabel = $(this).find('.character-item-preview-label').text();
    const itemCategory = $(this).find('.character-item-category').text().toLowerCase();
    $(this).find('.character-item-preview-image').addClass(itemLabel).addClass(itemCategory);
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

// Displays the hair styles for the selected colour
export function displaySelectedColour() {
  hairColour = $('input[name=hair-colour]:checked', '#character-creation-form').val().toLowerCase();
  sidekickColour = $('input[name=sidekick-colour]:checked', '#character-creation-form')
    .val()
    .toLowerCase();

  $('.hair-collection-wrapper').each(function () {
    $(this).attr('class').includes(hairColour) ? $(this).show() : $(this).hide();
  });

  $('.sidekick-container :input').each(function () {
    $(this).val().includes(sidekickColour.substr(3))
      ? $(this).closest('.sidekick-container').show()
      : $(this).closest('.sidekick-container').show().hide();
  });
}

// Updates the global variable for hair style and colour
export function updateStyleColourId() {
  styleColourId = hairstyleId + '-' + hairColour.toLowerCase();
}

export function updateSidekickColourId() {
  sidekickColourId = sidekickId + '-' + sidekickColour.toLowerCase();
}

// Checks the selected hairstyle
export function checkSelectedHairstyle(callback) {
  updateStyleColourId();
  $('input[value="' + styleColourId + '"]').prop('checked', true);

  callback && callback();
}
