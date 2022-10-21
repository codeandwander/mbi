import * as airtable from '../src/airtable.js';
import * as form from '../src/form.js';
import * as loading from '../src/loading.js';
import * as pagination from '../src/pagination.js';
import * as snipcart from '../src/snipcart.js';

// Build existing character
export function buildUserCharacter() {
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';
  let record = '';

  if (userSignedIn) {
    let userEmail = snipcart.getUserEmail();
    let characterList = airtable.getUserCharacters(userEmail);

    characterList.then((result) => {
      result = $.parseJSON(result);
      form.appendCharacterDropdownItems();

      if (result['records'].length > 0) {
        // Get most recently updated character
        const latestCharacter = result['records'].reduce((a, b) =>
          a.fields.MODIFIED_AT > b.fields.MODIFIED_AT ? a : b
        );
        configureCharacter(latestCharacter['fields']);
      } else {
        randomiseCharacter();
      }
    });
  } else {
    record = airtable.getRecord();
    record.then((result) => {
      configureCharacter(result['fields']);
    });
  }
}

// Configure the interface and preview for the selected character
export function configureCharacter(fields) {
  sessionStorage.setItem('currentCharacterName', fields['NAME']);
  sessionStorage.setItem('currentCharacterId', fields['RECORD_ID']);

  const splitStyleColour = fields['HAIR'].split('-');
  const splitSidekickColour = fields['SIDEKICK'].split('-');

  // Character Creation
  $('input[value=' + splitStyleColour[1] + ']').prop('checked', true);
  $('input[value=' + fields['HAIR'] + ']').prop('checked', true);
  $('input[value=' + fields['EYES'] + ']').prop('checked', true);
  $('input[value=' + fields['SKIN'] + ']').prop('checked', true);
  $('input[value=' + fields['COSTUME'] + ']').prop('checked', true);
  $('input[value=' + fields['MASK'] + ']').prop('checked', true);
  $('input[value=' + fields['CAPE'] + ']').prop('checked', true);
  $('input[value=' + fields['SPECIAL'] + ']').prop('checked', true);
  $('input[value=' + fields['SIDEKICK'] + ']').prop('checked', true);
  $('input[value=sk-' + splitSidekickColour[1] + ']').prop('checked', true);
  $('#hero-name-input').val(fields['NAME']);

  // Pronouns, Dedication and Language
  $('input[value=' + fields['PRONOUNS'] + ']').prop('checked', true);
  $('input[value=' + fields['LANGUAGE'] + ']').prop('checked', true);

  configureInputs();
}

function configureInputs() {
  window.getSelectedStyles();
  form.displaySelectedColours();
  form.checkSelectedHairstyle(function () {
    pagination.buildPage();
  });
  renderCharacterPreview(function () {
    loading.displayElements();
  });
}

// Creates a new randomised character
export function createNewCharacter() {
  $('.name-input').val('');
  randomiseCharacter();
  airtable.addCharacter();
}

// Save an existing character to a user profile
export function saveCharacter() {
  // check if user is signed in
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

  // if not, tell them they need to sign in and redirect to login page
  if (userSignedIn) {
    let currentCharacterId = sessionStorage.getItem('currentCharacterId');
    sessionStorage.setItem('currentCharacterName', $('#hero-name-input').val());
    currentCharacterId === null ? airtable.addCharacter() : airtable.updateCharacter();
    form.appendCharacterDropdownItems();
  } else {
    $('.alert-banner').show();
    $('.alert-banner').innerHtml('blallals');
    // display error banner
  }
}

