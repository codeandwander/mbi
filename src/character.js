import * as airtable from '../src/airtable.js';
import * as alerts from '../src/alerts';
import * as form from '../src/form.js';
import * as loading from '../src/loading.js';
import * as pagination from '../src/pagination.js';
import * as snipcart from '../src/snipcart.js';
import * as validation from '../src/validation.js';

// Build existing character
export function buildUserCharacter() {
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';
  let record = '';

  if (userSignedIn) {
    let userEmail = snipcart.getUserEmail();
    let characterList = airtable.getUserCharacters(userEmail);

    characterList.then((result) => {
      form.appendCharacterDropdownItems(loading.endLoadingAnimation);

      if (result.length > 0) {
        // Get most recently updated character
        const latestCharacter = result.reduce((a, b) =>
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
  const specialItems = fields['SPECIAL'] ? fields['SPECIAL'].split(',') : [];

  // removes all existing checked special items
  $('input[name="special"]:checkbox').removeAttr('checked');

  // Character Creation
  $('input[value=' + splitStyleColour[1] + ']').prop('checked', true);
  $('input[value=' + fields['HAIR'] + ']').prop('checked', true);
  $('input[value=' + fields['EYES'] + ']').prop('checked', true);
  $('input[value=' + fields['SKIN'] + ']').prop('checked', true);
  $('input[value=' + fields['COSTUME'] + ']').prop('checked', true);
  $('input[value=' + fields['MASK'] + ']').prop('checked', true);
  $('input[value=' + fields['CAPE'] + ']').prop('checked', true);

  if (specialItems) {
    specialItems.forEach((item) => {
      $('input[value=' + item + ']').prop('checked', true);
      $('input[value=' + item + ']')
        .parent()
        .find('.w-checkbox-input')
        .addClass('w--redirected-checked');
    });
  }
  $('input[value=' + fields['SIDEKICK'] + ']').prop('checked', true);
  $('input[value=sk-' + splitSidekickColour[1] + ']').prop('checked', true);
  $('input[value=' + fields['COVER_COLOUR'] + ']').prop('checked', true);
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
    pagination.buildPage(undefined, window.stepName);
  });
  renderCharacterPreview(function () {
    // let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';
    // userSignedIn ? '' : loading.endLoadingAnimation();
    loading.endLoadingAnimation();
  });
}

// Save an existing character to a user profile
export function saveCharacter() {
  // check if user is signed in
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

  if (!userSignedIn) {
    alerts.displayAlert('error', 'You must sign in to save a character.');
    return;
  }

  loading.beginLoadingAnimation();
  // validate inputs
  let heroNameInput = $('#hero-name-input').val();
  let validInput = validation.validInput(heroNameInput, 2, 50);

  if (!validInput) {
    return;
  }

  let currentCharacterId = sessionStorage.getItem('currentCharacterId');
  sessionStorage.setItem('currentCharacterName', heroNameInput);

  // pass displayAlert callback to addCharacter/updateCharacter
  currentCharacterId === null
    ? airtable.addCharacter(
        alerts.displayAlert('success', `${heroNameInput} was saved successfully!`)
      )
    : airtable.duplicateCharacter(
        alerts.displayAlert('success', `${heroNameInput} was saved successfully!`)
      );
  form.appendCharacterDropdownItems(loading.endLoadingAnimation);
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
  // const randomSpecial = form.getRandomIndex('input[name="special"]');
  const randomSidekickColour = form.getRandomIndex('input[name="sidekick-colour"]');
  const randomSidekick = form.getRandomIndex('input[name="sidekick"]');
  const randomCover = form.getRandomIndex('input[name="cover"]');

  $('input[name="special"]:checkbox').removeAttr('checked');

  $('input[name="hair-colour"]').eq(randomHairColour).prop('checked', true);
  $('input[name="hair-style"]').eq(randomHairStyle).prop('checked', true);
  $('input[name="Eye-Colour"]').eq(randomEyeColour).prop('checked', true);
  $('input[name="skin-tone"]').eq(randomSkinTone).prop('checked', true);
  $('input[name="costume"]').eq(randomCostume).prop('checked', true);
  $('input[name="mask"]').eq(randomMask).prop('checked', true);
  $('input[name="cape"]').eq(randomCape).prop('checked', true);
  $('input[name="special"]').eq(0).prop('checked', true);
  $('input[name="special"]')
    .eq(0)
    .parent()
    .find('.w-checkbox-input')
    .addClass('w--redirected-checked');
  $('input[name="sidekick-colour"]').eq(randomSidekickColour).prop('checked', true);
  $('input[name="sidekick"]').eq(randomSidekick).prop('checked', true);
  $('input[name="cover"]').eq(randomCover).prop('checked', true);

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
    if (maskId === 'msk000') {
      $('.mask:visible').hide();
      $('.sidekick-mask:visible').hide();
    } else {
      $('.mask:visible').first().hide();
      $('.sidekick-mask:visible').first().hide();
      $('.' + maskId).show();
      $(`.${sidekickId}-${maskId}`).show();
    }
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
  if (specialIds) {
    $('.special:visible').hide();
    specialIds.forEach((specialId) => {
      $('.' + specialId).show();
    });
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

export function loadCharacterPreviewItems(callback) {
  getCharacterItems()
    .then(addCharacterItemsToDOM)
    .then(form.setCharacterPreviewClasses)
    .then(window.randomiseOrLoadCharacter);
}

function getCharacterItems(pageParam) {
  return fetch(`https://make-believe-final.webflow.io/character-items${pageParam ? pageParam : ''}`)
    .then((response) => {
      if (response.status === 404) {
        throw new Error('Page could not be found.');
      }

      return response.text();
    })
    .then((text) => {
      const div = document.createElement('div');
      div.innerHTML = text;
      let charItems = div.querySelectorAll('.character-items');

      let characterItemsData = Array.from(charItems).map((charItem) => {
        let characterItemObj = {};
        let spans = charItem.querySelectorAll('span');

        spans.forEach((item) => {
          characterItemObj[item.className] = item.textContent;
        });

        return characterItemObj;
      });

      characterObjects = characterObjects.concat(characterItemsData);

      const nextButton = div.querySelector('.w-pagination-next');

      if (nextButton) {
        return getCharacterItems(`?${nextButton.href.split('?')[1]}`);
      }

      return characterObjects;
    });
}

// for each character object, route the items to a new div inside of the character-preview div.
function addCharacterItemsToDOM() {
  let characterPreviewDiv = document.querySelector('.character-preview');

  characterObjects.forEach((obj) => {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('character-item');

    // Category
    let categoryDiv = document.createElement('div');
    categoryDiv.classList.add('character-item-category');
    let categoryContent = document.createTextNode(obj['character-item-category']);
    categoryDiv.appendChild(categoryContent);

    // Category
    let labelDiv = document.createElement('div');
    labelDiv.classList.add('character-item-preview-label');
    let labelContent = document.createTextNode(obj['character-item-preview-label']);
    labelDiv.appendChild(labelContent);

    // Category
    let imageElement = document.createElement('img');
    imageElement.classList.add('character-item-preview-image');
    imageElement.src = obj['character-item-preview-image'];

    itemDiv.appendChild(categoryDiv);
    itemDiv.appendChild(labelDiv);
    itemDiv.appendChild(imageElement);

    characterPreviewDiv.appendChild(itemDiv);
  });
}
