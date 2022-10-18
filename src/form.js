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

  $('input[name="costume"]').each(function () {
    const costumeId = $(this).closest('label').find('span').html();
    $(this).val(costumeId);
  });

  $('input[name="mask"]').each(function () {
    const maskId = $(this).closest('label').find('span').html();
    $(this).val(maskId);
  });

  $('input[name="cape"]').each(function () {
    const capeId = $(this).closest('label').find('span').html();
    $(this).val(capeId);
  });

  $('input[name="special"]').each(function () {
    const specialId = $(this).closest('label').find('span').html();
    $(this).val(specialId);
  });
}

// Set classes for character assets
export function setCharacterPreviewClasses() {
  $('.character-item').each(function () {
    const itemLabel = $(this).find('.character-item-preview-label').text();
    const itemCategory = $(this).find('.character-item-category').text().toLowerCase();
    $(this).find('.character-item-preview-image').addClass(itemLabel).addClass(itemCategory);
  });

  // $('.character-preview-eye-item').each(function () {
  //   const eyeLabel = $(this).find('.character-eye-label').text();
  //   $(this).find('.eyes').addClass(eyeLabel);
  // });

  // $('.character-preview-skin-item').each(function () {
  //   const skinLabel = $(this).find('.character-skin-label').text();
  //   $(this).find('.skin').addClass(skinLabel);
  // });

  // $('.character-preview-costume-item').each(function () {
  //   const costumeLabel = $(this).find('.character-costume-label').text();
  //   $(this).find('.costume').addClass(costumeLabel);
  // });

  // $('.character-preview-mask-item').each(function () {
  //   const maskLabel = $(this).find('.character-mask-label').text();
  //   $(this).find('.mask').addClass(maskLabel);
  // });

  // $('.character-preview-cape-item').each(function () {
  //   const capeLabel = $(this).find('.character-cape-label').text();
  //   $(this).find('.cape').addClass(capeLabel);
  // });

  // $('.character-preview-special-item').each(function () {
  //   const specialLabel = $(this).find('.character-special-label').text();
  //   $(this).find('.special').addClass(specialLabel);
  // });
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
  // $('input[name=hair-style]').each(function (index) {
  //   const elementColour = $(this).val().substring(6).toLowerCase();
  //   $(this)
  //     .closest('div')
  //     .addClass('hairstyle-' + index);
  //   if (elementColour !== hairColour) {
  //     $('.hairstyle-' + index).hide();
  //   }
  //   if (elementColour === hairColour) {
  //     $('.hairstyle-' + index).show();
  //   }
  // });

  $('.hair-collection-wrapper').each(function () {
    $(this).attr('class').includes(hairColour) ? $(this).show() : $(this).hide();
  });
}

// Updates the global variable for hair style and colour
export function updateStyleColourId() {
  styleColourId = hairstyleId + '-' + hairColour.toLowerCase();
}

// Checks the selected hairstyle
export function checkSelectedHairstyle(callback) {
  updateStyleColourId();
  $('input[value="' + styleColourId + '"]').prop('checked', true);

  callback && callback();
}