// Randomise character
export function randomiseCharacter() {
  $('.name-input').val('');
  const randomHairColour = form.getRandomIndex('input[name="hair-colour"]');
  const randomHairStyle = form.getRandomIndex('input[name="hair-style"]');
  const randomEyeColour = form.getRandomIndex('input[name="Eye-Colour"]');
  const randomSkinTone = form.getRandomIndex('input[name="skin-tone"]');
  const randomCostume = form.getRandomIndex('input[name="costume"]');
  const randomMask = form.getRandomIndex('input[name="mask"]');
  const randomCape = form.getRandomIndex('input[name="cape"]');
  const randomSpecial = form.getRandomIndex('input[name="special"]');
  const randomSidekickColour = form.getRandomIndex('input[name="sidekick-colour"]');
  const randomSidekick = form.getRandomIndex('input[name="sidekick"]');
  const randomPronoun = form.getRandomIndex('input[name="pronoun"]');
  const randomLanguage = form.getRandomIndex('input[name="language"]');

  $('input[name="hair-colour"]').eq(randomHairColour).prop('checked', true);
  $('input[name="hair-style"]').eq(randomHairStyle).prop('checked', true);
  $('input[name="Eye-Colour"]').eq(randomEyeColour).prop('checked', true);
  $('input[name="skin-tone"]').eq(randomSkinTone).prop('checked', true);
  $('input[name="costume"]').eq(randomCostume).prop('checked', true);
  $('input[name="mask"]').eq(randomMask).prop('checked', true);
  $('input[name="cape"]').eq(randomCape).prop('checked', true);
  $('input[name="special"]').eq(randomSpecial).prop('checked', true);
  $('input[name="sidekick-colour"]').eq(randomSidekickColour).prop('checked', true);
  $('input[name="sidekick"]').eq(randomSidekick).prop('checked', true);
  $('input[name="pronoun"]').eq(randomPronoun).prop('checked', true);
  $('input[name="language"]').eq(randomLanguage).prop('checked', true);

  sessionStorage.clear();
  configureInputs();
}

// Render the character preview
export function renderCharacterPreview(callback) {
  // Hair
  if (styleColourId) {
    $('.hair:visible').first().hide();
    $('.' + styleColourId).show();
  } else {
    // selects random from list
    const { length } = $('.hair').length;
    const random = Math.floor(Math.random() * length);
    $('.hair').eq(random).show();
  }

  // Eyes
  if (eyesId) {
    $('.eyes:visible').first().hide();
    $('.' + eyesId).show();
  } else {
    const { length } = $('.eyes').length;
    const random = Math.floor(Math.random() * length);
    $('.eyes').eq(random).show();
  }

  // Skin
  if (skinToneId) {
    $('.skintone:visible').first().hide();
    $('.' + skinToneId).show();
  } else {
    const { length } = $('.skintone').length;
    const random = Math.floor(Math.random() * length);
    $('.skintone').eq(random).show();
  }

  // Costume
  if (costumeId) {
    $('.costume:visible').first().hide();
    $('.sidekick-costume:visible').first().hide();
    $('.' + costumeId).show();
    $(`.${sidekickId}-${costumeId}`).show();
  } else {
    const { length } = $('.costume').length;
    const random = Math.floor(Math.random() * length);
    $('.costume').eq(random).show();
  }

  // Mask
  if (maskId) {
    $('.mask:visible').first().hide();
    $('.sidekick-mask:visible').first().hide();
    $('.' + maskId).show();
    $(`.${sidekickId}-${maskId}`).show();
  } else {
    const { length } = $('.mask').length;
    const random = Math.floor(Math.random() * length);
    $('.mask').eq(random).show();
  }

  // Cape
  if (capeId) {
    $('.cape:visible').first().hide();
    $('.sidekick-cape:visible').first().hide();
    $('.' + capeId).show();
    $(`.${sidekickId}-${capeId}`).show();
  } else {
    const { length } = $('.cape').length;
    const random = Math.floor(Math.random() * length);
    $('.cape').eq(random).show();
  }

  // Special
  if (specialId) {
    $('.special:visible').first().hide();
    $('.' + specialId).show();
  } else {
    const { length } = $('.special').length();
    const random = Math.floor(Math.random() * length);
    $('.special').eq(random).show();
  }

  if (sidekickColourId) {
    $('.sidekick:visible').first().hide();
    $('.' + sidekickColourId).show();
  } else {
    const { length } = $('.sidekick').length;
    const random = Math.floor(Math.random() * length);
    $('.sidekick').eq(random).show();
  }

  if (coverId) {
    $('.cover:visible').first().hide();
    $('.' + coverId).show();
  } else {
    const { length } = $('.cover').length;
    const random = Math.floor(Math.random() * length);
    $('.cover').eq(random).show();
  }

  callback && callback();
}
