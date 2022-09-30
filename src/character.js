import * as airtable from '../src/airtable.js';
import * as form from '../src/form.js';
import * as hair from '../src/hair.js';
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

  $('input[value=' + splitStyleColour[1] + ']').prop('checked', true);
  $('input[value=' + fields['HAIR'] + ']').prop('checked', true);
  $('input[value=' + fields['EYES'] + ']').prop('checked', true);
  $('input[value=' + fields['SKIN'] + ']').prop('checked', true);
  $('#hero-name-input').val(fields['NAME']);

  getSelectedStyles();
  hair.displaySelectedColour();
  hair.checkSelectedHairstyle(function () {
    pagination.buildPage();
  });
  renderCharacterPreview();
}

// Creates a new randomised character
export function createNewCharacter() {
  $('.name-input').val('');
  randomiseCharacter();
  window.getSelectedStyles();
  hair.displaySelectedColour();
  hair.checkSelectedHairstyle(function () {
    pagination.buildPage();
  });
  renderCharacterPreview();
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

// Render the character preview
export function renderCharacterPreview() {
  // Hair
  if (styleColourId) {
    $('.hair:visible').first().hide();
    $('.' + styleColourId).show();
  } else {
    // selects random from list
    const { length } = $('.hair-container img');
    const random = Math.floor(Math.random() * length);
    $('.hair-container img').eq(random).show();
  }

  // Eyes
  if (eyesId) {
    $('.eyes:visible').first().hide();
    $('.' + eyesId).show();
  } else {
    const { length } = $('.eyes-container img');
    const random = Math.floor(Math.random() * length);
    $('.eyes-container img').eq(random).show();
  }

  // Skin
  if (skinToneId) {
    $('.skin:visible').first().hide();
    $('.' + skinToneId).show();
  } else {
    const { length } = $('.skin-container img');
    const random = Math.floor(Math.random() * length);
    $('.skin-container img').eq(random).show();
  }
}

// Randomise character
export function randomiseCharacter() {
  $('.name-input').val('');
  const randomHairColour = form.getRandomIndex('input[name="hair-colour"]');
  const randomHairStyle = form.getRandomIndex('input[name="hair-style"]');
  const randomEyeColour = form.getRandomIndex('input[name="Eye-Colour"]');
  const randomSkinTone = form.getRandomIndex('input[name="skin-tone"]');

  $('input[name="hair-colour"]').eq(randomHairColour).prop('checked', true);
  $('input[name="hair-style"]').eq(randomHairStyle).prop('checked', true);
  $('input[name="Eye-Colour"]').eq(randomEyeColour).prop('checked', true);
  $('input[name="skin-tone"]').eq(randomSkinTone).prop('checked', true);
}
