import { masterplan } from '$utils/masterplan';

window.Webflow ||= [];
window.Webflow.push(() => {
  let formStep = 1;
  let hairstyleId = '';
  let hairColour = '';
  let styleColourId = hairstyleId + '-' + hairColour;
  let eyesID = '';
  let skinToneId = '';
  let userId = '';
  const sessionId = '';
  const sessionRow = '';
  let selectedBook = '';

  // Block is executed on page load - sets up the data etc.
  window.onload = function () {
    document.getElementsByTagName('html')[0].style.visibility = 'visible';

    // IDEA
    // set all variables at the start
    // random if they're not already assigned from database
    // use those variables to populate checkboxes

    setFormStep('#step-1-button');
    setInputValues();

    function getRandomIndex(selector: string) {
      const { length } = $(selector);
      const random = Math.floor(Math.random() * length);
      return random;
    }

    if (localStorage.getItem('rowId') === null) {
      // Gets random selection for each
      const randomHairColour = getRandomIndex('input[name="hair-colour"]');
      const randomHairStyle = getRandomIndex('input[name="hair-style"]');
      const randomEyeColour = getRandomIndex('input[name="Eye-Colour"]');
      const randomSkinTone = getRandomIndex('input[name="skin-tone"]');

      $('input[name="hair-colour"]').eq(randomHairColour).prop('checked', true);
      $('input[name="hair-style"]').eq(randomHairStyle).prop('checked', true);
      $('input[name="Eye-Colour"]').eq(randomEyeColour).prop('checked', true);
      $('input[name="skin-tone"]').eq(randomSkinTone).prop('checked', true);

      getSelectedStyles();
      displaySelectedColour();
      checkSelectedHairstyle();
      renderCharacter();
    } else {
      record.then((result) => {
        // go through each item of the result
        // if it has a value, check the box
        // otherwise random - but thinking about it, it's always going to have a value (once it's finished - so expect errors)

        const splitStyleColour = result['fields']['HAIR'].split('-');

        $('input[value=' + splitStyleColour[1] + ']').prop('checked', true);
        $('input[value=' + result['fields']['HAIR'] + ']').prop('checked', true);
        $('input[value=' + result['fields']['EYES'] + ']').prop('checked', true);
        $('input[value=' + result['fields']['SKIN'] + ']').prop('checked', true);

        getSelectedStyles();
        displaySelectedColour();
        checkSelectedHairstyle();
        renderCharacter();
      });
      // render characrer with selections
    }
    // set a default style and colour - can be randomised at the end
  };

  /*
/* Form Code
*/

  $('.memberstack-button').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
  });
  MemberStack.onReady.then(function (member: { [x: string]: string; loggedIn: any }) {
    if (member.loggedIn) {
      userId = member['id'];
    }
  });

  $('#step-1-button').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    setFormStep('#step-1-button');
    $('.form-step-1-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    formStep = 1;
  });

  $('#step-2-button').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    setFormStep('#step-2-button');
    $('.form-step-2-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    formStep = 2;
  });

  $('#step-3-button').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    setFormStep('#step-3-button');
    $('.form-step-3-container').fadeIn('slow');
    $('.form-step-' + formStep + '-container').css({
      display: 'none',
    });
    formStep = 3;
  });

  /*
   * Step 1 - Hair Style and Colour
   */

  /* On colour change, select the relevant hairstyle and colour */
  $('input[name="hair-colour"]').change(function (e: any) {
    displaySelectedColour();
    checkSelectedHairstyle();
    updatestyleColourId();
    renderCharacter();
  });

  $('input[name=hair-style]').change(function (e: any) {
    getSelectedStyles();
    updatestyleColourId();
    renderCharacter();
  });

  $('input[name=Eye-Colour]').change(function (e: any) {
    eyesID = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    renderCharacter();
  });

  $('input[name=skin-tone]').change(function (e: any) {
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
    renderCharacter();
  });

  /*
   * General Functions
   */

  function renderCharacter() {
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
    if (eyesID) {
      $('.eyes:visible').first().hide();
      $('.' + eyesID).show();
    } else {
      const { length } = $('.eyes-container img');
      const random = Math.floor(Math.random() * length);
      $('.eyes-container img').eq(random).show();
    }

    // Skin ahahah
    if (skinToneId) {
      $('.skin:visible').first().hide();
      $('.' + skinToneId).show();
    } else {
      const { length } = $('.skin-container img');
      const random = Math.floor(Math.random() * length);
      $('.skin-container img').eq(random).show();
    }
  }

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

  function setFormStep(stepButtonID: string) {
    $('#step-' + formStep + '-button')
      .prop('disabled', false)
      .removeClass('selected-form-step');
    $(stepButtonID).prop('disabled', true).addClass('selected-form-step');
  }

  /*
   * Step 1 Functions
   */

  /* Displays the hair styles for the selected colour */
  function displaySelectedColour() {
    hairColour = $('input[name=hair-colour]:checked', '#character-creation-form')
      .val()
      .toLowerCase();
    $('input[name=hair-style]').each(function (index: string) {
      const elementColour = $(this).val().substring(6).toLowerCase();
      $(this)
        .closest('div')
        .addClass('hairstyle-' + index);
      if (elementColour != hairColour) {
        $('.hairstyle-' + index).hide();
      }
      if (elementColour == hairColour) {
        $('.hairstyle-' + index).show();
      }
    });
  }

  function updatestyleColourId() {
    styleColourId = hairstyleId + '-' + hairColour.toLowerCase();
  }

  // Checks the selected hairstyle
  function checkSelectedHairstyle() {
    updatestyleColourId();
    $('input[value="' + styleColourId + '"]').prop('checked', true);
  }

  // Gets the ID of the selected hairstyle, e.g. hs001
  function getSelectedStyles() {
    const styleAndColourID = $('input[name=hair-style]:checked', '#character-creation-form').val();
    hairstyleId = styleAndColourID.slice(0, 5);
    eyesID = $('input[name=Eye-Colour]:checked', '#character-creation-form').val().toLowerCase();
    skinToneId = $('input[name=skin-tone]:checked', '#character-creation-form').val().toLowerCase();
  }

  /*
   *	Pick a Book
   */

  $('.pick-a-book').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();

    $('.character-builder-container').hide();
    $('.book-selector-container').show();
  });

  $('.edit-character').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();

    $('.character-builder-container').show();
    $('.book-selector-container').hide();
  });

  $('.book-item').each(function () {
    // lowercase and hyphenates an id, adds to each book item
    const id = $(this).closest('div').find('.text-block-2').html().toLowerCase().replace(/ /g, '-');
    $(this).prop('id', id);
  });

  $('.book-item').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    selectedBook = $(this).prop('id');
    $('.generate-book-preview').prop('text', 'Generate Preview For ' + selectedBook);
    $('.generate-book-preview').show();
  });

  $('.generate-book-preview').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    setSessionId();

    // post to airtable
    postToAirTable();
    // wait for response from circular software

    // when response received, display preview
    $('.book-preview-container').show();
    $('.book-selector-container').hide();
  });

  $('.edit-character-2').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    $('.book-preview-container').hide();
    $('.character-builder-container').show();
  });

  $('.select-story').click(function (e: { preventDefault: () => void }) {
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

  /*
   * AirTable Functions
   */

  function getSessionRow() {
    return false;
  }

  // async function getRecord() {
  //     // Get Airtable Record
  //     var id = localStorage.getItem("rowId")
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     var requestOptions = {
  //         method: "get",
  //         headers: myHeaders,
  //         redirect: "follow",
  //     };

  //     fetch("https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Sessions&id=" + id, requestOptions)
  //         .then(response => response.json())
  //         .then((result) => {
  //             return result
  //         })
  //         .catch(error => console.log('error', error));
  // }

  const id = localStorage.getItem('rowId');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'get',
    headers: myHeaders,
    redirect: 'follow',
  };

  const record = fetch(
    'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Sessions&id=' + id,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));

  // const getRecord = async () => {
  //     const r = await record;
  //     sessionRow = r
  //     return sessionRow
  //     // console.log('sr', sessionRow)
  // }

  // Post Airtable Record
  function postToAirTable() {
    const testBody = [
      {
        BOOK: '03',
        PRONOUNS: 'HE',
        Orderer: ['reckIOlQZHkavukIi'],
        'Order Status': 'Chosen',
        HAIR: styleColourId,
        EYES: eyesID,
        SKIN: skinToneId,
        SESSION_ID: localStorage.getItem('sessionId'),
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
      'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Sessions',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => localStorage.setItem('rowId', result?.[0].id))
      .catch((error) => console.log('error', error));
  }
});
