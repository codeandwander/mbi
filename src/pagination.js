// Get the item count
var blackHairList;
var blondeHairList;
var brownHairList;
var redHairList;
var whiteHairList;
var currentCollectionList;
var numberOfItems;
window.numberPerPage;
var indexOfSelectedItem;
window.currentPage = 1;
window.numberOfPages;

function getElements(step) {
  if (step === 'hair') {
    blackHairList = document.querySelectorAll(
      '.hair-collection-wrapper.black .hair-style-container'
    );
    blondeHairList = document.querySelectorAll(
      '.hair-collection-wrapper.blonde .hair-style-container'
    );
    brownHairList = document.querySelectorAll(
      '.hair-collection-wrapper.brown .hair-style-container'
    );
    redHairList = document.querySelectorAll('.hair-collection-wrapper.red .hair-style-container');
    whiteHairList = document.querySelectorAll(
      '.hair-collection-wrapper.white .hair-style-container'
    );

    numberOfItems = blackHairList.length;
  } else {
    currentCollectionList = document.querySelectorAll(
      `.${step}-collection-wrapper .character-item-container`
    );

    numberOfItems = currentCollectionList.length;
  }

  window.numberOfPages = Math.ceil(numberOfItems / window.numberPerPage);
}

function getPageOfSelectedItem(step) {
  let selectedHairList;

  if (step === 'hair') {
    switch (window.hairColour) {
      case 'black':
        selectedHairList = blackHairList;
        break;
      case 'blonde':
        selectedHairList = blondeHairList;
        break;
      case 'brown':
        selectedHairList = brownHairList;
        break;
      case 'red':
        selectedHairList = redHairList;
        break;
      case 'white':
        selectedHairList = whiteHairList;
        break;
    }

    selectedHairList?.forEach((item, index) => {
      if (item.querySelector('input[name="hair-style"]').checked) {
        indexOfSelectedItem = index;
      }
    });
  } else {
    // IMPORTANT: step parameter must be the same as the input name
    let inputName;
    switch (step) {
      case 'skin':
        inputName = 'skin-tone';
        break;
      case 'mask':
        inputName = 'mask';
        break;
      case 'special':
        inputName = 'special';
        break;
    }

    currentCollectionList?.forEach((item, index) => {
      if (item.querySelector(`input[name="${inputName}"]`).checked) {
        indexOfSelectedItem = index;
      } else {
        indexOfSelectedItem = 0;
      }
    });
  }

  window.currentPage = Math.ceil((indexOfSelectedItem + 1) / 9);
}

export function buildPage(currPage, step) {
  getElements(step);
  // Used to determine if pagination buttons are selecting currentPage
  currPage ? '' : getPageOfSelectedItem(step);

  const trimStart = (window.currentPage - 1) * window.numberPerPage;
  const trimEnd = trimStart + window.numberPerPage;

  if (step === 'hair') {
    var blackElems = Array.prototype.slice.call(blackHairList, trimStart, trimEnd);
    var blondeElems = Array.prototype.slice.call(blondeHairList, trimStart, trimEnd);
    var brownElems = Array.prototype.slice.call(brownHairList, trimStart, trimEnd);
    var redElems = Array.prototype.slice.call(redHairList, trimStart, trimEnd);
    var whiteElems = Array.prototype.slice.call(whiteHairList, trimStart, trimEnd);

    hideElements(blackHairList);
    hideElements(blondeHairList);
    hideElements(brownHairList);
    hideElements(redHairList);
    hideElements(whiteHairList);
    showElements(blackElems);
    showElements(blondeElems);
    showElements(brownElems);
    showElements(redElems);
    showElements(whiteElems);
  } else {
    var currentElems = Array.prototype.slice.call(currentCollectionList, trimStart, trimEnd);

    hideElements(currentCollectionList);
    showElements(currentElems);
  }

  function showElements(array) {
    [].forEach.call(array, function (item) {
      item.style.display = 'block';
    });
  }

  function hideElements(array) {
    [].forEach.call(array, function (item) {
      item.style.display = 'none';
    });
  }
}
