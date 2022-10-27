import * as airtable from '../src/airtable.js';
import * as alerts from '../src/alerts.js';
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
  window.coverId = '';
  window.userId = '';
  window.sessionId = '';
  window.sessionRow = '';
  window.selectedBook = '';
  window.currentCharacterName = '';
  window.pronouns = '';
  window.language = '';
  window.dedicationMessage = '';

  window.SnipcartSettings = {
    publicApiKey: 'NzAxOWMzODUtNmVjNS00NmEyLTlkNDktNDZhOTllYzIzMjkxNjM3OTc2MjY0NTYxOTc2NzY3',
    modalStyle: 'side',
    currency: 'gbp',
  };

  // prettier-ignore
  (()=>{var c,d;(d=(c=window.SnipcartSettings).version)!=null||(c.version="3.0");var s,S;(S=(s=window.SnipcartSettings).timeoutDuration)!=null||(s.timeoutDuration=2750);var l,p;(p=(l=window.SnipcartSettings).domain)!=null||(l.domain="cdn.snipcart.com");var w,u;(u=(w=window.SnipcartSettings).protocol)!=null||(w.protocol="https");var f=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,m=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=o;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();function r(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(m.forEach(t=>document.addEventListener(t,o)),setTimeout(o,window.SnipcartSettings.timeoutDuration)):o()}var a=!1;function o(){if(a)return;a=!0;let t=document.getElementsByTagName("head")[0],e=document.querySelector("#snipcart"),i=document.querySelector(`src[src^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][src$="snipcart.js"]`),n=document.querySelector(`link[href^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][href$="snipcart.css"]`);e||(e=document.createElement("div"),e.id="snipcart",e.setAttribute("hidden","true"),document.body.appendChild(e)),v(e),i||(i=document.createElement("script"),i.src=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`,i.async=!0,t.appendChild(i)),n||(n=document.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`,t.prepend(n)),m.forEach(g=>document.removeEventListener(g,o))}function v(t){!f||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();

  $(document).ready(function () {
    document.addEventListener('snipcart.ready', () => {
      Snipcart.events.on('customer.signedin', (customer) => {
        $('.nav-login-btn').html('Profile');
        $('.select-character').show();
        $('.new-character-button').show();
        window.randomiseOrLoadCharacter();
      });

      Snipcart.events.on('customer.signedout', (customer) => {
        sessionStorage.clear();
        $('.nav-login-btn').html('Sign In');
        $('.select-character').hide();
        $('.new-character-button').hide();
        window.randomiseOrLoadCharacter();
      });

      Snipcart.events.on('snipcart.initialized', (snipcartState) => {
        navigation.navigateToCharacterSelection();
        snipcart.toggleUiElements();
        form.setFormStep('#step-1-button');
        form.setInputValues();
        form.setCharacterPreviewClasses();
        randomiseOrLoadCharacter();
      });

      // Pagination
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

  window.randomiseOrLoadCharacter = function () {
    const userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    if (!$('input[name="fname"]').val()) {
      if (sessionStorage.getItem('currentCharacterId') === null && !userSignedIn) {
        character.randomiseCharacter();
      } else {
        character.buildUserCharacter();
      }
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
    sidekickId = sidekickAndColourId.slice(0, 5);
    coverId = $('input[name=cover]:checked', '#character-creation-form').val().toLowerCase();
    pronouns = $('input[name=pronoun]:checked').val().toLowerCase();
    language = $('input[name=language]:checked').val().toLowerCase();
  };

  /*
   * PAGINATION BUTTONS
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
    }

    form.setFormStep(`#step-${step}-button`);
    $(`.form-step-${step}-container`).fadeIn('slow');
    $(`.form-step-${formStep}-container`).css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $(
      `<style>[type=radio]:checked + img { box-shadow: 0px 0px 0px 5px ${hexColour};}</style>`
    ).appendTo('head');
    $(`<style>[type=radio]:not(:checked) + img { box-shadow: none; }</style>`).appendTo('head');
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
    form.displaySelectedColours();
    form.checkSelectedHairstyle();
    form.updateStyleColourIds();
    character.renderCharacterPreview();
  });

  $('input[name=hair-style]').change(function (e) {
    getSelectedStyles();
    form.updateStyleColourIds();
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
    form.displaySelectedColours();
    form.checkSelectedSidekick();
    form.updateStyleColourIds();
    character.renderCharacterPreview();
  });

  $('input[name=sidekick]').change(function (e) {
    getSelectedStyles();
    form.updateStyleColourIds();
    character.renderCharacterPreview();
  });

  $('input[name=cover]').change(function (e) {
    coverId = $('input[name=cover]:checked', '#character-creation-form').val().toLowerCase();
    character.renderCharacterPreview();
  });

  $('textarea#dedication').change(function () {
    window.dedicationMessage = $(this).val();
  });

  $('input[name=pronoun]').change(function () {
    window.pronouns = $(this).val();
  });

  $('input[name=language]').change(function () {
    window.language = $(this).val();
  });

  /*
   *	Pick a Book
   */

  $('.pick-a-book').click(function (e) {
    e.preventDefault();
    // validate firstname input is populated
    if (!$('input[name=fname]').val()) {
      alerts.displayAlert('error', 'Please enter a character name before continuing.');
    } else {
      let currentCharacterId = sessionStorage.getItem('currentCharacterId');
      sessionStorage.setItem('currentCharacterName', $('#hero-name-input').val());
      currentCharacterId === null
        ? airtable.addCharacter(
            alerts.displayAlert('success', `${$('#hero-name-input').val()} was saved successfully!`)
          )
        : airtable.updateCharacter(
            alerts.displayAlert('success', `${$('#hero-name-input').val()} was saved successfully!`)
          );
      navigation.navigateToBookSelection();
    }
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

    // create character object
    let currentCharacterObject = {
      characterName: window.sessionStorage.getItem('currentCharacterName'),
      hairstyleId: window.styleColourId,
      eyesId: window.eyesId,
      skintoneId: window.skinToneId,
      costumeId: window.costumeId,
      maskId: window.maskId,
      capeId: window.capeId,
      specialId: window.specialId,
      sidekickId: window.sidekickColourId,
      coverId: window.coverId,
      pronouns: window.pronouns,
      language: window.language,
      dedicationMessage: window.dedicationMessage,
    };

    $('.add-to-cart-btn').attr(
      'data-item-custom1-value',
      window.sessionStorage.getItem('currentCharacterName')
    );
    $('.add-to-cart-btn').attr(
      'data-item-custom2-value',
      window.sessionStorage.getItem('currentCharacterId')
    );
    $('.add-to-cart-btn').attr('data-item-custom3-value', JSON.stringify(currentCharacterObject));

    airtable.postToAirTable();
    airtable.updateCharacter();
    // wait for response from circular software (this is where we will do the polling stuff)

    // when response received, display preview
    $('.book-preview-container').css('display', 'flex');
    $('.book-selector-container').hide();
  });

  $('.edit-character').click(function (e) {
    e.preventDefault();
    navigation.navigateToCharacterSelection();
  });

  $('.select-story').click(function (e) {
    e.preventDefault();
    navigation.navigateToBookSelection();
  });

  /*
   * Preview Screen
   */

  $('.add-to-cart-btn').click(function (e) {
    navigation.navigateToCharacterSelection();
    character.randomiseCharacter();
  });

  /*
   * Navigation Button Links
   */

  $('#home-button').click(function (e) {
    navigation.navigateToCharacterSelection();
  });
});
