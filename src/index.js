import * as airtable from '../src/airtable.js';
import * as character from '../src/character.js';
import * as form from '../src/form.js';
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
  window.sidekickId = '';
  window.sidekickColour = '';
  window.sidekickColourId = sidekickId + '-' + sidekickColour;
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
    const sidekickAndColourId = $('input[name=sidekick]:checked', '#character-creation-form').val();
    hairstyleId = styleAndColourID.slice(0, 5);
    eyesId = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
    costumeId = $('input[name=costume]:checked', '#character-creation-form').val().toLowerCase();
    maskId = $('input[name=mask]:checked', '#character-creation-form').val().toLowerCase();
    capeId = $('input[name=cape]:checked', '#character-creation-form').val().toLowerCase();
    specialId = $('input[name=special]:checked', '#character-creation-form').val().toLowerCase();
    sidekickId = $('input[name=sidekick]:checked', '#character-creation-form').val();
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
  function goToFormStep(step, e) {
    e.preventDefault();
    let hexColour;

    // Set outline colour of step
    switch (step) {
      case '1':
        hexColour = '#F080B2';
        break;
      case '2':
        hexColour = '#01AFDA';
        break;
      case '3':
        hexColour = '#77B82A';
        break;
      case '4':
        hexColour = '#FCD100';
        break;
      case '5':
        hexColour = '#E84E10';
        break;
      case '6':
        hexColour = '#01A187';
        break;
      case '7':
        hexColour = '#E30613';
        break;
      case '8':
        hexColour = '#E30F6B';
        break;
      case '9':
        hexColour = '#0072BB';
        break;
      case '10':
        hexColour = '#C9B5D8';
        break;
    }

    form.setFormStep(`#step-${step}-button`);
    $(`.form-step-${step}-container`).fadeIn('slow');
    $(`.form-step-${formStep}-container`).css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $(`<style>[type=radio]:checked + img { outline: 5px solid ${hexColour};}</style>`).appendTo(
      'head'
    );
    formStep = step;
  }
  $('.step-button').click(function (e) {
    const clickedStep = $(this).attr('id').match(/(\d+)/)[0];

    goToFormStep(clickedStep, e);
  });

  /*
   * On Change Functions
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

  $('input[name="sidekick-colour"]').change(function (e) {
    form.displaySelectedColour();
    form.checkSelectedHairstyle();
    form.updateStyleColourId();
    character.renderCharacterPreview();
  });

  $('input[name=sidekick]').change(function (e) {
    getSelectedStyles();
    form.updateStyleColourId();
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
