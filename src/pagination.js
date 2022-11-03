// Get the item count
var blackHairList;
var blondeHairList;
var brownHairList;
var redHairList;
var whiteHairList;
var numberOfItems;
window.numberPerPage;
var indexOfSelectedItem;
window.currentPage = 1;
window.numberOfPages;

function getElements() {
  blackHairList = document.querySelectorAll('.hair-collection-wrapper.black .hair-style-container');
  blondeHairList = document.querySelectorAll(
    '.hair-collection-wrapper.blonde .hair-style-container'
  );
  brownHairList = document.querySelectorAll('.hair-collection-wrapper.brown .hair-style-container');
  redHairList = document.querySelectorAll('.hair-collection-wrapper.red .hair-style-container');
  whiteHairList = document.querySelectorAll('.hair-collection-wrapper.white .hair-style-container');

  numberOfItems = blackHairList.length;
  window.numberOfPages = Math.ceil(numberOfItems / window.numberPerPage);
}

// Should be a DRY way of doing this.
function getPageOfSelectedItem() {
  let currentHairList;

  switch (window.hairColour) {
    case 'black':
      currentHairList = blackHairList;
      break;
    case 'blonde':
      currentHairList = blondeHairList;
      break;
    case 'brown':
      currentHairList = brownHairList;
      break;
    case 'red':
      currentHairList = redHairList;
      break;
    case 'white':
      currentHairList = whiteHairList;
      break;
  }

  currentHairList?.forEach((item, index) => {
    if (item.querySelector('input[name="hair-style"]').checked) {
      indexOfSelectedItem = index;
    }
  });

  window.currentPage = Math.ceil((indexOfSelectedItem + 1) / 9);
}

export function buildPage(currPage) {
  getElements();
  // Used to determine if pagination buttons are selecting currentPage
  currPage ? '' : getPageOfSelectedItem();

  const trimStart = (window.currentPage - 1) * window.numberPerPage;
  const trimEnd = trimStart + window.numberPerPage;

  var blackElems = Array.prototype.slice.call(blackHairList, trimStart, trimEnd);
  var blondeElems = Array.prototype.slice.call(blondeHairList, trimStart, trimEnd);
  var brownElems = Array.prototype.slice.call(brownHairList, trimStart, trimEnd);
  var redElems = Array.prototype.slice.call(redHairList, trimStart, trimEnd);
  var whiteElems = Array.prototype.slice.call(whiteHairList, trimStart, trimEnd);

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

  // hide all
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
}
