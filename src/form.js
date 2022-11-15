import * as airtable from '../src/airtable.js';
import * as character from '../src/character.js';
import * as snipcart from '../src/snipcart.js';
import { displayAlert } from './alerts.js';

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

//refactor this function to display them in the tabs
export function appendCharacterDropdownItems() {
  let userEmail = snipcart.getUserEmail();
  let characterList = airtable.getUserCharacters(userEmail);
  let characterSelectorList = $('.character-selector-list');
  // mobile version
  let characterDropdownList = $('.character-dropdown-list');

  characterSelectorList.empty();
  characterDropdownList.empty();

  characterList.then((result) => {
    $.each(result, function () {
      var $wrapper = $('<div/>', { class: 'character-list-item-container' }),
        $item = $('<div/>', {
          class: 'character-list-item',
          id: this.id,
          text: this.fields['NAME'],
        }),
        $deleteBtn = $('<div/>', { class: 'character-list-item-delete', id: this.id, text: 'X' });

      $wrapper.append($item);
      $wrapper.append($deleteBtn);
      $wrapper.clone().appendTo(characterSelectorList);
      $wrapper.clone().appendTo(characterDropdownList);
    });

    $('.w-dropdown-list div').click(function () {
      console.log('hi');
      $('.dropdown').triggerHandler('w-close.w-dropdown');
    });

    // Add click function to each button
    $('.character-list-item').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      const characterId = $(this).attr('id');

      let record = airtable.getRecord(characterId);
      record.then((result) => {
        character.configureCharacter(result['fields']);
      });
    });

    $('.character-list-item-delete').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      const characterId = $(this).attr('id');
      const characterName = $(this).parent().find('.character-list-item').text();

      if (sessionStorage.getItem('currentCharacterId') === characterId) {
        displayAlert('error', 'You cannot delete a character that is currently loaded.');
        return;
      }

      airtable.deleteCharacter(characterId, characterName);
      $(`#${characterId}`).parent().remove();
    });
  });
}

// Displays the hair styles for the selected colour
export function displaySelectedColours() {
  hairColour = $('input[name=hair-colour]:checked', '#character-creation-form').val().toLowerCase();
  sidekickColour = $('input[name=sidekick-colour]:checked', '#character-creation-form')
    .val()
    .toLowerCase();

  sidekickColour = sidekickColour.substr(3);

  $('.hair-collection-wrapper').each(function () {
    $(this).attr('class').includes(hairColour) ? $(this).show() : $(this).hide();
  });

  $('.sidekick-container :input').each(function () {
    $(this).val().includes(sidekickColour)
      ? $(this).closest('.sidekick-container').show()
      : $(this).closest('.sidekick-container').show().hide();
  });
}

// Updates the global variable for hair style and colour
export function updateStyleColourIds() {
  styleColourId = hairstyleId + '-' + hairColour.toLowerCase();
  sidekickColourId = sidekickId + '-' + sidekickColour.toLowerCase();
}

// Checks the selected hairstyle
export function checkSelectedHairstyle(callback) {
  updateStyleColourIds();
  $('input[value="' + styleColourId + '"]').prop('checked', true);

  callback && callback();
}

export function checkSelectedSidekick(callback) {
  updateStyleColourIds();
  $('input[value="' + sidekickColourId + '"]').prop('checked', true);

  callback && callback();
}
