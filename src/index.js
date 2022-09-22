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
      $('.book-preview-container').hide();
      $('.loading-section').hide();

      toggleUiElements();
      setFormStep('#step-1-button');
      setInputValues();
      setCharacterPreviewClasses();
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
      randomiseCharacter();
      getSelectedStyles();
      displaySelectedColour();
      checkSelectedHairstyle();
      renderCharacter();
    } else {
      buildUserCharacter();
    }
  };

  // Save Character Button Click
  $('.save-character-button').click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    saveCharacter();
  });

  // New Character Button Click
  $('.new-character-button').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    createNewCharacter();
  });

  // Toggle UI elements based on user auth status
  function toggleUiElements() {
    let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    if (userSignedIn) {
      $('.nav-login-btn').html('Profile');
      $('.select-character').show();
      $('.new-character-button').show();
    } else {
      $('.nav-login-btn').html('Sign In');
      $('.select-character').hide();
      $('.new-character-button').hide();
    }
  }

  /*
  /* Form Code
  */

  $('#step-1-button').click(function (e) {
    e.preventDefault();
    setFormStep('#step-1-button');
    $('.form-step-1-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $('<style>[type=radio]:checked + img { outline: 5px solid #F080B2;}</style>').appendTo('head');
    formStep = 1;
  });

  $('#step-2-button').click(function (e) {
    e.preventDefault();
    setFormStep('#step-2-button');
    $('.form-step-2-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    // sets outline colour to the background of the step button
    $('<style>[type=radio]:checked + img { outline: 5px solid #01AFDA;}</style>').appendTo('head');
    formStep = 2;
  });

  $('#step-3-button').click(function (e) {
    e.preventDefault();
    setFormStep('#step-3-button');
    $('.form-step-3-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    $('<style>[type=radio]:checked + img { outline: 5px solid #77B82A;}</style>').appendTo('head');
    formStep = 3;
  });

  /*
   * Character Dropdown Functions
   */

  $('.w-dropdown-list').on('click', '.character-dropdown-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const characterId = $(this).attr('id');

    let record = getRecord(characterId);
    record.then((result) => {
      configureCharacter(result['fields']);
    });
  });

  /*
   * Build Character Functions
   */

  // Randomise character
  function randomiseCharacter() {
    const randomHairColour = getRandomIndex('input[name="hair-colour"]');
    const randomHairStyle = getRandomIndex('input[name="hair-style"]');
    const randomEyeColour = getRandomIndex('input[name="Eye-Colour"]');
    const randomSkinTone = getRandomIndex('input[name="skin-tone"]');

    $('input[name="hair-colour"]').eq(randomHairColour).prop('checked', true);
    $('input[name="hair-style"]').eq(randomHairStyle).prop('checked', true);
    $('input[name="Eye-Colour"]').eq(randomEyeColour).prop('checked', true);
    $('input[name="skin-tone"]').eq(randomSkinTone).prop('checked', true);
  }

  // Build existing character
  window.buildUserCharacter = function buildUserCharacter() {
    // user is logged in?
    let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';
    let record = '';

    if (userSignedIn) {
      let userEmail = getUserEmail();
      let characterList = getUserCharacters(userEmail);
      let $characterDropdown = $('.w-dropdown-list');

      characterList.then((result) => {
        result = $.parseJSON(result);

        // Removes all existing dropdown options, so they're not added twice
        $characterDropdown.empty();

        // adds all characters to the dropdown
        $.each(result['records'], function () {
          $characterDropdown.append(
            `<a href="#" class="w-dropdown-link character-dropdown-link" tabindex="0" id="${this.id}">${this['fields']['NAME']}</a>`
          );
        });

        if (result['records'].length > 0) {
          // Get most recently updated character
          const character = result['records'].reduce((a, b) =>
            a.fields.MODIFIED_AT > b.fields.MODIFIED_AT ? a : b
          );

          configureCharacter(character['fields']);
        }
      });
    } else {
      record = getRecord();
      record.then((result) => {
        console.log(result);
        configureCharacter(result['fields']);
      });
    }
  };

  // Configure the interface and preview for the selected character
  function configureCharacter(fields) {
    sessionStorage.setItem('currentCharacterName', fields['NAME']);
    sessionStorage.setItem('currentCharacterId', fields['RECORD_ID']);

    const splitStyleColour = fields['HAIR'].split('-');

    $('input[value=' + splitStyleColour[1] + ']').prop('checked', true);
    $('input[value=' + fields['HAIR'] + ']').prop('checked', true);
    $('input[value=' + fields['EYES'] + ']').prop('checked', true);
    $('input[value=' + fields['SKIN'] + ']').prop('checked', true);
    $('#hero-name-input').val(fields['NAME']);

    getSelectedStyles();
    displaySelectedColour();
    checkSelectedHairstyle();
    renderCharacter();
  }

  // Creates a new randomised character
  function createNewCharacter() {
    $('.name-input').val('');
    randomiseCharacter();
    getSelectedStyles();
    displaySelectedColour();
    checkSelectedHairstyle();
    renderCharacter();

    let character = addCharacter();
    let $characterDropdown = $('.w-dropdown-list');

    character.then((result) => {
      console.log(result);
      $characterDropdown.append(
        `<a href="#" class="w-dropdown-link character-dropdown-link" tabindex="0" id="${result.id}">${result.fields['NAME']}</a>`
      );
    });
  }

  // Save an existing character to a user profile
  function saveCharacter() {
    // check if user is signed in
    let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    // if not, tell them they need to sign in and redirect to login page
    if (userSignedIn) {
      let currentCharacterId = sessionStorage.getItem('currentCharacterId');
      sessionStorage.setItem('currentCharacterName', $('#hero-name-input').val());
      currentCharacterId === null ? addCharacter() : updateCharacter();
    } else {
      $('.alert-banner').show();
      $('.alert-banner').innerHtml('blallals');
      // display error banner
    }
  }

  // Render the character preview
  window.renderCharacter = function renderCharacter() {
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
  };

  // Set input values for character choices
  function setInputValues() {
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
  }

  // Set classes for character assets
  function setCharacterPreviewClasses() {
    $('.character-preview-hair-item').each(function () {
      const hairLabel = $(this).find('.character-hair-label').text();
      $(this).find('.hair').addClass(hairLabel);
    });
  }

  /*
   * General Functions
   */

  function displayBookControls() {
    $('.book-controls').each(function () {
      const currentId = $(this).attr('id');
      currentId === selectedBook ? $(this).css('display', 'flex') : $(this).hide();
    });
  }

  function getRandomIndex(selector) {
    const { length } = $(selector);
    const random = Math.floor(Math.random() * length);
    return random;
  }

  function setFormStep(stepButtonID) {
    $('#step-' + formStep + '-button')
      .prop('disabled', false)
      .removeClass('selected-form-step');
    $(stepButtonID).prop('disabled', true).addClass('selected-form-step');
  }

  /*
   * Step 1 Functions
   */

  /* On colour change, select the relevant hairstyle and colour */
  $('input[name="hair-colour"]').change(function (e) {
    displaySelectedColour();
    checkSelectedHairstyle();
    updatestyleColourId();
    renderCharacter();
  });

  $('input[name=hair-style]').change(function (e) {
    getSelectedStyles();
    updatestyleColourId();
    renderCharacter();
  });

  $('input[name=Eye-Colour]').change(function (e) {
    eyesId = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    renderCharacter();
  });

  $('input[name=skin-tone]').change(function (e) {
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
    renderCharacter();
  });

  /* Displays the hair styles for the selected colour */
  window.displaySelectedColour = function displaySelectedColour() {
    hairColour = $('input[name=hair-colour]:checked', '#character-creation-form')
      .val()
      .toLowerCase();
    $('input[name=hair-style]').each(function (index) {
      const elementColour = $(this).val().substring(6).toLowerCase();
      $(this)
        .closest('div')
        .addClass('hairstyle-' + index);
      if (elementColour !== hairColour) {
        $('.hairstyle-' + index).hide();
      }
      if (elementColour === hairColour) {
        $('.hairstyle-' + index).show();
      }
    });
  };

  function updatestyleColourId() {
    styleColourId = hairstyleId + '-' + hairColour.toLowerCase();
  }

  // Checks the selected hairstyle
  window.checkSelectedHairstyle = function checkSelectedHairstyle() {
    updatestyleColourId();
    $('input[value="' + styleColourId + '"]').prop('checked', true);
  };

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
    currentCharacterId === null ? addCharacter() : updateCharacter();
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
    $(this).prop('id', id);
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

  $('.book-container').click(function (e) {
    e.preventDefault();
    selectedBook = $(this).prop('id');

    $('.book-small-list-container').hide();
    $('.book-container-large').each(function () {
      const expectedId = 'large-' + selectedBook;
      $(this).attr('id') === expectedId ? $(this).css('display', 'flex') : $(this).hide();
    });

    // $('#large-' + selectedBook).css('display', 'flex');

    // // need to move this to new book display and show the full screen here instead
    // $('.generate-book-preview').prop('text', 'Generate Preview For ' + selectedBook);
    // $('.generate-book-preview').show();
  });

  $('.see-your-story-button').click(function (e) {
    e.preventDefault();
    setSessionId();
    displayBookControls();

    // post to airtable
    postToAirTable();
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
   * Session Functions
   */

  function getSessionId() {
    return localStorage.getItem('sessionId');
  }

  function setSessionId() {
    if (getSessionId() === null) {
      const uuid = uuidv4();
      localStorage.setItem('sessionId', uuid);
    }
  }

  function getUserEmail() {
    let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

    return userSignedIn ? Snipcart.store.getState().customer.email : '';
  }

  /*
   * AirTable Functions
   */

  // GET ALL CHARACTERS FOR USER
  function getUserCharacters(userEmail) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'get',
      headers: myHeaders,
      redirect: 'follow',
    };

    const record = fetch(
      `https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula=USER_EMAIL="${userEmail}"`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // might need to be refactored to get the most recent version, rather than just index 0
        console.log(result);
        return result;
      })
      .catch((error) => console.log('error', error));

    return record;
  }

  // GET LATEST CHARACTER
  window.getRecord = function getRecord(characterId) {
    const currentCharacterId = characterId || sessionStorage.getItem('currentCharacterId');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'get',
      headers: myHeaders,
      redirect: 'follow',
    };

    const record = fetch(
      `https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula={RECORD_ID}="${currentCharacterId}"`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // might need to be refactored to get the most recent version, rather than just index 0
        return result['records'][0];
      })
      .catch((error) => console.log('error', error));

    return record;
  };

  // Post Airtable Record
  function postToAirTable() {
    const testBody = [
      {
        // need to factor in log in character stuff
        CHARACTER_ID: sessionStorage.getItem('currentCharacterId'),
        BOOK: '03',
        SESSION_ID: localStorage.getItem('sessionId'),
        USER_EMAIL: getUserEmail(),
      },
    ];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'post',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(testBody),
    };

    fetch(
      'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews',
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  function addCharacter() {
    const testBody = [
      {
        NAME: $('#hero-name-input').val(),
        USER_EMAIL: getUserEmail(),
        HAIR: styleColourId,
        EYES: eyesId,
        SKIN: skinToneId,
      },
    ];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'post',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(testBody),
    };

    const record = fetch(
      'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // might need to be refactored to get the most recent version, rather than just index 0
        sessionStorage.setItem('currentCharacterId', result[0]['fields']['RECORD_ID']);
        return result[0];
      })
      .catch((error) => console.log('error', error));

    return record;
  }

  function updateCharacter() {
    const testBody = [
      {
        id: sessionStorage.getItem('currentCharacterId'),
        fields: {
          NAME: $('#hero-name-input').val(),
          USER_EMAIL: getUserEmail(),
          HAIR: styleColourId,
          EYES: eyesId,
          SKIN: skinToneId,
        },
      },
    ];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'put',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(testBody),
    };

    fetch(
      'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters',
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }
});
