import * as airtable from '../src/airtable.js';
import * as character from '../src/character.js';
import * as form from '../src/form.js';
import * as hair from '../src/hair.js';
import * as loading from '../src/loading.js';
import * as localStorage from '../src/localStorage.js';
import * as navigation from '../src/navigation.js';
import * as pagination from '../src/pagination.js';
import * as snipcart from '../src/snipcart.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  window.formStep = 1;
  window.hairstyleId = '';
  window.hairColour = '';
  window.styleColourId = hairstyleId + '-' + hairColour;
  window.eyesId = '';
  window.skinToneId = '';
  window.costumeId = '';
  window.maskId = '';
  window.capeId = '';
  window.specialId = '';
  window.userId = '';
  window.sessionId = '';
  window.sessionRow = '';
  window.selectedBook = '';
  window.currentCharacterName = '';
  window.pronouns = '';
  window.language = '';

  // Responsive Pagination
  $(document).ready(function () {
    var resizeDelay = 200;
    var doResize = true;
    var resizer = function () {
      if (doResize) {
        window.innerWidth <= 767 ? (window.numberPerPage = 3) : (window.numberPerPage = 9);
        pagination.buildPage();
        doResize = false;
      }
    };
    var resizerInterval = setInterval(resizer, resizeDelay);
    resizer();

    $(window).resize(function () {
      doResize = true;
    });
  });

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
    });
  };

  window.randomiseOrLoadCharacter = function () {
    const userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    // No character_id in local storage, and user not logged in
    if (sessionStorage.getItem('currentCharacterId') === null && !userSignedIn) {
      character.randomiseCharacter();
      window.getSelectedStyles();
      form.displaySelectedColour();
      form.checkSelectedHairstyle(function () {
        pagination.buildPage();
      });
      character.renderCharacterPreview(function () {
        loading.displayElements();
      });
    } else {
      character.buildUserCharacter();
    }
  };

  // Gets the ID of the selected hairstyle, e.g. hs001
  window.getSelectedStyles = function getSelectedStyles() {
    const styleAndColourID = $('input[name=hair-style]:checked', '#character-creation-form').val();
    hairstyleId = styleAndColourID.slice(0, 5);
    eyesId = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
    costumeId = $('input[name=costume]:checked', '#character-creation-form').val().toLowerCase();
    maskId = $('input[name=mask]:checked', '#character-creation-form').val().toLowerCase();
    capeId = $('input[name=cape]:checked', '#character-creation-form').val().toLowerCase();
    specialId = $('input[name=special]:checked', '#character-creation-form').val().toLowerCase();
  };

  /*
   * PAGINATION
   */

  $('#next-pagination-button').click(function () {
    if (window.currentPage === window.numberOfPages) return;
    window.currentPage += 1;
    pagination.buildPage(window.currentPage);
  });

  $('#prev-pagination-button').click(function () {
    if (window.currentPage === 1) return;
    window.currentPage -= 1;
    pagination.buildPage(window.currentPage);
  });

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

  // Form Step 4 Button
  $('#step-4-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-4-button');
    $('.form-step-4-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #FCD100;}</style>').appendTo('head');
    formStep = 4;
  });

  // Form Step 5 Button
  $('#step-5-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-5-button');
    $('.form-step-5-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #E84E10;}</style>').appendTo('head');
    formStep = 5;
  });

  // Form Step 6 Button
  $('#step-6-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-6-button');
    $('.form-step-6-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #01A187;}</style>').appendTo('head');
    formStep = 6;
  });

  // Form Step 7 Button
  $('#step-7-button').click(function (e) {
    e.preventDefault();
    form.setFormStep('#step-7-button');
    $('.form-step-7-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #E30613;}</style>').appendTo('head');
    formStep = 7;
  });

  /*
   * Step 1 Functions
   */

  /* On colour change, select the relevant hairstyle and colour */
  $('input[name="hair-colour"]').change(function (e) {
    form.displaySelectedColour();
    form.checkSelectedHairstyle();
    form.updateStyleColourId();
    character.renderCharacterPreview();
  });

  $('input[name=hair-style]').change(function (e) {
    getSelectedStyles();
    form.updateStyleColourId();
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

  $('input[name=costume]').change(function (e) {
    costumeId = $('input[name=costume]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  $('input[name=mask]').change(function (e) {
    maskId = $('input[name=mask]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  $('input[name=cape]').change(function (e) {
    capeId = $('input[name=cape]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  $('input[name=special]').change(function (e) {
    specialId = $('input[name=special]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

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
