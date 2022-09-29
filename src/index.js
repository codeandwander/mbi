import * as airtable from '../src/airtable.js';
import * as character from '../src/character.js';
import * as form from '../src/form.js';
import * as hair from '../src/hair.js';
import * as localStorage from '../src/localStorage.js';
import * as navigation from '../src/navigation.js';
import * as snipcart from '../src/snipcart.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  window.formStep = 1;
  window.hairstyleId = '';
  window.hairColour = '';
  window.styleColourId = hairstyleId + '-' + hairColour;
  window.eyesId = '';
  window.skinToneId = '';
  window.userId = '';
  window.sessionId = '';
  window.sessionRow = '';
  window.selectedBook = '';
  window.currentCharacterName = '';
  window.pronouns = '';
  window.language = '';

  const masterplan = new MasterPlan(document.getElementById('masterplan'), {
    clientID: '5140',
    jobID: '2000',
    theme: 'light',
    embedType: 'frame',
    thumbWidth: '300',
    autoFullscreen: true,
    showLoginLink: false,
    clientNameLink: false,
    showSpreadNums: false,
    customCss: {
      nestedToc: true,
    },
  });

  // Block is executed on page load - sets up the data etc.
  window.onload = function () {
    // this might be causing page to not always load
    Snipcart.events.on('snipcart.initialized', (snipcartState) => {
      navigation.navigateToCharacterSelection();
      snipcart.toggleUiElements();
      form.setFormStep('#step-1-button');
      form.setInputValues();
      form.setCharacterPreviewClasses();
      randomiseOrLoadCharacter();

      // need a better way to handle this
      setTimeout(function () {
        document.getElementsByTagName('html')[0].style.visibility = 'visible';
      }, 500);
    });
  };

  window.randomiseOrLoadCharacter = function () {
    const userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    // No character_id in local storage, and user not logged in
    if (sessionStorage.getItem('currentCharacterId') === null && !userSignedIn) {
      character.randomiseCharacter();
      window.getSelectedStyles();
      hair.displaySelectedColour();
      hair.checkSelectedHairstyle();
      character.renderCharacterPreview();
    } else {
      character.buildUserCharacter();
    }
  };

  /*
   * JQUERY FUNCTIONS
   */

  // Save Character Button Click
  $('.save-character-button').click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    character.saveCharacter();
  });

  // New Character Button Click
  $('.new-character-button').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    character.createNewCharacter();
  });

  // Character Dropdown Population
  $('.w-dropdown-list').on('click', '.character-dropdown-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const characterId = $(this).attr('id');

    let record = airtable.getRecord(characterId);
    record.then((result) => {
      character.configureCharacter(result['fields']);
    });
  });

  /*
   * LANGUAGE AND PRONOUN RADIO BUTTONS
   */

  $('.pronoun-radio-button').click(function () {
    window.pronouns = $(this).val();
  });

  $('.language-radio-button').click(function () {
    window.language = $(this).val();
  });

  /*
   * FORM STEP FUNCTIONS
   */

  // Form Step 1 Button
  $('#step-1-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-1-button');
    $('.form-step-1-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $('<style>[type=radio]:checked + img { outline: 5px solid #F080B2;}</style>').appendTo('head');
    formStep = 1;
  });

  // Form Step 2 Button
  $('#step-2-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-2-button');
    $('.form-step-2-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $('<style>[type=radio]:checked + img { outline: 5px solid #01AFDA;}</style>').appendTo('head');
    formStep = 2;
  });

  // Form Step 3 Button
  $('#step-3-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-3-button');
    $('.form-step-3-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #77B82A;}</style>').appendTo('head');
    formStep = 3;
  });

  /*
   * Step 1 Functions
   */

  /* On colour change, select the relevant hairstyle and colour */
  $('input[name="hair-colour"]').change(function (e) {
    hair.displaySelectedColour();
    hair.checkSelectedHairstyle();
    hair.updateStyleColourId();
    character.renderCharacterPreview();
  });

  $('input[name=hair-style]').change(function (e) {
    getSelectedStyles();
    hair.updateStyleColourId();
    character.renderCharacterPreview();
  });

  $('input[name=Eye-Colour]').change(function (e) {
    eyesId = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  $('input[name=skin-tone]').change(function (e) {
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  // Gets the ID of the selected hairstyle, e.g. hs001
  window.getSelectedStyles = function getSelectedStyles() {
    const styleAndColourID = $('input[name=hair-style]:checked', '#character-creation-form').val();
    hairstyleId = styleAndColourID.slice(0, 5);
    eyesId = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
  };

  /*
   *	Pick a Book
   */

  $('.pick-a-book').click(function (e) {
    e.preventDefault();
    // this now doesn't work - need to lookup character
    let currentCharacterId = sessionStorage.getItem('currentCharacterId');
    sessionStorage.setItem('currentCharacterName', $('#hero-name-input').val());
    currentCharacterId === null ? airtable.addCharacter() : airtable.updateCharacter();
    $('.character-builder-container').hide();
    $('.book-selector-container').show();
  });

  $('.edit-character-button').click(function (e) {
    e.preventDefault();

    $('.character-builder-container').show();
    $('.book-selector-container').hide();
  });

  $('.book-container').each(function () {
    // lowercase and hyphenates an id, adds to each book item
    const id = $(this).closest('div').find('.book-title').html().toLowerCase().replace(/ /g, '-');
    $(this).prop('id', id + '-book');
  });

  $('.book-container').click(function (e) {
    e.preventDefault();
    selectedBook = $(this).prop('id').slice(0, -5);

    $('.book-small-list-container').hide();
    $('.book-container-large').each(function () {
      console.log(selectedBook);
      const expectedId = 'large-' + selectedBook;
      $(this).attr('id') === expectedId ? $(this).css('display', 'flex') : $(this).hide();
    });
  });

  $('.book-container-large').each(function () {
    // lowercase and hyphenates an id, adds to each book item
    const id = $(this).closest('div').find('.book-title').html().toLowerCase().replace(/ /g, '-');
    $(this).prop('id', 'large-' + id);
  });

  $('.story-back-button').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    $('.book-small-list-container').css('display', 'flex');
    $('.book-container-large').hide();
  });

  $('.see-your-story-button').click(function (e) {
    e.preventDefault();
    localStorage.setSessionId();
    form.displayBookControls();
    $('.add-to-cart-btn').attr(
      'data-item-custom1-value',
      window.sessionStorage.getItem('currentCharacterName')
    );

    // post to airtable
    airtable.postToAirTable();
    airtable.updateCharacter();
    // wait for response from circular software

    // when response received, display preview
    $('.book-preview-container').css('display', 'flex');
    $('.book-selector-container').hide();
  });

  $('.edit-character').click(function (e) {
    e.preventDefault();
    $('.book-preview-container').hide();
    $('.character-builder-container').show();
  });

  $('.select-story').click(function (e) {
    e.preventDefault();
    $('.book-preview-container').hide();
    $('.book-selector-container').show();
  });

  /*
   * Preview Screen
   */

  $('.add-to-cart-btn').click(function (e) {
    navigation.navigateToCharacterSelection();
    character.createNewCharacter();
  });
});
