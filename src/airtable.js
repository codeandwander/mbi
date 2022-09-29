import * as form from '../src/form.js';
import * as snipcart from '../src/snipcart.js';

// GET ALL CHARACTERS FOR USER
export function getUserCharacters(userEmail) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'get',
    headers: myHeaders,
    redirect: 'follow',
  };

  const record = fetch(
    `https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula=USER_EMAIL="${userEmail}"&t=${Date.now()}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      // might need to be refactored to get the most recent version, rather than just index 0
      return result;
    })
    .catch((error) => console.log('error', error));

  return record;
}

// GET LATEST CHARACTER
export function getRecord(characterId) {
  const currentCharacterId = characterId || sessionStorage.getItem('currentCharacterId');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'get',
    headers: myHeaders,
    redirect: 'follow',
  };

  const record = fetch(
    `https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters&filterByFormula={RECORD_ID}="${currentCharacterId}"&t=${Date.now()}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // might need to be refactored to get the most recent version, rather than just index 0
      return result['records'][0];
    })
    .catch((error) => console.log('error', error));

  return record;
}

// Post Airtable Record
export function postToAirTable() {
  const testBody = [
    {
      // need to factor in log in character stuff
      CHARACTER_ID: sessionStorage.getItem('currentCharacterId'),
      BOOK_ID: window.selectedBook,
      SESSION_ID: localStorage.getItem('sessionId'),
      USER_EMAIL: snipcart.getUserEmail(),
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

export function addCharacter() {
  const testBody = [
    {
      NAME: $('#hero-name-input').val(),
      USER_EMAIL: snipcart.getUserEmail(),
      HAIR: styleColourId,
      EYES: eyesId,
      SKIN: skinToneId,
      PRONOUNS: window.pronouns,
      LANGUAGE: window.language,
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
      form.appendCharacterDropdownItems();
      sessionStorage.setItem('currentCharacterId', result[0]['fields']['RECORD_ID']);
      return result[0];
    })
    .catch((error) => console.log('error', error));

  return record;
}

export function updateCharacter() {
  const testBody = [
    {
      id: sessionStorage.getItem('currentCharacterId'),
      fields: {
        NAME: $('#hero-name-input').val(),
        USER_EMAIL: snipcart.getUserEmail(),
        HAIR: styleColourId,
        EYES: eyesId,
        SKIN: skinToneId,
        PRONOUNS: window.pronouns,
        LANGUAGE: window.language,
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
    .then((result) => console.log('res', result))
    .catch((error) => console.log('error', error));
}
