import * as alerts from '../src/alerts.js';
import * as form from '../src/form.js';
import * as snipcart from '../src/snipcart.js';

// GET PREVIEW FOR CHARACTER
export function getPreviewOfCharacter(previewId) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'get',
    headers: myHeaders,
    redirect: 'follow',
  };

  const record = fetch(
    `https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Previews&filterByFormula=PREVIEW_ID="${previewId}"&t=${Date.now()}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      return result.records.slice(Math.max(result.records.length - 5, 0));
    })
    .catch((error) => console.log('error', error));

  return record;
}

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
      result = JSON.parse(result);
      result.records = result.records.filter((record) => !record.fields.DUPLICATE_ID);

      return result.records.slice(Math.max(result.records.length - 5, 0));
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
export function postToAirTable(callback) {
  const testBody = [
    {
      // need to factor in log in character stuff
      CHARACTER_ID: sessionStorage.getItem('currentCharacterId'),
      BOOK_ID: window.selectedBook,
      SESSION_ID: localStorage.getItem('sessionId'),
      USER_EMAIL: snipcart.getUserEmail(),
      PRONOUNS: window.pronouns,
      LANGUAGE: window.language,
      DEDICATION_MESSAGE: window.dedicationMessage,
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
    .then((result) => {
      const currentPreviewId = `${result[0]['fields']['PREVIEW_ID']}`;
      localStorage.setItem('currentPreviewId', currentPreviewId);

      fetch(
        `https://hook.eu1.make.com/0kxggab30625jvpqkvviz6fo9dvxzryf?string=P-${encodeURIComponent(
          result[0]['fields']['RECORD_ID']
        )}-CHOSEN`
      ).then((response) => {
        callback && callback(currentPreviewId);
      });
    })
    .catch((error) => console.log('error', error));
}

export function addCharacter(callback) {
  const testBody = [
    {
      NAME: $('#hero-name-input').val(),
      USER_EMAIL: snipcart.getUserEmail(),
      HAIR: styleColourId,
      EYES: eyesId,
      SKIN: skinToneId,
      COSTUME: costumeId,
      MASK: maskId,
      CAPE: capeId,
      SPECIAL: specialIds.toString(),
      SIDEKICK: sidekickColourId,
      COVER_COLOUR: coverId,
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
      sessionStorage.setItem('currentCharacterId', result[0]['fields']['RECORD_ID']);
      localStorage.setItem('currentCharacter', JSON.stringify(result[0]['fields']));
      callback && callback();
      return result[0];
    })
    .catch((error) => console.log('error', error));

  return record;
}

export function duplicateCharacter(callback) {
  const currentCharacter = localStorage.getItem('currentCharacter');

  if (!currentCharacter) {
    return;
  }

  const data = JSON.parse(currentCharacter);
  delete data.RECORD_NUMBER;
  delete data.RECORD_ID;
  delete data.MODIFIED_AT;
  delete data.CREATED_AT;
  delete data['Last Modified'];

  const testBody = [
    {
      ...data,
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
    .then((newCharacter) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const requestOptions = {
        method: 'put',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify([
          {
            id: sessionStorage.getItem('currentCharacterId'),
            fields: {
              DUPLICATE_ID: newCharacter[0]['fields']['RECORD_ID'],
            },
          },
        ]),
      };

      return fetch(
        'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=Characters',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          sessionStorage.setItem('currentCharacterId', newCharacter[0]['fields']['RECORD_ID']);

          callback && callback();

          return newCharacter[0];
        })
        .catch((error) => console.log('error', error));
    })
    .catch((error) => console.log('error', error));

  return record;
}

export function updateCharacter(callback) {
  const testBody = [
    {
      id: sessionStorage.getItem('currentCharacterId'),
      fields: {
        NAME: $('#hero-name-input').val(),
        USER_EMAIL: snipcart.getUserEmail(),
        HAIR: styleColourId,
        EYES: eyesId,
        SKIN: skinToneId,
        COSTUME: costumeId,
        MASK: maskId,
        CAPE: capeId,
        SPECIAL: specialIds.toString(),
        SIDEKICK: sidekickColourId,
        COVER_COLOUR: coverId,
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
    .then((result) => {
      localStorage.setItem('currentCharacter', JSON.stringify(testBody[0]['fields']));

      callback && callback();
    })
    .catch((error) => console.log('error', error));
}

export function deleteCharacter(id, name) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'delete',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify([id]),
  };

  fetch(
    'https://v1.nocodeapi.com/makebelieveme/airtable/nmeOnHAeFloOUpCL?tableName=characters',
    requestOptions
  )
    .then((response) => response.text())
    .then(alerts.displayAlert('success', `${name} was successfully deleted!`))
    .catch((error) => console.log('error', error));
}
